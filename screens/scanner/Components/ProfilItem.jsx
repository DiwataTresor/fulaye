import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, ToastAndroid, ActivityIndicator } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { API_URL, photoProfilFct } from '../../../global/helper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const ProfilItem = ({ img, photo, auteur, lien, categorie, dt, id, feedBack, isInNetwork }) => {
  const { authState } = useAuth();
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingInNetwork,setAddingInNetwork]=useState(false);
  const [addedInNetwork,setAddedInNetwork]=useState(isInNetwork);
  const profil = JSON.parse(authState.token);
  const like = () => {
    if (!profil?.id || profil.id === null) {
      Alert.alert("Ajout au reseau", "Impossible d'ajouter au reseau, car vous n'êtes pas connecté à un compte", [
        {
          text: "Je me connecte",
          onPress: () => {
            feedBack("login")
          }
        },
        {
          text: "Annuler"
        }
      ])
    } else {
      setAddingInNetwork(true);
      setIsLoading(true);
      let f = new FormData();
      f.append("qry", "ajoutReseau");
      f.append("data", JSON.stringify({ id: id }));
      f.append("utilisateur", profil?.id);
      fetch(API_URL, { method: "POST", body: f }).then(r => r.json())
        .then(r => {
          console.log(r)
          if (r.success) {
            setLiked(true);
            setAddedInNetwork(true);
            ToastAndroid.show("Bien ajouté au reseau",ToastAndroid.SHORT);
          } else {
            Alert.alert("Ajout au reseau", "Une erreur s'est produite, veuillez reessayer plutard");
          }
        }).catch(r => {
          Alert.alert("Ajout au reseau", "Pas de connexion au vers le serveur");
        }).finally(() => {
          setAddingInNetwork(false)
          setIsLoading(false)
        })
    }
    // setLiked(true);
  }
  const unLike = () => {

    setIsLoading(true);
    let f = new FormData();
    f.append("qry", "retirerReseau");
    f.append("data", JSON.stringify({ id: id }));
    f.append("utilisateur", profil?.id);
    fetch(API_URL, { method: "POST", body: f }).then(r => r.json())
      .then(r => {
        if (r.success) {
          ToastAndroid.show("Bien retiré de votre reseau",ToastAndroid.SHORT);
          setLiked(false);
          setAddedInNetwork(false);
        } else {
          Alert.alert("Retirer au reseau", "Une erreur s'est produite, veuillez reessayer plutard");
        }
      }).catch(r => {
        Alert.alert("Ajout au reseau", "Pas de connexion au vers le serveur");
      }).finally(() => setIsLoading(false))
  }
  useEffect(() => {
    // console.log("existe ?",isInNetwork);
  }, []);
  return (
    // <ProfilItem 
    //   navigation={navigation}
    //   auteur={item.auteur} 
    //   categorie={item.categorie} 
    //   lien={item.prix} 
    //   dt={item.dt} 
    //   img={item.img === "" ? false : item.img} />
    <View className="p-0 w-56  mr-2 h-58  rounded-md shadow-2xl shadow-slate-100 border-1 bg-gray-200">
      <Image className="bg-gray-50 w-56 h-40 rounded-tl-md rounded-tr-md " resizeMode='center' source={photoProfilFct(photo)} />

      <View className="px-0 py-3 ">
        <View className="flex flex-row gap-3 text-right justify-end">
        </View>
        <View >
          <View className="flex flex-row gap-2 text-lg pt-4">
         
            <Text className=" text-lg font-medium justify-center left-3 text-[#999966] -top-3">
            <Entypo name="graduation-cap" size={20} color="#999966" />
              {auteur || null}</Text>
          </View>

          <View className=" mt-3 ">
          <Text className=" -top-7 left-3 text-[#999966] font-light  text-sm" >Commercente</Text>
          </View>

          <View className="flex flex-row mb-1 -top-7 left-3 gap-2 text-lg pt-1">
          <MaterialIcons name="verified" size={24} color="#72B01D" />
          <Text className=" font-light text-[#999966] text-lg">{categorie || null}</Text> 
          </View>

          <View className="flex flex-row gap-2 text-lg pt-1">

            <Text className="font-light  text-xs -top-5  left-3 text-[#999966]">Dépuis le {dt}</Text>
          </View>
              

          <View className="flex flex-row gap-1 items-center justify-around w-full px-2 mt-1">
            
            <TouchableOpacity onPress={() => {
                  !addedInNetwork ? like() : unLike();
                }} 
            >
              {
                !addedInNetwork?
                  <View className="bg-[#facc15] px-1 py-1 rounded-full">
                    {
                      addingInNetwork?
                        <ActivityIndicator color={"black"} />:
                        <MaterialCommunityIcons name="network-outline" size={24} color="#2B303A" />
                    }
                  </View>:
                  <View className="w-fit px-1 py-1 rounded-full bg-[#EF476F] text-white">
                      <MaterialCommunityIcons name="check-network-outline" size={24} color="#F7F7FF" />
                  </View>
              }
            </TouchableOpacity >
           <View>
            <TouchableOpacity onPress={() => feedBack("apercu", auteur, id)}>
            <View className=" flex-row h-7  space-x-1 w-28 left-0 pl-3 pr-1 pt-1 bg-[#facc15] rounded-2xl">
            <Text className=" justify-center text-[#2B303A] top-0 items-center text-xs  font-thin">En savoir plus</Text>
            <AntDesign name="eyeo" size={20} color="#2B303A" className=" " />
            </View>
            </TouchableOpacity>
          </View>

          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfilItem

const styles = StyleSheet.create({

  listTitle: {
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 22,
    color: '#2B303A',
    paddingLeft: 2,
    top: 2,

  },
  listcategorie: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: '#2B303A',
    paddingLeft: 10,
    paddingTop: 6

  },
  fond: {
    paddingTop: 30

  },
  PourvousTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    right: 3,
    top: 3

  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',
    textAlign: 'center',
    color: '#2B303A'
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 1,
    backgroundColor: '#facc15',
    borderColor: '#facc15',
    textAlign: 'center',
    color: '#2B303A',
    paddingLeft: 2
  },
  btn3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#fc2222',
    textAlign: 'center',
    color: '#fc2222',
    marginTop: 0,
    width: 120
  },
  viewIndicator: {
    width: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
    borderColor: '#fc2222',
  },
  icon: {
    paddingLeft: 20
  }

})