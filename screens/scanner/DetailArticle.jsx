import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BACKEND_URL, photoProfilFct } from '../../global/helper';
import { articleInitialStatus, articleNbLike, camelCase, getData, getProfil, postData, setArticleLikeStatus } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';
import Like from '../../components/Like';



const DetailArticle = ({ navigation, route }) => {
  const [vendeur, setVendeur] = useState({ adresse: "", commune: "", telephone: "", bio: "", photo: "" });
  const [isTraiting, setIsTraiting] = useState(false);
  const [statutDemande, setStatutDemande] = useState(null)
  const { authState } = useAuth();
  const [nbreLike, setNbreLike] = useState(0);
  const [articleLiked, setArticleLiked] = useState(false);

  const { id, prix, titre, auteur, img, description, utilisateur } = route.params;
  const demandeDisponibilite = () => {
    if (authState.authenticated == false) {
      Alert.alert("Demande de disponibilité", "Vous devez être connecté pour éffectuer cette demande")
    } else {
      setIsTraiting(true);
      postData("demandededisponibilite", { "acticleId": id, utilisateur: authState.id })
        .then(r => {
          console.log(r);
          if (r.success) {
            ToastAndroid.show("Demande bien envoyé", ToastAndroid.SHORT);
            getStatutDemande();
          } else {
            ToastAndroid.show("Echec de demande", ToastAndroid.SHORT);
          }
        }).finally(() => {
          setIsTraiting(false);
        })
    }
  }
  const annulerDemande = () => {

    if (authState.authenticated == false) {
      Alert.alert("Demande de disponibilité", "Vous devez être connecté pour éffectuer cette demande")
    } else {
      setIsTraiting(true);
      postData("annulerDemander", { "acticleId": id, utilisateur: authState.id })
        .then(r => {
          console.log(r);
          if (r.success) {
            ToastAndroid.show("Demande bien annulée", ToastAndroid.SHORT);
            getStatutDemande();
          } else {
            ToastAndroid.show("Echec d'annulation", ToastAndroid.SHORT);
          }
        }).finally(() => {
          setIsTraiting(false);
        })
    }
  }
  const getStatutDemande = () => {
    getData(`articleDejaDemande&articleId=${id}&utilisateur=${authState.id}`).then(r => {
      console.log(r);
      if (r.success) {
        setStatutDemande("Y");
      } else {
        setStatutDemande('N');
      }
    }).finally(r => {

    })
  }
  const likeStatus = () => {

  }
  const likeOrUnlike = () => {
    console.log(authState);
    if (authState?.authenticated == null) {
      Alert.alert("Demande de disponibilité", "Vous devez être connecté pour éffectuer cette demande");
    } else {
      if (articleLiked == false) {
        setArticleLikeStatus(id, authState.id, "L")
          .then(r => {
            if (r) {
              setArticleLiked(true);
              articleNbLike(id).then(r=>{
                setNbreLike(r)
              });
            }
          })
      } else {
        setArticleLikeStatus(id, authState.id, "U")
        .then(r => {
          if (r) {
            setArticleLiked(false);
            articleNbLike(id).then(r=>{
              setNbreLike(r)
            });
          }
        })
      }
      
    }

  }
  const nbreLikes=()=>{
    getData("articleNbLike&articleId="+id).then(r=>{
     setNbreLike(r.data);
    })
  }
  useEffect(() => {
    // console.log(authState); 
    getData("profilByArticle&articleId=" + id).then(r => {
      setVendeur(r.data);
    }).finally(() => {

    })
    getStatutDemande();
    nbreLikes()
  }, []);
  useEffect(()=>{
    articleInitialStatus(id,authState?.id).then(r=>{
      if(r)
      {
        setArticleLiked(true);
      }else
      {
        setArticleLiked(false);
      }
    });
    nbreLikes();
  });
  return (
    <ScrollView>
      <View className="flex-row shadow-2xl  border-slate-100 space-x-1 h-fit items-center mx-3 rounded-lg py-0 bg-slate-100">
        <Image className=" justify-center items-center -left-8"
          source={{ uri: BACKEND_URL + img }}
          style={{ width: 440, height: 390 }}
        />
      </View>
      <View className="px-4 flex flex-col gap-3 py-4">
        <View className="flex bg-white shadow rounded-lg h-fit px-4 py-4 ">
          <View className="flex flex-row items-center justify-between border-b border-gray-200 pb-3">
            <View>
              <Text className=" font-thin text-lg">{titre}</Text>
              <Text className=" left-0 font-bold text-lg">CDF {prix}</Text>
            </View>
            <View className="flex-row  justify-center  pl-5 ">
              <Text className=" text-xl">Occation</Text>
            </View>
          </View>

          <Text className=" mx-4 font-light text-sm text-[text-[#2B303A] ] pt-5">
            {
              description
            }
          </Text>
        </View>

        <View className="flex flex-col gap-4 justify-between w-auto bg-[#facc15] shadow  rounded-2xl  h-fit  px-0  py-3">
          <View className="flex-row flex gap-3 flex-1">
            <View className="">
              <AntDesign name="message1" size={20} color="#2B303A" />
            </View>
            <Text className=" font-light text-lg">Envoyer un message au vendeur</Text>
          </View>
          <View className="flex-row flex gap-3 flex-1 justify-around">

            <View className=" w-fit px-2  rounded-full h-19 border-2 border-neutral-100">
              <Text className=" text-center justify-center text-[#FBFBFF] top-1"> Cet article est disponible  ?</Text>
            </View>
            {
              statutDemande !== null &&
              <TouchableOpacity onPress={statutDemande == "N" ? demandeDisponibilite : annulerDemande}>
                {
                  isTraiting ?
                    <View><ActivityIndicator /></View> :
                    <View className=" w-32 -left-4  rounded-full h-9 bg-[#2B303A] ">
                      <Text className=" text-center justify-center text-[#F7F7FF] top-2">
                        {
                          statutDemande == "Y" ? "Annuler" : "Envoyer"
                        }
                      </Text>
                    </View>
                }
              </TouchableOpacity>
            }

          </View>
        </View>

        <View className="flex flex-row gap-5 pb-4 items-center justify-center bg-[#E6E7E5] rounded-lg">
          <TouchableOpacity onPress={() => {
            // setArticleLiked(setArticleLikeStatus(id,utilisateur));
            likeOrUnlike()
          }}>
            {
              articleLiked ?
                <View className=" flex flex-row gap-3  rounded-full  border-neutral-100">
                  <Text className=" font-light ">{nbreLike}</Text>
                  <AntDesign name='like1' size={15} />
                </View> :
                <View className=" flex flex-row gap-1  rounded-full  border-neutral-100">
                  <Text>{nbreLike}</Text>
                  <AntDesign name='like2' size={15} />
                </View>
            }
          </TouchableOpacity>
          <View className=" flex flex-row gap-1  rounded-full   border-neutral-100">
            <AntDesign name='message1' size={15} />
            <Text className=" font-light text-xs">Commenter</Text>
          </View>
        </View>

        <View className=" bg-white shadow  rounded-2xl  h-fit  py-3">
          <Text className="border-b border-gray-200  pb-3 text-left pl-4 pt-4 font-light text-lg text-[#2B303A]">Information sur le vendeur</Text>
          <View className=" flex-row w-full pt-9 px-2 h-fit">
            <View className=" ">
              <Image

                source={photoProfilFct(vendeur?.photo)}
                className="rounded-full -top-5"
                style={{ width: 70, height: 70 }}
              />

            </View>
            <View className=" flex-1 pl-5">
              <Text className=" -top-7 font-light text-lg">{vendeur?.nom?.toUpperCase()}</Text>
              <Text className=" -top-7 font-thin">{vendeur?.adresse} C/{vendeur?.commune}</Text>
              <Text className=" -top-7 font-thin">{vendeur?.telephone}</Text>
              <Text className=" -top-7 font-light text-lg">{vendeur?.bio}</Text>
            </View>

          </View>
          <View className="mt-3 space-x-2 flex-row border-t pt-3 pl-2 border-gray-200">
            <TouchableOpacity className=" w-8 h-8 justify-center items-center rounded-2xl bg-[#EF476F]">
              <MaterialCommunityIcons name="network-outline" size={20} color="#C5FFFD" />
            </TouchableOpacity>
            <Text className=" font-light text-lg top-0 ">Ajouter se profil a votre  reseau</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default DetailArticle

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#f4405b',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#f4405b',
  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    textAlign: 'center',
    color: '#f8fafc'
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#f8fafc',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    paddingLeft: 160,

  },
  listTitles: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    paddingRight: 90,

  },
  profileDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
    textAlign: "center"
  },
  formFooter: {
    marginTop: 'auto',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#373F51',
    textAlign: 'center',
  },
})