import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import { postData } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
FileSystem

const Formulaire = () => {
  const {authState}=useAuth();
  const [form,setForm]=useState({titre:"",description:"",idUser:authState.id});
  const [traiting,setTraiting]=useState(false);
    // Pour image
    const imgDir = FileSystem.documentDirectory + "images/";
    const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    };
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
    const uploadImage1=async(uri:string,article:string)=>{
      setLoading(true);
      Alert.alert(uri);
      // console.log(" "+article+" fichiers: "+result);
      try {
        
        await FileSystem.uploadAsync(BACKEND_URL+"upload_article.php", uri,{
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName:"file",
        }).then((r)=>{
          let fichier=r.fichier;
          // let res=JSON.parse(r.body);
          let formulaire=new FormData();
          formulaire.append("qry","addPhotoArticle");
          formulaire.append("article",article);
          formulaire.append("fichier",fichier);
          
          fetch(BACKEND_URL+"upload_article.php",{
            method:"POST",
            body:formulaire
          }).then(r=>r.json())
          .then(res=>{
            // Alert.alert("ok");
            console.log(res);
            if(res.success)
            {
              ToastAndroid.show("Photo bien ajouté",ToastAndroid.SHORT);
            }else
            {
              // Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
              console.log(res.msg);
            }
          }).catch((res)=>{
            Alert.alert("Image article","Echec d'enregistrement, veuillez reesayer plutard");
            console.log(res);
          }).finally(()=>{
            setLoading(false);
          });
        });
        // setLoading(false);
        // Alert.alert("Bien envoyé");

      } catch (error) {
        Alert.alert("Une erreur s'est produite");
        console.log(error);
        
        // setLoading(false);
      }
    
      // setLoading(false);

    }
    const uploadImage=async(uri: string,article:string)=>{
      setLoading(true);
      // setIsUploading(true);
      try {
        await FileSystem.uploadAsync(BACKEND_URL+"upload_article.php", uri,{
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName:"file",
        }).then((r)=>{
          // console.log("resultat "+form?.id+" ",r);
          let res=JSON.parse(r.body);
          let formulaire=new FormData();
          formulaire.append("qry","addPhotoArticle");
          // formulaire.append("id",form?.id);
          formulaire.append("fichier",res.fichier);
          formulaire.append("article",article);
          
          fetch(API_URL,{
            method:"POST",
            body:formulaire
          }).then(r=>r.json())
          .then(r=>{
            console.log(r);
            if(r.success)
            {
              Alert.alert("Bien enregistré");
              ToastAndroid.show("Article bien ajouté",ToastAndroid.SHORT);
              reinitForm();
            }else
            {
              Alert.alert("I","Echec d'enregistrement, veuillez reesayer plutard");
              console.log(r.msg);
            }
          }).catch((r)=>{
            Alert.alert("Article","Echec d'enregistrement, veuillez reesayer plutard");
            console.log(r);
          }).finally(()=>{
            // setIsUploading(false);
          });
        });
        setLoading(false);
        
  
      } catch (error) {
        Alert.alert("Une erreur s'est produite");
        console.log(error);
        
        // setLoading(false);
      }
     
      // setLoading(false);
  
    }
    const uploadImage2=async(uri: string)=>{
      // setLoading(true);
      setLoading(true);
      try {
        await FileSystem.uploadAsync(BACKEND_URL+"/upload_article.php", uri,{
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName:"file",
        }).then((r)=>{
            // console.log("resultat "+form.id+" ",r);
            // let res=JSON.parse(r.body);
            // let formulaire=new FormData();
            // formulaire.append("qry","addPhotoProfil");
            // formulaire.append("id",form.id);
            // formulaire.append("fichier",res.fichier);
            
            // fetch(API_URL,{
            //   method:"POST",
            //   body:formulaire
            // }).then(r=>r.json())
            // .then(r=>{
            //   if(r.success)
            //   {
            //     ToastAndroid.show("Photo bien ajouté",ToastAndroid.SHORT);
            //   }else
            //   {
            //     Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
            //     console.log(r.msg);
            //   }
            // }).catch((r)=>{
            //   Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
            //   console.log(r);
            // }).finally(()=>{
            //   setIsUploading(false);
            // });
            Alert.alert("ok");
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
  const handleSubmit=()=>{
    Alert.alert("Enregistrer","Voulez-vous enregistrer ?",[
      {
        text:"Oui",
        onPress:()=>{
          setTraiting(true);
          postData("ajoutService", form)
          .then(r=>{
            // console.log(("RETOURNER :"+r.data));
            
            if(r.success){
              Alert.alert("Enregistrer","Bien enregistré")
              setForm({...form,description:"",titre:""})
            }else
            {
              Alert.alert("Enregistrer","Echec d'enregistrement");
            }
           }).finally(()=>{
            setTraiting(false);
           })
        }
      },
      {
        text:"Annuler"
      }
    ])
   
  }
  useEffect(()=>{
    // console.log(authState.id);
    
  },[])
  return (
    <ScrollView className="flex-1 ">
       <View style={styles.hero}>
          <View className="bg-[#facc15] w-auto h-20 ">

          </View>
        </View>
      <View className=" flex  m-4 justify-center items-center">
        <Text style={styles.inputLabel}> Entreprise </Text>
        <TouchableOpacity onPress={()=>selectImage}>
          <View style={styles.photVehicule}>
            <MaterialIcons name="add-a-photo" size={54} color="#facc15" />
            <Text className=" m-2 text-center -left-16 font-light text-lg text-[#facc15] ">Ajouter une photos d'offre de service </Text>

          </View>
        </TouchableOpacity>
        <Text className=" mx-4 pt-2 font-light text-xs text-[#2B303A]">
          Toutes les annonces fond l'objet d un bref examen au moment de leur publication. avant d'etre vues.
        
        </Text>
        <View className=" w-full top-3 rounded-2xl h-auto bg-white">
          <ScrollView>
            <View className="items-center">

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Description du Services</Text>
                <Text className=" font-thin mx-3">Titre du service</Text>
                <TextInput
                  autoCapitalize="Titre"
                  autoCorrect={false}
                  placeholder="Titre "
                  placeholderTextColor="#6b7280"
                  onChangeText={(e)=>setForm({...form,titre:e})}
                  value={form.titre}
                  style={styles.inputControl}
                />
              </View>
              
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Description du services</Text>
                <Text className=" font-thin mx-3">decrit en detail le service</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  multiline={true}
                  placeholder="Description "
                  placeholderTextColor="#6b7280"
                  value={form.description}
                  onChangeText={(e)=>setForm({...form,description:e})}
                  style={styles.inputControl}

                />
              </View>

             

              <Text>
                {
                  traiting?
                    <View>
                      <ActivityIndicator />
                    </View>:
                    <TouchableOpacity
                    onPress={() => { handleSubmit() }} className="">
                      <Text style={styles.btn}>Enregistrer  </Text>
                    </TouchableOpacity>
                  }
              </Text>

            </View>            
          </ScrollView>
        </View>

      </View>
      
    </ScrollView>
  )
}

export default Formulaire

const styles = StyleSheet.create({

    inputControl: {

        height: 50,
        width: 360,
        backgroundColor: '#ffff',
        paddingHorizontal: 16,
        borderRadius:5,
        fontSize: 15,
        borderWidth: 0.5,
        fontWeight: '300',
        color: '#222',
        borderColor: "ffcccc",
    
      },
      input: {
        marginBottom: 16,
      },
    
      inputLabel: {
        lineHeight: 44,
        fontSize: 18,
        fontWeight: '500',
        color: '#2B303A'
      },
      form: {
        marginBottom: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      btn: {
        flexDirection: 'row',
        height: 50,
        width: 220,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        paddingTop: 17,
        borderWidth: 1,
        backgroundColor: '#facc15',
        borderColor: '#facc15',
        textAlign: 'center'
      },
      photVehicule: {
        width: 360,
        height: 180,
        borderRadius: 10,
        fontSize: 15,
        borderWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 150
    
      }
})