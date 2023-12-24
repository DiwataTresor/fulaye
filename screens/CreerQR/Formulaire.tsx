import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';
import Dropdown from 'react-native-input-select';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Louer from './Louer';
import Vehicule from './Vehicule';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getData, postData } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';
import { API_URL, BACKEND_URL } from '../../global/helper';
import FormulaireService from './FormulaireService';
import FormulaireCommerce from './FormulaireCommerce';
import FormulaireEntreprise from './FormulaireEntreprise';


const HEADER_OFFSET = 100;
const HEADER_BACKGROUND = {
  default: 'rgba(255,255,255,0)',
  scroll: 'rgba(255,255,255,1)',
};

export default function Formulaire({ navigation, route }) {
  const [value, setValue] = React.useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [categorieCompte, setCategorieCompte] = useState(null);
  const [etat, setEtat] = useState({
    neuf: true,
    occasion: false,
    current: 'N'
  })
  const [f, setF] = useState({
    nom: "",
    prix: "0",
    description: "",
    etat: etat.current
  })
  const { authState } = useAuth();

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_OFFSET, HEADER_OFFSET + 10],
    outputRange: [
      HEADER_BACKGROUND.default,
      HEADER_BACKGROUND.default,
      HEADER_BACKGROUND.scroll,
    ],
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_OFFSET, HEADER_OFFSET + 10],
    outputRange: [1, 1, 0],
  });
  const opacityReversed = scrollY.interpolate({
    inputRange: [0, HEADER_OFFSET, HEADER_OFFSET + 10],
    outputRange: [0, 0, 1],
  })

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
      console.log(r.assets[0].uri);
      setResult(r.assets[0].uri);
      saveImage(r.assets[0].uri);
    }
  };
  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    // setImages([...images,dest]);
  }
  const uploadImage1 = async (uri: string, article: string) => {
    setLoading(true);
    Alert.alert(uri);
    // console.log(" "+article+" fichiers: "+result);
    try {

      await FileSystem.uploadAsync(BACKEND_URL + "upload_article.php", uri, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
      }).then((r) => {
        let fichier = r.fichier;
        // let res=JSON.parse(r.body);
        let formulaire = new FormData();
        formulaire.append("qry", "addPhotoArticle");
        formulaire.append("article", article);
        formulaire.append("fichier", fichier);

        fetch(BACKEND_URL + "upload_article.php", {
          method: "POST",
          body: formulaire
        }).then(r => r.json())
          .then(res => {
            // Alert.alert("ok");
            console.log(res);
            if (res.success) {
              ToastAndroid.show("Photo bien ajouté", ToastAndroid.SHORT);
            } else {
              // Alert.alert("Photo profil","Echec d'enregistrement, veuillez reesayer plutard");
              console.log(res.msg);
            }
          }).catch((res) => {
            Alert.alert("Image article", "Echec d'enregistrement, veuillez reesayer plutard");
            console.log(res);
          }).finally(() => {
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
  const Radio = ({ text, selected }) => {
    return (
      <View className="flex flex-row gap-3 mr-5">
        <View className={`w-5 h-5 rounded-full ${selected ? "bg-green-500" : "bg-gray-200"}`}></View>
        <View><Text>{text}</Text></View>
      </View>
    )
  }
  const reinitForm = () => {
    setF({ ...f, nom: "", prix: "0", description: "", etat: "N" });
    setEtat({ ...etat, current: "N", neuf: true, occasion: false });
    setResult("");
  }
  const handleSubmit = () => {
    Alert.alert("Ajout article", "Voulez-vous vraiment enregistrer cet article ?", [
      {
        text: "Enregistrer",
        onPress: () => {

          setLoading(true);
          // Alert.alert(" "+authState?.id || "rien");
          let d = { ...f };
          d.id = authState?.id || null;

          postData("article", d)
            .then(r => {

              let article = r.article;

              if (result == "") {
                setLoading(false);
                reinitForm();
                Alert.alert("Article bien enregistré");
              } else {
                uploadImage(result, article);
              }
            }).catch(err => {
              Alert.alert("Echec d'envoi, une erreur s'est produite");
              console.log(err);
              setLoading(false);
            })
        }
      },
      {
        text: "Annuler",
        onPress: () => {

        }
      },

    ])
  }
  const getProfil = () => {
    const id = JSON.parse(authState.token)?.id || null;
    if (id !== null) {
      getData("myProfil", id).then(r => {
        setCategorieCompte(r.categorie);
      });
    }
  }
  useEffect(() => {
    getProfil();
  }, [])
  return (
    <View style={{ flex: 1 }}>
      {
        categorieCompte == "commerce" ?
          <View>
            <Animated.View style={[styles.actions, { backgroundColor, opacity }]}>
              <SafeAreaView>
                <View style={styles.actionWrapper}>


                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.action}>
                      <FeatherIcon color="#fff" name="share" size={22} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.action}>
                      <FeatherIcon color="#fff" name="search" size={22} />
                    </View>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Animated.View>
            <Animated.View
              style={[styles.actions, { backgroundColor, opacity: opacityReversed }]}>
              <SafeAreaView>
                <View style={styles.actionWrapper} >
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={{ marginRight: 'auto' }}>

                  </TouchableOpacity>


                </View>
              </SafeAreaView>
            </Animated.View>
            <ScrollView
              style={styles.container}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollY,
                      },
                    },
                  },
                ],
                { useNativeDriver: false },
              )}
              scrollEventThrottle={1}>
              <StatusBar barStyle="light-content" />
              <View style={styles.hero}>
                <View className="bg-[#facc15] w-auto h-20 ">

                </View>
              </View>
              <View style={styles.header}>
                <View className="flex-row space-x-1 justify-center ">

                  <View className="grid flex-row grid-cols-8 divide-x">
                    <TouchableOpacity onPress={() => navigation.navigate("Messenger")}>
                      <Text className="px-2 space-x-3">
                        <MaterialCommunityIcons name="shopping" size={20} color="#facc15" className=" m-3" />
                        Articles
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Vehicule")}>
                      <Text className="space-x-1 pl-2 px-3">
                        <FontAwesome name="car" size={20} color="#facc15" />
                        Vehicules
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Louer")}>
                      <Text className="space-x-2 pl-5 px-3">
                        <FontAwesome5 name="house-user" size={20} color="#facc15" className=" px-2 " />
                        <Text>Maison à Vendre ou à louer</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>

              <View style={styles.content}>
                <View style={styles.contentTabs}>
                  {[
                    { name: 'Menu' },
                    { name: 'Articles', badge: 22 },

                  ].map(({ name, badge }, index) => {
                    const isActive = index === value;

                    return (
                      <View
                        key={name}
                        style={[
                          styles.contentTabsItemWrapper,
                          isActive && { borderBottomColor: '#ff9801' },
                        ]}>

                      </View>
                    );
                  })}
                </View>

                <View style={styles.categories}>
                  <View style={styles.categoriesHeader}>

                    <View style={styles?.from}>

                      <View style={styles.input}>
                        <Text style={styles.inputLabel}>Titre d'Article</Text>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="Titre de l artiste"
                          placeholderTextColor="#A3A9AA"
                          style={styles.inputControl}
                          value={f.nom}
                          onChangeText={(e) => setF({ ...f, nom: e })}
                        />
                      </View>

                      <View style={styles.input}>
                        <Text style={styles.inputLabel}>Prix d'Article</Text>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="Prix d'articles"
                          placeholderTextColor="#A3A9AA"
                          style={styles.inputControl}
                          value={f.prix}
                          onChangeText={(e) => setF({ ...f, prix: e })}
                        />
                      </View>


                      <Text style={styles.inputLabel}>Etat </Text>
                      <View style={styles.input} className="flex flex-row gap-8 mt-1 items-center pl-5">
                        <TouchableOpacity onPress={() => setEtat({ neuf: true, occasion: false, current: 'N' })}>
                          <Radio text={"Neuf"} selected={etat.neuf} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEtat({ neuf: false, occasion: true, current: 'O' })}>
                          <Radio text={"Occasion"} selected={etat.occasion} />
                        </TouchableOpacity>

                      </View>
                      <View style={styles.input}>
                        <Text style={styles.inputLabel}>Description </Text>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="Description"
                          placeholderTextColor="#A3A9AA"
                          style={styles.inputControl}
                          value={f.description}
                          onChangeText={(e) => setF({ ...f, description: e })}
                        />

                      </View>


                      <View className=" flex-row  justify-center items-center gap-3">
                        <TouchableOpacity onPress={() => selectImage(false)} className="bg-[#facc15] flex items-center justify-center px-5 py-2 rounded-md">
                          <MaterialIcons name="add-a-photo" size={24} color="#2B303A" className="t" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectImage(true)} className="bg-[#facc15] flex items-center justify-center px-5 py-2 rounded-md">
                          <AntDesign name="folderopen" size={24} color="#2B303A" />
                        </TouchableOpacity>
                      </View>
                      <View className="flex items-center rounded-3xl justify-center my-4">
                        {result !== "" &&
                          <Image source={{ uri: result }} width={350} height={200} className=" rounded-2xl" />
                        }
                      </View>
                      {
                        loading ?
                          <TouchableOpacity className="rounded-full py-3  mx-7">
                            <Text style={styles.btn} className="text-white justify-center"><ActivityIndicator /></Text>
                          </TouchableOpacity> :
                          <TouchableOpacity
                            onPress={() => { handleSubmit() }} className=" rounded-full shadow-lg shadow-black py-3  mx-7">
                            <Text style={styles.btn} className="text-[#2B303A]  justify-center">Enregistrer  </Text>
                          </TouchableOpacity>
                      }
                    </View>

                  </View>
                  <Text className="  font-light  text-xs  text-[#2B303A]">
                    Photo 0/2 Choisissesz d'abord la photo principale de votre annonce.
                    Ajoutez plus de photos sous differents angless
                  </Text>
                  <Text className=" pt-4 font-light text-xs  text-[#2B303A]">
                    Toutes les annonces fond l'objet d un bref examen au moment de leur publication. avant d'etre vues.
                    ll est ainsi interdit  des armes, des objets contrefaits et plus encore
                  </Text>

                </View>

                <View style={styles.placeholder}>

                </View>
              </View>
            </ScrollView>
          </View>:
          categorieCompte=="metier"?
                    <Text>Metier</Text>:
          categorieCompte=="service"?
                      <FormulaireService />:
                      <FormulaireEntreprise />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionFilled: {
    backgroundColor: '#E7E4E4',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
    paddingHorizontal: 16,
  },
  hero: {
    position: 'relative',
  },
  heroOverflow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroImg: {
    width: '100%',
    height: 200,
  },
  heroStatus: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#ff9801',
    borderRadius: 50,
  },
  heroStatusText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.1,
    color: '#ffffff',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTopAction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: 44,
    height: 44,
    maxWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    backgroundColor: '#f4405b',
    borderRadius: 9999,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerLocationText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.01,
    color: '#323142',
    opacity: 0.7,
    marginLeft: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 38,
    letterSpacing: -0.015,
    color: '#323142',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginBottom: 6,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    marginTop: 8,
  },
  contentTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  stats: {
    flexDirection: 'row',
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  statsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsItemText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#323142',
    opacity: 0.7,
    marginBottom: 4,
  },
  statsItemValue: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#323142',
    marginLeft: 4,
  },
  contentTabsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  contentTabsItemWrapper: {
    marginRight: 28,
    borderColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
  },
  contentTabsItemText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#706f7b',
  },
  contentTabsItemBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
    backgroundColor: '#ff9801',
    borderRadius: 20,
  },
  contentTabsItemBadgeText: {
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 12,
    color: '#fff',
  },
  categoriesContent: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  categoriesAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  categoriesActionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
  },
  card: {
    width: 80,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 20,
  },
  placeholderInset: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  cardLabel: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#252117',
  },
  container: {
    backgroundColor: '#F4F5F6',
  },
  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    paddingVertical: 12,
  },
  categories: {
    marginTop: 20,
  },

  inputControl: {

    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
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

});