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
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';
import { getActivites,getCommunes, getVilles } from '../../utils/data';
import Dropdown from 'react-native-input-select';
import { ScrollView } from 'react-native-gesture-handler';
import { postData } from '../../utils/helper';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const imgDir = FileSystem.documentDirectory + "images/";

const selectImage = async (useLibrary:boolean) => {

  const options:ImagePicker.ImagePickerOptions={
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
    aspect:[4,3],
    quality:0.75
  }
  let result;
  if(useLibrary) {
    result = await ImagePicker.launchImageLibraryAsync(options);
  }else {
    await ImagePicker.requestCameraPermissionsAsync();
    result=await ImagePicker.launchCameraAsync(options);
  }
  
  if (!result.canceled) {
    console.log(result.assets[0].uri);
    saveImage(result.assets[0].uri);
  }
};



const INPUT_OFFSET = 110;

export default function Example() {
  const [activitesState,setActivitesState]=useState([]);
  const [villesState,setVillesState]=useState([]);
  const [communesState,setCommunesStates]=useState([]);
  
  const [activite, setActivite] = React.useState();
  const [ville, setVille] = React.useState();
  const [commune, setCommune] = React.useState();
  const [isSubmited,setIsSubmited]=useState(false);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ededec' }}>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.btnfom} className=" -top-12 left-36">
       
        </View>
        <Text className=" justify-center -left-3 " >
        Téléchargez votre photo*
          </Text>
          <Text style={styles.listTitle}>
          Complete votre  <Text style={{ color: '#f4405b' }}>formulaire</Text>
          </Text>
          <Text style={styles.formFooter} className=" -top-10">
          Mettez à jour vos informations personnelles
            <Text style={{ fontWeight: '600' }}> </Text>
          
          </Text>
         
        </View>

        <View style={styles.form} className=" -top-10">
          <View >
            <View>
              <Dropdown 
                 
                label="Selectionner votre activité"
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
              <Dropdown
                label="Selectionner votre ville"
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
          <Dropdown 
              label="Selectionner votre commune"
              placeholder=""
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
              }}>
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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#929292',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 67,
    width:364,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 15,
    borderWidth:1.2,
    fontWeight: '300',
    color: '#222',
    borderColor:"#e3e3e2"
  },
  inputLabel: {
    position: 'absolute',
    width: INPUT_OFFSET,
    lineHeight: 44,
    top: 0,
    left: 0,
    bottom: 0,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#c0c0c0',
    zIndex: 9,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    color: '#fff',
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