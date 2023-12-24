import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ToastAndroid
} from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthContext';
import { getActivites,getCommunes, getVilles } from '../../utils/data';
import Dropdown from 'react-native-input-select';
import { ScrollView } from 'react-native-gesture-handler';
import { getMyProfil, postData } from '../../utils/helper';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { API_URL, BACKEND_URL, photoProfil } from '../../global/helper';


const imgDir = FileSystem.documentDirectory + "images/";
const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const INPUT_OFFSET = 110;

export default function Completeprofil() {
  const [images,setImages]=useState<string[]>([]);
  const [result,setResult]=useState<any>("");
  const [loading,setLoading]=useState<boolean>(false);
  const [activitesState,setActivitesState]=useState([]);
  const [villesState,setVillesState]=useState([]);
  const [communesState,setCommunesStates]=useState([]);
  const [isUploading,setIsUploading]=useState(false);
  
  const [activite, setActivite] = React.useState();
  const [ville, setVille] = React.useState();
  const [commune, setCommune] = React.useState();
  const [isSubmited,setIsSubmited]=useState(false);
  const [myProfil,setMyProfil]=useState({});

  const {authState}=useAuth();
  const [form, setForm] = useState({
    id:authState?.id || null,
    activite: '',
    adresse: '',
    ville: '',
    commune: '',
    youtube: '',
    facebook: '',
    whatsapp: '',
    tiktok: '',
    bio: ''
  });

  // Pour image
    const loadImages = async () =>{
      await ensureDirExists();
      const files=await FileSystem.readDirectoryAsync(imgDir);
      if(files.length > 0){
        // setImages(files.map(f =>imgDir+f));
      }
    }
    let r=null;
    const selectImage = async (useLibrary:boolean) => {
  
      const options:ImagePicker.ImagePickerOptions={
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:0.75
      }
      
      if(useLibrary) {
        r = await ImagePicker.launchImageLibraryAsync(options);
        
      }else {
        await ImagePicker.requestCameraPermissionsAsync();
        r=await ImagePicker.launchCameraAsync(options);
        
      }
      
      if (!r.canceled) {
        console.log(r.assets[0].uri);
        setResult(r.assets[0].uri);
        saveImage(r.assets[0].uri); 
      }
    };
    const saveImage=async (uri:string) => {
      await ensureDirExists();
      const filename=new Date().getTime()+".jpg";
      const dest=imgDir+filename;
      await FileSystem.copyAsync({from:uri,to:dest});
      // setImages([...images,dest]);
    }
    const uploadImage=async(uri: string)=>{
      // setLoading(true);
      setIsUploading(true);
      try {
        await FileSystem.uploadAsync(BACKEND_URL+"imagesProfil/upload.php", uri,{
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName:"file",
        }).then((r)=>{
          console.log("resultat "+form.id+" ",r);
          let res=JSON.parse(r.body);
          let formulaire=new FormData();
          formulaire.append("qry","addPhotoProfil");
          formulaire.append("id",form.id);
          formulaire.append("fichier",res.fichier);
          
          fetch(API_URL,{
            method:"POST",
            body:formulaire
          }).then(r=>r.json())
          .then(r=>{
            if(r.success)
            {
              ToastAndroid.show("Photo bien ajouté",ToastAndroid.SHORT);
            }else
            {
              Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
              console.log(r.msg);
            }
          }).catch((r)=>{
            Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
            console.log(r);
          }).finally(()=>{
            setIsUploading(false);
          });
        });
        // setLoading(false);
        Alert.alert("Bien envoyé");
  
      } catch (error) {
        Alert.alert("Une erreur s'est produite");
        console.log(error);
        
        // setLoading(false);
      }
     
      // setLoading(false);
  
    }
  // -----


  const villes=()=>{
    const villes=[];
    getVilles().then(r=>{
      r.forEach((vi,i)=>{
        villes.push({
          label:vi.ville, 
          value:vi.id
        });
      })
      setVillesState(villes)
    })
  }
  const activites=()=>{
    const activites=[];
    getActivites().then(r=>{
      r.forEach((ac,i)=>{
        activites.push({
          label:ac.libelle, 
          value:ac.id
        });
      })
      setActivitesState(activites)
    });
  }
  const communes=(ville)=>{
    const communes=[];
    getCommunes(ville).then(r=>{
      r.sort((a,b)=>{a.commune>b.commune}).forEach((vi,i)=>{
        communes.push({
          label:vi.commune, 
          value:vi.id
        });
      })
      setCommunesStates(communes)
    })
  }
  useEffect(()=>{
    // Alert.alert(" "+authState.id);
    activites();
    villes();
    getMyProfil(form?.id).then(r=>setMyProfil(r));
  },[])

  const handleSubmit=()=>{
    Alert.alert("Profil","Confirmez-vous cet enregistrement",[
      {
        text:"Enregistrer",
        onPress:()=>{
          setIsSubmited(true);
          addData();
        }
      },
      {
        text:"Annuler"
      }
    ]);
    
    const addData=()=>{
      postData("updateProfil",form).then(r=>{
        console.log(r);
        Alert.alert("Modification profil","Profil bien modifié")
      }).catch(r=>{
        console.log(r);
        Alert.alert("Modification profil","Echec de modification");
      }).finally(()=>setIsSubmited(false))
    }
  }

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  return (
    <ScrollView>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>

        <View style={styles.header} >
          <View className="-top-12 flex h-32 w-96 justify-center right-4   releft-9  items-center bg-[#2B303A] rounded-2xl  ">
           
            {result!=="" ?
              <Image source={{uri:result}} width={70} height={70} className="rounded-full" />:
              myProfil?.photo!==""?
                <Image source={{uri:photoProfil+myProfil?.photo}} width={70} height={70} className="rounded-full" />:
                <EvilIcons name="user" size={84} color="black" />
            }
          </View>
          {result==="" ?
            <View className=" flex-row  gap-4  w-96 -top-3 space-x-16 h-24  justify-center items-center">
              <TouchableOpacity onPress={()=>{
                selectImage(true);
              }}>

                <Text className=" w-48 rounded-2xl h-10 text-sm   text-[#2B303A] bg-[#facc15]  text-center -top-3 pt-2">
                  Téléchargez votre photo 
                </Text>
              </TouchableOpacity>
          
              <TouchableOpacity onPress={()=>{
                selectImage(false);
              }}>

            
           <Text className=" justify-center w-20  text-sm  border-2 border-r-gray-300  rounded-2xl text-center -top-3 pt-2 h-10 text-[#2B303A] " >
                  Capturer
                </Text>
              </TouchableOpacity>
            </View>:
            <View className="flex flex-row justify-center items-center gap-4 -mt-10">
              {isUploading ?
                <View className="flex flex-row justify-center items-center gap-4 -mt-10">
                  <ActivityIndicator />
                </View>
                :
                <View className="flex flex-row justify-center items-center gap-4 -mt-10">
                <TouchableOpacity onPress={()=>uploadImage(result)}>
                  <Text className="w-48 rounded-2xl h-10 text-sm  text-[#2B303A] bg-[#facc15]  text-center -top-3 pt-2">Enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setResult("")}>
                  <Text className="justify-center w-20 text-sm  border-2 border-r-gray-300  rounded-2xl text-center -top-3 pt-2 h-10 text-[#2B303A]">
                    Annuler
                  </Text>
                </TouchableOpacity>
                </View>
              }
            </View>
          }
          <View className="mt-1 text-[#2B303A] text-sm px-0">
            <Text>
            Complete votre 
            <Text>formulaire</Text>
            </Text>
            <Text>
            Mettez à jour vos informations personnelles 
              <Text> </Text>
            
            </Text>
          </View>
        </View>

        <View style={styles.form} className=" -top-10">
          <View >
            <View>
            <Text style={styles.inputLabel}>Selectionner votre activité</Text>
              <Dropdown 
                 
                label=""
                placeholder=""
                options={activitesState}
                selectedValue={activite}
                onValueChange={(value) => {
                setActivite(value);
                setForm({...form,activite:value})
                
                }}
                primaryColor={'#e3e3e2'}
              />
          </View>

            <View >
            <Text style={styles.inputLabel}>Selectionner votre ville</Text>
              <Dropdown
              
                label=""
                placeholder="fffff"
                options={villesState}
                selectedValue={ville}
                onValueChange={(value) => {
                  setVille(value);
                  setForm({...form,ville:value})
                  communes(value);
                }}
               
              />
            </View>
            
          </View>
          

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Avenue</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={adresse => setForm({ ...form, adresse })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.adresse}

            />
          </View>
          <Text style={styles.inputLabel}>Selectionner votre commune</Text>
          <Dropdown 
              label=""
              style={styles.inputControl}
              options={communesState}
              selectedValue={commune}
              onValueChange={(value) => {
                setCommune(value);
                setForm({...form,commune:value})
              }}
              primaryColor={'gray'}
            />
        
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Youtube</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={youtube => setForm({ ...form, youtube })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.youtube}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Facebook</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={facebook => setForm({ ...form, facebook })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.facebook}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>WhatsApp</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={whatsapp => setForm({ ...form, whatsapp })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.whatsapp}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>TikTok</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={tiktok => setForm({ ...form, tiktok })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.tiktok}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Bio</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={bio => setForm({ ...form, bio })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.bio}
            />
          </View>
          

          

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit()
              }}  >
              <View style={styles.btn}>
                {
                  isSubmited?
                  <ActivityIndicator />:
                  <Text style={styles.btnText}>Enregistre</Text>
                }
              </View>
            </TouchableOpacity>

            <View style={styles.formActionSpacer} />

            
          </View>

          
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  headerIcon: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginBottom: 36,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formActionSpacer: {
    marginVertical: 8,
  },
  formFooter: {
    marginTop: 'auto',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '#1C77C3',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
    fontSize: 15,
    borderWidth:0.5,
    fontWeight: '300',
    color: '#222',
    borderColor: "ffcccc",
  },
  inputLabel: {
    lineHeight: 44,
    fontSize: 18,
    fontWeight: '500',
    color:'#2B303A',
    marginBottom: 8,
  },
  btn: {
    flexDirection: 'row',
    height:55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#facc15',
    borderColor: '#facc15',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    color: '#2B303A',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#000',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  btnfom:{
     width:60,
     height:60,
     backgroundColor:'#000',
     borderRadius: 100
  },
  listTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    color: '#3f3f46',
    textAlign:'center' 
   
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 3,
   
  },
  activite:{

    width:40,
    height:50,
  }
});