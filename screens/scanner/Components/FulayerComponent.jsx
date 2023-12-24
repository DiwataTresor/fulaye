import { StyleSheet, Text, View,Image, Alert } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FulayerComponent = ({img,auteur,lien,prix,titre,dt,navigation}) => {

  return (
    <View className="p-0 w-48 mr-2 h-58   bg-gray-100 rounded-md">
      <Image className="w-full h-14  rounded-tl-md rounded-tr-md" source={img || require('../../assets/car.png')} />
      <View className="px-2 shadow-2xl shadow-slate-700 border-1 py-3">
        <View className="text-center text-lg pt-2 mb-3">
            <Text className="text-center  text-[#4444d0]">{titre}</Text>
        </View>
        <View className="text-lg flex flex-row">
           
            <View className="flex flex-row gap-3">
                <Entypo name="price-tag" size={16} color="#1C77C3" />
                <Text className=" text-[#717171]">{prix}</Text>
            </View>
        </View>
        <View className="flex flex-row gap-2 text-lg pt-2">
            <EvilIcons name="user" size={24} color="#377a9b" />
            <Text className="text-[#3f3f46]">{auteur}</Text>
        </View>
        <View className="flex flex-row gap-2 text-lg pt-2">
        <AntDesign name="calendar" size={20} color="#3f3f46" />
            <Text className="text-xs text-[#717171]">Publiés le {dt}</Text>
        </View>
        <View>
            <TouchableOpacity className="text-right pr-2 mt-4" onPress={()=>{
              // navigation.navigate("detailArticle")
             
            }}>
                <Text className="text-right text-[#377a9b]">Voir</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default FulayerComponent

const styles = StyleSheet.create({


})