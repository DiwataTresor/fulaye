import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { getData } from '../../utils/helper';
import { BACKEND_URL } from '../../global/helper';
import Loading from '../../components/Loading';
import Loader from '../../components/Loader';

const liste=[
  {id:1}
];
export const Detail = ({detail,navigation}) => {
 

 console.log(BACKEND_URL+detail?.photo);
  return (
    <TouchableOpacity className="w-fit h-fit" onPress={()=>{
      navigation.navigate("fulayePro",{id:detail.id,nom:detail.nom,categorie:null})
    }}>
        <View className={`w-44 ${detail?.photo===null ?"h-fit":"h-[248px]"} mb-2 pb-5 rounded-md  bg-gray-300 mr-2 overflow-hidden`}>
          <View className=" h-fit rounded-md pt-3">
            {
              detail?.photo==null?
              <Image
                source={require('../assets/Nkenda.png')}
                className="w-full h-20 rounded-md"
              />:
              <Image
              resizeMode='center'
                source={{uri:BACKEND_URL+"imagesProfil/"+detail?.photo}}
                className="w-full h-32  rounded-md"
              />

            }
          </View>
          <View className="h-[110px]">
            <View className=" flex-row ml-2 mt-2 overflow-hidden">
              <MaterialIcons name="verified" size={24} color="#72B01D" />
              <Text className=" ml-2 text-lg space-x-0 text-[#201335]"> 
                {detail?.nom || "test"}
              </Text>
            </View> 

            <Text className=" font-light text-lg ml-4 mt-1">{detail?.libelle}</Text>
            <Text className=" font-light ml-4  text-xs flex-wrap">{detail?.adresse?.trim()} C/{detail.commune?.trim()}</Text>
            <Text className=" font-light ml-4  text-xs">{detail?.ville}</Text>
          </View>
        </View>
    </TouchableOpacity>
  )
}

const UtilisateurParCategorie = ({navigation,route}) => {
  const [dataIsLoaded,setDataIsLoaded]=useState(false);
  const [datas,setDatas]=useState([]);
  const {categorie,libelle}=route.params;


   useEffect(()=>{
    getData("getUtilisateursParCategorie&categorie="+categorie).then(r=>{
      setDatas(r.data);
    }).finally(()=>{
      setDataIsLoaded(true);
    })
   })

  return (
    <SafeAreaView>
      <ScrollView className="h-fit">
        <View>
          <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
            <View>
              <View style={styles.container} >

                <View className=" w-96 h-40  -left-3  rounded-xl  justify-center items-center">
                  <Image
                    source={require('../assets/Social.png')}
                    style={{ width: 380, height: 155 }}
                    className=" rounded-xl"
                  />
                </View>

                <View className=" w-96 h-1  top-3  border-y-gray-200 "></View>
                <Text className="text-sm font-thin pt-7"> 

                </Text>

                <View className=" flex-row h-14 top-1 gap-2">
                  <MaterialIcons name="home-repair-service" size={24} color="#201335" />
                  <Text className="flex font-light text-lg text-[#201335] items-center justify-center" >
                      <Text>{datas?.length || 0} profils </Text>
                      <Text className="ml-2 pl-3 font-bold">{libelle} </Text>
                      <Text className="text-center justify-center items-center w-full">Trouvé(s)</Text>
                  </Text>
                </View>

                {
                  dataIsLoaded==false?
                    <Loader />:
                    <View className=" flex flex-row gap-3 flex-wrap mt-3">
                      {
                        datas.map((d,i)=>{
                          return(
                              <Detail key={i} detail={d} navigation={navigation}  />
                          )
                        })
                      }
                    </View>
                }
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
   </SafeAreaView> 
  )
}

export default UtilisateurParCategorie

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