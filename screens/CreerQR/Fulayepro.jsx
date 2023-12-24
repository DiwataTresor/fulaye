import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CreerQR from './CreerQR';
import { getData, getProfil } from '../../utils/helper';
import { BACKEND_URL, photoProfil, photoProfilFct } from '../../global/helper';


const Service = ({ id, titre, description }) => {
  const [deleting, setDeleting] = useState(false);

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
    </View>
  )
}
const Prestataire = ({ navigation, route }) => {
  const [profil, setProfil] = useState(null);
  const [categorieCompte, setCategorieCompte] = useState(null);
  const [articles, setArticles] = useState([]);
  const { id, nom, categorie } = route.params;
  const [titreSection, setTitreSection] = useState("")
  const [services, setServices] = useState([]);

  const getServices = () => {
    getData("services&profil=" + id).then(r => {
      setServices(r.data);
      console.log("Services : " + r.data.length);
    })
  }
  useEffect(() => {
    getData(`profil&idProfil=${id}`).then(r => {
      setProfil(r.data[0]);
      setCategorieCompte(r.data[0]?.categorie);
    });
  }, [])
  useEffect(() => {
    switch (categorie) {
      case "commerce":
        setTitreSection("Mes articles en vente");
        getData("articles&profil=" + id).then(r => {
          setArticles(r.data);
          console.log("articles : " + r.data);
        })
        break;
      case "service":
        setTitreSection("Mes offres de services");
        getServices()
        break;
      case "metier":
        setTitreSection("Nos offre de services");
        getData("articles&profil=" + profil?.id).then(r => {
          console.log("articles : " + r);
        })
        break;

      default:
        break;
    }
    getServices();
  }, [categorieCompte])
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
        <ScrollView>
          <View style={styles.container} >
            <View className="flex-row w-96  shadow-md shadow-black  rounded-2xl -left-3  h-28  m-1 ">
              <View className=" w-32  h-24 ">
                <Image
                  source={require('../assets/Social.png')}
                  style={{ width: 380, height: 155 }}
                  className="rounded-xl "
                />
              </View>
             
            </View>

            <View className=" flex-row  mt-14 left-4 space-x-3">
              <View className=" w-20 h-20 -top-1 ">
                <Image
                  source={photoProfilFct(profil?.photo)}
                  // source={require('../assets/userprofile.png')}
                  className="rounded-full "
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View className=" flex">
                <Text className=" font-medium text-xl">{nom?.toUpperCase()}</Text>
                <Text className=" font-thin text-end">{profil?.profilTypeActivite}</Text>
                <Text className=" font-thin text-end">C/{profil?.commune} - {profil?.ville}</Text>
                <Text className=" font-thin text-end">{profil?.adresse}</Text>
                <Text className=" font-thin text-end">{profil?.telephone} </Text>

              </View>

            </View>

            <View className=" justify-center border-2 border-y-gray-100  top-2 flex-row items-center space-x-3">


            </View>
            <View className=" w-96 h-1  top-3  border-y-gray-200 "></View>

            <View className="justify-center  flex-row  space-x-5 h-14 items-center -left-2 pt-7">
              <View style={styles.btn} className="flex-row space-x-1 bg-[#201335] font-thin">
                <MaterialCommunityIcons name="check-network-outline" size={24} color="#facc15" />
                <Text className="text-[#facc15] font-thin top-1">Ajoute au Reseau</Text>
              </View>

              <TouchableOpacity onPress={() => {
                Linking.openURL("whatsapp://send?text=''&phone=" + profil?.whatsapp);
              }}>
                <View style={styles.btn1} className="flex-row space-x-2 font-thin">
                  <Fontisto name="whatsapp" size={24} color="#58BC82" />
                  <Text className=" top-1 font-thin text-[#58BC82]">Contactez-nous</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text className="text-sm font-thin pt-7">
              {profil?.bio}
            </Text>
            {/* AFFICHAGE ARTICLES */}
            {
              articles.length == 0 ?
                <View>
                  <Text className="text-center">Aucun article</Text>
                </View> :
                <>
                  <View className=" flex-row h-14 top-2">
                    <MaterialIcons name="home-repair-service" size={20} color="#201335" />
                    <Text className=" font-bold text-lg text-[#201335]" >{titreSection}</Text>
                  </View>

                  <ScrollView
                    contentContainerStyle={styles.listContent}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View className=" flex-row   space-x-2 justify-center items-center">
                      {
                        categorie == "commerce" &&
                          articles.length == 0 ?
                          <View >
                            <Text className="text-[#f1c3b2]">Pas d'articles disponibles  ajouter à votre compte</Text>
                          </View> :
                          articles.map((a, i) => {
                            return (

                              <View key={i} className=" w-46 h-52 rounded-md bg-gray-200">
                                <View className=" w-46 h-39 bg-white rounded-md ">
                                  <Image
                                    source={{ uri: BACKEND_URL + a.photo }}
                                    style={{ width: 164, height: 109 }}
                                    className=" rounded-md"
                                  />
                                </View>
                                <Text className=" text-base font-thin top-1  left-3 text-[#2B303A]">{a?.libelle}</Text>
                                <Text className="text-base font-thin  left-3 text-[#2B303A]">{a?.prix} FC</Text>
                              </View>

                            )
                          })
                      }
                    </View>
                  </ScrollView>
                </>
            }
            {/* FIN ARTICLES */}
            {/* AFFICHAGE SERVICE */}

            {
              services.length == 0 ?
                <View>
                  <Text className=" font-light  text-lg text-center">Aucun service enregistré</Text>
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
                          <Service key={i} description={a.description} titre={a.titre} id={a.id} />
                        )
                      })
                    }

                  </ScrollView>
                </View>

            }
            {/* FIN SERVICE */}

            <View className=" flex-row w-96  h-8  space-x-3 justify-center items-center rounded-2xl  my-2 mx-0 bg-white">

              <SimpleLineIcons name="like" size={20} color="#2B303A" />
              <Text className=" text-zinc-400 font-light text-xs">Jaime </Text>

              <MaterialCommunityIcons name="check-network-outline" size={20} color="#2B303A" />
              <Text className=" text-[2B303A] font-light text-xs">456 </Text>

              <Ionicons name="ios-notifications-outline" size={20} color="#2B303A" />
              <Text className=" text-zinc-400 font-light text-xs">Notifications push</Text>

            </View>
            <TouchableOpacity>
              <View className="w-96 h-14 top-2  space-x-2 flex-row font-bold  bg-[#003F91] rounded-md justify-center items-center -left-3">
                <FontAwesome name="facebook-square" size={24} color="#FFFFFF" />
                <Text className=" text-[#FFFFFF] font-light text-lg">Rejoindre notre page facebook</Text>
              </View>
            </TouchableOpacity>
            <Text className=" font-light text-xs pt-7">
              Bienvenue sur notre application mobile ! Nous sommes ravis de vous avoir parmi nous
              et nous espérons que vous apprécierez votre expérience avec notre application
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Prestataire

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
    width: 150,
    height: 45,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#201335',
    textAlign: 'center',



  },
  btn1: {
    width: 150,
    height: 45,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#58BC82',
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