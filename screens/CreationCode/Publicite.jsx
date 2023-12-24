import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Publicite = () => {
  return (






    <View className=" top-6 items-center justify-center">
      <View className=" flex-row h-7 justify-center top-0">
        <View className=" bg-[#377a9b] w-24 h-20">

          <View className="w-10 h-10 bg-[#ffd700] rounded-full items-center top-2 left-4 justify-center">
            <Text className="text-[#FEFEFF] text-3xl text-[20px] ">2</Text>
          </View>

        </View>
        <View className="  bg-[#377a9b] w-60 h-20">
          <Text className="text-[19px] left-1 top-0 "></Text>
          <Text className="text-center text-[20px]  text-[#FEFEFF] ">Profil Ajouter aux Reseau </Text>
        </View>
        <View className=" bg-[#377a9b] w-20 h-20">
          <View className="items-center top-4">
            <MaterialCommunityIcons name="table-network" size={30} color="#FEFEFF" />
          </View>
          <Text></Text>
        </View>


      </View>

      <View className=" top-16">
        <Text className="text-[#377a9b] text-[26px]  text-center">Creer Votre Publicite</Text>
        <Text className=" text-xs text-[#377a9b]  top-0  text-center">Attirez une nouvelle Clientele avec des
          Annonce,Reduction de Prix,Solodes
        </Text>
      </View>


    </View>
  )
}

export default Publicite