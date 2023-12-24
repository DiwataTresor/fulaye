import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { getData, getProfil, postData } from '../../utils/helper';
import { BACKEND_URL, photoProfil, photoProfilFct } from '../../global/helper';
import { useAuth } from '../../context/AuthContext';


const Service = ({ id, titre, description, reponse }) => {
  const [deleting, setDeleting] = useState(false);
  const deleteService = () => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce service ?", [
      {
        text: "Annuler"
      }, {
        text: "Supprimer",
        onPress: () => {
          setDeleting(true);
          postData("deleteService", { service: id }).then(r => {
            console.log(r);
            if (r.success) {
              ToastAndroid.show("Bien reçu", ToastAndroid.SHORT);
              reponse(true)
            } else {
              ToastAndroid.show("Echec de suppression", ToastAndroid.SHORT);
            }
          }).catch((err) => {
            ToastAndroid.show("Une erreur de connexion s'est produite", ToastAndroid.SHORT);
          }).finally(() => {
            setDeleting(false)
          })
        }
      }
    ])
  }
  return (
    <View className="">
      <View className=" mr-2 flex-row   space-x-2 justify-center items-center">
        <View className="flex-wrap overflow-hidden w-46 h-52 rounded-md  bg-gray-200">
          <View className=" w-46 h-39 bg-white rounded-md ">
            <Image
              source={require('../assets/plomberiee.png')}
              style={{ width: "100%", height: 109 }}
              className=" rounded-md"
            />
          </View>
          <Text className="px-2 overflow-hidden w-full flex-wrap">{titre}</Text>
          <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
            {description}
          </Text>
        </View>
      </View>
      {
        deleting ?
          <View>
            <ActivityIndicator />
          </View> :
          <TouchableOpacity onPress={() => {
            deleteService()
          }}>
            <View className="mt-2">
              <Text className="flex-row px-3">
                <AntDesign name='delete' />
                <Text className="ml-3">Supprimer</Text>
              </Text>
            </View>
          </TouchableOpacity>
      }
    </View>
  )
}
const Article = ({a,feedback}) => {
  const [deleting,setDeleting]=useState(false); 
  const deleteArticle=()=>{
    Alert.alert("Suppression",`Voulez-vous vraiment supprimer ${a?.libelle} ?`,[
      {
        text:"Annuler"
      },
      { 
        text:"Supprimer",
        onPress:()=>{
          setDeleting(true);
          postData("deleteArticle",{"idArticle":a?.id}).then(r=>{
            if(r.success)
            {
              feedback("deleted");
            }else
            {
              feedback("failled");
            }
          }).finally(()=>setDeleting(false));
        }
      }
    ])
  }
  return (
    <View className=" w-46 h-52 rounded-md  bg-gray-200 mr-2">
      <View className=" w-46 h-39 bg-white rounded-md ">
        <Image
          source={{ uri: BACKEND_URL + a.photo }}
          style={{ width: 164, height: 109 }}
          className=" rounded-md"
        />
      </View>
      <Text className=" text-base font-thin top-1  left-3 text-[#2B303A]">{a?.libelle}</Text>
      <Text className="text-base font-thin  left-3 text-[#2B303A]">{a?.prix} FC</Text>
      {
        deleting?
        <View>
          <ActivityIndicator />
        </View>:
        <TouchableOpacity onPress={() => {
          deleteArticle(a?.id, a?.libelle)
        }}>
          <Text className="text-center mt-2 bg-[#E6E7E5] pt-2 pr-2 pl-2 rounded-md h-6">
            Supprimer
          </Text>
        </TouchableOpacity>
      }
    </View>
  )
}
const Monprofil = ({ navigation, route }) => {
  const { authState } = useAuth();
  //    console.log(authState);
  const [profil, setProfil] = useState({});
  const [categorieCompte, setCategorieCompte] = useState(null);
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [titreSection, setTitreSection] = useState("");
  // const { id, nom } = route.params || {id:null,nom:""};
  const getServices = () => {
    setTitreSection("Mes offres de services");
    getData("services&profil=" + profil?.id).then(r => {
      setServices(r.data);
      console.log("articles : " + r);
    })
  }
  const getCommerce = () => {
    setTitreSection("Mes articles en vente");
    getData("articles&profil=" + profil?.id).then(r => {
      setArticles(r.data);
      console.log("articles : " + r.data);
    })
  }
  const getMetier = () => {
    setTitreSection("Mes offres");
    getData("articles&profil=" + profil?.id).then(r => {
      console.log("articles : " + r);
    })
  }
  const getProfil=()=>{
    getData(`profil&idProfil=${profil?.id}`).then(r => {
      console.log(r);
      setProfil({
        ...profil,
        commune: r.data[0].commune,
        ville: r.data[0].ville,
        adresse: r.data[0].adresse,
        profilTypeActivite: r.data[0].profilTypeActivite
      });
      setCategorieCompte(r.data[0]?.categorie);
      getServices();
      getCommerce();
      getMetier();
    });
  }

  useEffect(() => {
    setProfil(JSON.parse(authState?.token));

    
  }, [])
  useEffect(() => {
    getProfil()
  })

  const reponse = (text) => {
    if (text) {
      getServices();
    }
  }

  const feedback=(fdb)=>{
    if(fdb=="deleted")
    {
      ToastAndroid.show("Bien supprimé",ToastAndroid.SHORT);
      getServices();
      getCommerce();
      getMetier();
    }else
    {
      ToastAndroid.show("Echec de suppression",ToastAndroid.SHORT);
    }
  } 
 
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
        <ScrollView>
          <View style={styles.container} >
            <View className="flex-row w-96 bg-[#facc15] rounded-2xl -left-6  h-28  m-3 -top-2">
              <View className=" w-32  h-24 top-2 left-3 ">
                <Image
                  source={require('../assets/formation.png')}
                  style={{ width: 120, height: 120 }}
                />
              </View>
              <View className=" flex w-50  bg-[#facc15]">
                <Text className=" text-center text-3xl font-bold mx-1  w-40 pt-4 text-[#201335]">
                  FULAYE
                </Text>
                <Text className=" text-center text-[#201335]  left-2 font-thin text-lg ">Semplifie votre vie numerique

                </Text>

              </View>
            </View>

            <View className=" flex-row left-4 space-x-3">
              <View className=" w-20 h-20 -top-1 ">
                <Image
                  source={photoProfilFct(profil?.photo)}
                  // source={require('../assets/userprofile.png')}
                  className="rounded-full "
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View className=" flex">
                <Text className=" font-medium text-xl">{profil?.nom?.toUpperCase()}</Text>
                <Text className=" font-thin text-end">{profil?.profilTypeActivite}</Text>
                <Text className=" font-thin text-end">{profil?.adresse}</Text>
                <Text className=" font-thin text-end">C/{profil?.commune} - {profil?.ville}</Text>
                <Text className=" font-thin text-end">{profil?.telephone} </Text>
              </View>
             
            </View>

            <View className=" justify-center border-2 border-y-gray-100  top-2 flex-row items-center space-x-3">


            </View>
            <View className=" w-96 h-1  top-3  border-y-gray-200 "></View>

            <View className="justify-center  flex-row space-x-7 h-14 items-center -left-2 pt-7">
              <TouchableOpacity onPress={
                () => { navigation.navigate("FormulaireArticle") }
              } style={styles.btn} className="flex-row space-x-1 bg-[#201335] font-thin">
                <Fontisto name="shopping-basket" size={20} color="#facc15" />
                <Text className="text-[#facc15] font-thin top-1"> Article</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={
                () => { navigation.navigate("FormulaireEntreprise") }
              } style={styles.btn} className="flex-row space-x-1 bg-[#201335] font-thin">
                <MaterialIcons name="announcement" size={20} color="#facc15" />
                <Text className="text-[#facc15] font-thin top-1"> Service</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={
                () => { navigation.navigate("FormulaireService") }
              } style={styles.btn} className="flex-row space-x-1 bg-[#201335] font-thin">
                <Entypo name="gauge" size={20} color="#facc15" />
                <Text className="text-[#facc15] font-thin top-1">Offre</Text>
              </TouchableOpacity>



            </View>

            <Text className="text-sm font-thin pt-7">
              {profil?.bio}
            </Text>


            {/* AFFICHAGE ARTICLES */}
            {
              articles.length == 0 ?
                <>
                  <View>
                    <Text className="text-black font-light text-lg text-center">Aucun article enregistré</Text>
                  </View>
                </> :
                <>
                  <View className=" flex-row h-14 top-2">
                    <MaterialIcons name="home-repair-service" size={20} color="#201335" />
                    <Text className=" font-bold text-lg text-[#201335]">{titreSection}</Text>
                  </View>
                  <ScrollView
                    contentContainerStyle={styles.listContent}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View className=" flex-row   space-x-2 justify-center items-center">
                      {/* <View className=" w-46 h-52 rounded-md  bg-gray-200">
                        <View className=" w-46 h-39 bg-white rounded-md ">
                          <Image
                            source={require('../assets/plomberiee.png')}
                            style={{ width: 164, height: 109 }}
                            className=" rounded-md"
                          />
                        </View>
                        <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                          l'installation de tuyaux, de robinets,
                          de lavabos, de toilettes, de douches,
                          de baignoires, de chauffe-eau
                        </Text>

                      </View> */}
                      {/* <View className=" w-46 h-52 rounded-md  bg-gray-200">
                        <View className=" w-46 h-39 bg-white rounded-md ">
                          <Image
                            source={require('../assets/plomberieb.png')}
                            style={{ width: 164, height: 109 }}
                            className=" rounded-md"
                          />
                        </View>
                        <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                          Débouchage des canalisations :
                          les canalisations obstruées,
                          que ce soit dans les éviers,
                        </Text>
                      </View> */}
                      {
                        categorieCompte == "commerce" &&
                          articles.length == 0 ?
                          <View >
                            <Text className="text-[#f1c3b2]">Pas d'articles disponibles  ajouter à votre compte</Text>
                          </View> :
                          articles.map((a, i) => {
                            return (
                              <Article key={i} a={a} feedback={feedback} />
                            )
                          })
                      }

                    </View>
                  </ScrollView>
                </>
            }
            {/* FIN ARTICLES */}
            {/* AFFICHAGE SERVICES */}
            {
              services.length == 0 ?
                <View>
                  <Text className="text-center ">Aucun service enregistré</Text>
                </View> :
                <View>
                  <View className=" flex-row h-14 top-2">
                    <MaterialIcons name="home-repair-service" size={20} color="#201335" />
                    <Text className=" font-bold text-lg text-[#201335]">Top prestateur et annonces</Text>
                  </View>
                  <ScrollView
                    contentContainerStyle={styles.listContent}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {
                      services.map((a, i) => {
                        return (
                          <Service key={i} description={a.description} titre={a.titre} id={a.id} reponse={reponse} />
                        )
                      })
                    }

                  </ScrollView>
                </View>

            }

            <View className=" w-96 h-1  top-1  bg-gray-100 "></View>

            <View className=" flex-row h-4  top-0">

            </View>
            <TouchableOpacity onPress={() => navigation.navigate("CreerQR")}>
              <View className="w-96 h-14 flex-row font-bold  bg-[#facc15] rounded-md justify-center items-center -left-3">
                <Entypo name="price-tag" size={24} color="#201335" />
                <Text className=" text-[#201335] font-light text-lg">Gérer vos annonce Fulaye</Text>
              </View>
            </TouchableOpacity>


            <Text className=" font-light text-xs pt-3">
              Nous sommes ravis de vous accueillir sur notre plateforme
              [ Fulaye ] Nous sommes là pour vous offrir
              une expérience exceptionnelle et répondre à tous vos besoins.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Monprofil

const styles = StyleSheet.create({

  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profileSubtitle: {
    fontSize: 15,
    paddingRight: 50,
    fontWeight: '200',
    color: '#373F51',
    textAlign: 'center',
  },
  btnId: {
    width: 160,
    height: 35,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',
    textAlign: 'center',
    color: '#fc2222'

  },
  btnshare: {
    width: 120,
    height: 35,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',
    textAlign: 'center',
    color: '#fc2222'
  },
  btn: {

    height: 45,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#201335',
    textAlign: 'center',



  },
  btn1: {

    height: 45,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#201335',
    textAlign: 'center',

  },
  btn3: {

    height: 40,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#201335',
    textAlign: 'center',

  },
  service: {
    width: 356,
    height: 128,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',

  }

})