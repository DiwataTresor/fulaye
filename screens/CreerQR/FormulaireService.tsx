import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Dimensions, ToastAndroid, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from '../../context/AuthContext';
import { API_URL, BACKEND_URL, photoProfilFct } from '../../global/helper';
import { getData, postData } from '../../utils/helper';


export const CardOffre = ({id,fichier,titre,deleteOffre}) => {
  const suppression=(id)=>{
   
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ?", [
      {
        text: "Annuler"
      },
      {
        text: "Oui supprimer",
        onPress: () => {
          postData("deleteOffre", { idOffre: id }).then(r => {
            if(r.success)
            {
              deleteOffre(true);
            }else
            {
              deleteOffre(false);
            }
          });
        }
      }
    ]);
  }
  return (
    <View>
      <Image width={300} height={200} source={{ uri: BACKEND_URL + "imagesOffre/" + fichier }} />
      <View><Text>{titre}</Text></View>
      <TouchableOpacity onPress={() => suppression(id)}>
        <AntDesign name='delete' size={20} />
      </TouchableOpacity>
    </View>
  )
}
const Formulaire = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false)
  const [offres, setOffres] = useState([])
  const { authState } = useAuth();
  const [formulaire, setFormulaire] = useState({
    titre: "",
    categorie: "",
    prix: 0,
    localisation: "",
    periode: "",
  })
  const [activeTab, setActiveTab] = useState("nouveau");
  // Pour image
  const imgDir = FileSystem.documentDirectory + "images/";
  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };
  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      // setImages(files.map(f =>imgDir+f));
    }
  }
  let r = null;
  const selectImage = async (useLibrary: boolean) => {

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75
    }

    if (useLibrary) {
      r = await ImagePicker.launchImageLibraryAsync(options);

    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      r = await ImagePicker.launchCameraAsync(options);

    }

    if (!r.canceled) {
      setResult(r.assets[0].uri);
      //  saveImage(r.assets[0].uri); 
    }
  };
  const saveImage = async (uri: string) => {
    Alert.alert("Enregistrement", "Voulez-vous vraiment enregistre", [
      {
        text: "Oui, enregistrer",
        onPress: () => {
          ensureDirExists();
          const filename = "_" + authState?.id + "_" + new Date().getTime() + ".jpg";
          const dest = imgDir + filename;
          FileSystem.copyAsync({ from: uri, to: dest });
          uploadImage1(filename);
        }
      }, {
        text: "Annuler"
      }
    ]);


    // setImages([...images,dest]);
  }
  const uploadImage1 = async (uri: string) => {
    //  setLoading(true);
    const fichierComplet = imgDir + uri;

    try {

      await FileSystem.uploadAsync(BACKEND_URL + "upload_offre.php", fichierComplet, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
      }).then((r) => {
        //  let fichier=r.fichier;
        console.log("Retour : " + r);
        let _formulaire = new FormData();
        _formulaire.append("qry", "addOffre");
        _formulaire.append("offre", JSON.stringify(formulaire));
        _formulaire.append("fichier", uri);
        _formulaire.append("utilisateur", authState.id);

        fetch(API_URL, {
          method: "POST",
          body: _formulaire
        }).then(r => r.json())
          .then(res => {
            console.log(res);

            if (res.success) {
              ToastAndroid.show("Offre bien enregistrée", ToastAndroid.SHORT);
              setFormulaire({
                titre: "",
                localisation: "",
                periode: "",
                prix: 0
              });
              getListe()
            } else {
              Alert.alert("Echec d'enregistrementss, veuillez reessayer plutard");
              console.log("Erreur msg " + res.msg);
            }
          }).catch((res) => {
            Alert.alert("Echec d'enregistrement", "Echec d'enregistrement, veuillez reesayer plutard");
            console.log(res);

          }).finally(() => {
            setLoading(false);
          });
      });

    } catch (error) {
      Alert.alert("Une erreur s'est produite");
      console.log("erreur" + error);
      setLoading(false)
    }
  }
  const uploadImage = async (uri: string, article: string) => {
    setLoading(true);
    // setIsUploading(true);
    try {
      await FileSystem.uploadAsync(BACKEND_URL + "upload_article.php", uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
      }).then((r) => {
        // console.log("resultat "+form?.id+" ",r);
        let res = JSON.parse(r.body);
        let formulaire = new FormData();
        formulaire.append("qry", "addPhotoArticle");
        // formulaire.append("id",form?.id);
        formulaire.append("fichier", res.fichier);
        formulaire.append("article", article);

        fetch(API_URL, {
          method: "POST",
          body: formulaire
        }).then(r => r.json())
          .then(r => {
            console.log(r);
            if (r.success) {
              Alert.alert("Bien enregistré");
              ToastAndroid.show("Article bien ajouté", ToastAndroid.SHORT);
              reinitForm();
            } else {
              Alert.alert("I", "Echec d'enregistrement, veuillez reesayer plutard");
              console.log(r.msg);
            }
          }).catch((r) => {
            Alert.alert("Article", "Echec d'enregistrement, veuillez reesayer plutard");
            console.log(r);
          }).finally(() => {
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
  const uploadImage2 = async (uri: string) => {
    // setLoading(true);
    setLoading(true);
    try {
      await FileSystem.uploadAsync(BACKEND_URL + "/upload_article.php", uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
      }).then((r) => {
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
  const handleSubmit = () => {
    let err = false;
    let errDetail = "";
    if (formulaire.titre === "") { err = true; errDetail = "Veuillez saisir le titre de l'offre" }
    if (formulaire.categorie === "") { err = true; errDetail = "Veuillez saisir la categorie de l'offre" }
    if (result == null) { err = true; errDetail = "Veuillez selectionner une image pour votre offre" }
    if (err) {
      Alert.alert("Offre", errDetail);
    } else {
      saveImage(result);
    }
  }
  const tabActive = "border-b-2 border-blue-500 text-blue-500 font-bold text-lg";
  const tab = "border-b-0 border-blue-500 font-normal text-lg";

  const getListe = () => {
    getData("offresByUser&utilisateur=" + authState.id).then(r => {
      setOffres(r.data);
    });
  }
  const deleteOffre = (msg) => {
    if(msg)
    {
      ToastAndroid.show("Bien supprimé",ToastAndroid.SHORT);
      getListe();
    }else
    {
      Alert.alert("Suppression","Echec de suppression");
    }
  }
  useEffect(() => {
    getListe();
  }, [])
  return (
    <ScrollView className="flex-1 mb-4">
       <View style={styles.hero}>
          <View className="bg-[#facc15] w-auto h-20 ">

          </View>
        </View>
      <View className="flex flex-row gap-4 pt-5 pl-8">
        <View>
          <Text onPress={() => setActiveTab("nouveau")} className={activeTab === "nouveau" ? tabActive : tab}>Nouveau</Text>
        </View>
        <View>
          <Text onPress={() => setActiveTab("liste")} className={activeTab === "liste" ? tabActive : tab}>Liste</Text>
        </View>
      </View>
      {
        activeTab == "nouveau" ?
          <View className=" flex  justify-center items-center">
            <Text style={styles.inputLabel}> Services </Text>
            {
              result == null ?
                <TouchableOpacity onPress={() => selectImage(true)}>
                  <View style={styles.photVehicule}>
                    <MaterialIcons name="add-a-photo" size={54} color="#facc15" />
                    <Text className=" m-2 text-center font-light text-lg -left-16 text-[#facc15] ">Ajouter une photo pour votre service </Text>

                  </View>
                </TouchableOpacity> :
                <View className="py-4 px-5">
                  <Image source={{ uri: result }} width={Dimensions.get("screen").width} height={200} className="mx-4" />
                  <View className="flex gap-3 flex-row justify-center items-center mt-3">
                    <TouchableOpacity onPress={() => setResult(null)}><Text>Annuler</Text></TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>saveImage(result)}><Text>Save</Text></TouchableOpacity> */}
                  </View>
                </View>
            }
            <Text className=" mx-4 pt-2 font-light  text-xs text-[#2B303A]">
              Toutes les annonces fond l'objet d un bref examen au moment de leur publication. avant d'etre vues.

            </Text>
            <View className=" w-full top-3 rounded-2xl h-auto bg-white">
              <ScrollView>

                <View className="flex justify-center items-center">
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Description de l'offre</Text>
                    <Text className=" font-light text-sm mx-3">Titre de l'Offre</Text>
                    <TextInput
                      autoCapitalize="Lieu"
                      autoCorrect={false}
                      placeholder="Formation"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={formulaire.titre}
                      onChangeText={(e) => setFormulaire({ ...formulaire, titre: e })}
                    />
                  </View>
                </View>
                <View className="flex justify-center items-center">
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Categorie de l'offre</Text>
                    <Text className=" font-light text-sm mx-3">décrire l'offre</Text>
                    <TextInput
                      autoCapitalize="Lieu"
                      autoCorrect={false}
                      placeholder="Ex: formation Digital"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={formulaire.categorie}
                      onChangeText={(e) => setFormulaire({ ...formulaire, categorie: e })}
                    />
                  </View>
                </View>
                <View className="flex justify-center items-center">
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Prix</Text>
                    <Text className=" font-light text-sm mx-3">le prix de son offre</Text>
                    <TextInput
                      autoCapitalize="Lieu"
                      autoCorrect={false}
                      placeholder="Ex: formation Digital"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={formulaire.prix}
                      onChangeText={(e) => setFormulaire({ ...formulaire, prix: e })}
                    />
                  </View>
                </View>

                <View className="flex justify-center items-center">
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Localisation</Text>
                    <Text className="font-light text-sm mx-3">localisation de l'offre</Text>
                    <TextInput
                      autoCapitalize="Lieu"
                      autoCorrect={false}
                      placeholder="Ex: Kinshasa"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={formulaire.localisation}
                      onChangeText={(e) => setFormulaire({ ...formulaire, localisation: e })}
                    />
                  </View>
                </View>

                <View className="flex justify-center items-center">
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Date d'expiration</Text>
                    <Text className=" font-light text-sm mx-3">la date à laquelle  offre expire</Text>
                    <TextInput
                      autoCapitalize="characters"
                      autoCorrect={false}
                      placeholder="Ex: 02 au 30 Dec"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={formulaire.periode}
                      onChangeText={(e) => setFormulaire({ ...formulaire, periode: e })}
                    />
                  </View>
                </View>
                <View className="mb-3">
                  {
                    loading === false ?
                      <Text className="justify-center items-center left-9">
                        <TouchableOpacity
                          onPress={() => { handleSubmit() }} className="">
                          <Text style={styles.btn}>Enregistrer  </Text>
                        </TouchableOpacity>
                      </Text> :
                      <View className="flex flex-row justify-center items-center">
                        <Text style={styles.btn}><ActivityIndicator /></Text>
                        <Text onPress={() => setLoading(false)}>Annuler</Text>
                      </View>
                  }
                </View>
              </ScrollView>
            </View>

          </View> :
          <View className="px-8 mt-4">
            <Text>
              Liste
            </Text>
            <View>
              {
                offres?.length == 0 ?
                  <View><Text>Aucune offre enregistrée</Text></View> :

                  offres?.map((o, i) => {
                    return (
                      <CardOffre fichier={o.fichier} id={o.id} titre={o.titre} key={i} deleteOffre={deleteOffre} />
                    )
                  }
                  )

              }
            </View>
          </View>
      }
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
    borderRadius: 5,
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