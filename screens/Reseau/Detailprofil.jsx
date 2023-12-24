import { StyleSheet, Text, View, TextInput,Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Foundation } from '@expo/vector-icons';

const Detailprofil = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
        <Text className=" text-center justify-center top-4  text-xl"> Produit details</Text>
       
      <View className="flex-row shadow-2xl  border-slate-100 space-x-1 h-96 top-6 items-center mx-3 rounded-lg py-0 bg-slate-100">
      <Image className=" justify-center items-center -left-8"
          source={require('../assets/Machine.png')}
          style={{ width: 440, height: 390 }}
        />
      </View>

        <View className=" w-[388] space-x-40  top-3 left-3 justify-center items-center h-[100] flex-row">
          <View className=" flex-row space-x-24">
          <Text className=" text-xl font-medium -left-12 ">Canon Head Phone</Text>
          <Text className=" text-xl text-[#8490a0] -left-4 ">Prix</Text>
          </View> 
        </View>
        <View className=" flex-row flex-1 -top-4">
         <View className=" left-2 top-0"><Foundation name="star" size={14} color="#facc15" /></View>
         <Text className=" left-3 text-[#8490a0] ">4,8 198 review</Text>
         <Text className=" left-48 text-xl font-bold -top-2">$ 56,00</Text>
        </View>
        
        <View className=" flex-row space-x-4 justify-center items-center -top-6">
         <View className="w-40 h-16 justify-center shadow-2xl items-center rounded-lg bg-[#facc15] text-white">
          <Text className=" text-sm text-white">Ajouter au Reseau</Text>
          </View>
         <View className=" w-40 h-16 justify-center shadow-2xl items-center rounded-lg bg-[#f4405b]">
         <Text className=" text-sm text-white">Voire toutes </Text>
         </View>
        </View>
        
    
       <View className="flex-row  shadow-2xl  border-slate-100 space-x-1 h-14 -top-6 items-center mx-3 rounded-lg py-0 ">
        <Text className="text-xs text-[#8490a0]">
          Nous ne pouvons pas ouvrir Fulaye peut  vous   génère un Qr 
          code de votre activités avec vos coordonner  sécurise et léger  
          il génère la   carte de service</Text>
      </View>
    </View>
  )
}

export default Detailprofil

const styles = StyleSheet.create({})