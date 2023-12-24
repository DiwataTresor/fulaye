import { View, Text, TouchableOpacity, Typographie,Button,onPressLearnMore,Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons' ; 
import { FontAwesome } from '@expo/vector-icons' ; 
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Home = () => {
  return (
    <View className="bg-[#f0f0f1] flex-1 relative ">

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
         <View className=" bg-[#00A6ED] w-20 h-20">
          <View className="items-center top-4">
          <AntDesign name="search1" size={24} color="#FEFEFF" /> 
          </View>
          <Text></Text>
         </View>

         
       </View>

       {/**/}
       <View className=" flex-row h-7 justify-center top-20">
            <View className="bg-[#FEFEFF]  w-24 h-14 ">
            <Image
              source={require('../assets/Nino.png')}
              style={{ width: 70, height: 55 }}
            />
            </View>
         <View className=" bg-gray-50 w-56 h-14 ">
          <Text className="font-bold text-lg text-gray-600  text-center top-1 -left-7 ">BOUTIQUE NINO </Text>
          <Text className="text-[16px]  text-center  text-[#377a9b] right-3 -left-2 "> 25 bauvan c/kinshasa Homme </Text>
          
         </View>
         <View className=" bg-[#377a9b] w-20 h-14"> 
          <View className="items-center top-3">
           
          <MaterialCommunityIcons name="qrcode-remove" size={40} color="#FEFEFF" />
            
            </View>
         </View>
       </View>   
       {/**/}
       <View className=" flex-row h-7 justify-center top-20">
            <View className="bg-[#FEFEFF] top-8  w-24 h-14 ">
            <Image
              source={require('../assets/tdl.png')}
              style={{ width: 70, height: 55 }}
            />
            </View>
         <View className=" bg-gray-50 w-56 h-14 top-8 ">
          <Text className="font-bold text-lg text-gray-600  text-center top-1 -left-7 ">BOUTIQUE GALAXY </Text>
          <Text className="text-[16px]  text-center  text-[#377a9b] right-3 -left-2 "> 25 bauvan c/kinshasa Homme  </Text>
          
         </View>
         <View className="  bg-[#377a9b] top-8 w-20 h-14">
          <View className="items-center top-2">
          <MaterialCommunityIcons name="qrcode-remove" size={40} color="#FEFEFF" />
            </View>
         </View>
       </View> 
    </View>
  )
}

export default Home
