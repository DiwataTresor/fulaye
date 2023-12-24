import { Button, StyleSheet, Text, View, flex } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';




const ParametreNotification = ({navigation}) => {
  return (

    <View className=" flex-1">
      <Text className=" text-left top-3  left-2  text-2xl">QR Code </Text>
      <View className=" left-8 top-5 rounded-lg w-[80%] h-[40%] bg-white">
        <View className=" justify-center items-center top-5">
          <AntDesign name="qrcode" size={210} color="black" />
        </View>
      </View>
      <View className=" flex-row top-14">
        <View className=" w-[50%] flex-row h-10  left-3">
          <AntDesign name="export" size={24} color="black" />
          <Text className="text-center text-lg -top-1 left-2 ">Export QR Code</Text>
        </View>

        <View className=" flex-row top-14  right-48">
          <View className="w-32  h-16 flex-row ">
            <FontAwesome name="file-pdf-o" size={24} color="black" />
            <Text className="text-center text-lg -top-1 left-2 ">Export PDF</Text>
          </View>
          <View className="w-32 h-15 left-6 flex-row ">
            <Feather name="image" size={24} color="black" />
            <Text className="text-center text-lg -top-1 left-2 ">Export Image</Text>
          </View>

          <View className=" flex-row justify-center shadow-2xl items-center top-9">
             <View className=" w-24 rounded-xl h-10 bg-[#f4405b] m-4 -left-56">
             <View className=" left-1 top-1"><Ionicons name="ios-git-network-outline" size={24} color="white" /></View>
              <Text className=" text-center left-2 -top-4 text-white"> Partager</Text>
             </View>
             <View className=" w-52 rounded-xl shadow-2xl flex-row  h-10 bg-[#f4405b] -left-56">
              <View className=" left-3 top-1"><MaterialCommunityIcons name="access-point-network" size={24} color="white" /></View>
             <Text className="text-center left-5 top-2 text-white">Anonce au Reseau</Text>
             
             </View>
             
          </View>

          <View className=" flex-row items-center justify-between px-8">
              <Text>DDDDDD</Text>
          </View>

        </View>


      </View>

    </View>





  )
}

export default ParametreNotification

const styles = StyleSheet.create({

  container: {

    flexDirection: 'row',
    height: 60,
    padding: 10,
    borderBlockColor: ''

  }
})