import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import CreationQrBusiness from "./CreationHome"
// import CreationHome from './CreationHome';


const CreerQR = ({navigation}) => {

  return (
    <View className="flex-1 bg-slate-100">
      <View className=" w-32 h-32 ml-6 left-28  top-6 items-center ">
        <Image
          source={require('../assets/logofulaye.png')}
          style={{ width: 140, height: 140 }}
        />
      </View>

      <Text className="left-2  text-xl text-[#4C0517] top-9">

      </Text>
      <View className="form space-y-2 flex-1 top-16">
        <Text className="text-[#377a9b] text-sm text-center">Veuillez renseigner les informations ci-dessous</Text>
        <View className="form space-y-2" >
          <Text className="text-gray-700 text-lg ml-4">Numéro de téléphone </Text>
          <TextInput className="p-4 bg-white text-gray-700 rounded-2xl text-lg  mb-2  ml-4 -left-2 shadow-lg" value='' placeholder='xxx-xxx-xxx *' />
          <Text className="text-gray-700 text-lg ml-4">Numéro d'activation </Text>
          <TextInput className=" p-4 bg-white text-gray-700 rounded-2xl  mb-2  ml-4 -left-2 shadow-lg" placeholder='Entrez le Numéro *' />
          <View className="space-y-4 mt-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('CreationHome',{id:1})} className="rounded-full py-3 bg-[#f4405b]  mx-7">
              <Text className=" text-lg text-center text-[#e5e8e9]">VALIDER LA ACTIVATION </Text>
            </TouchableOpacity>
            <View className=" flex-row items-center justify-between px-8">

              <Text className="text-[#4C0517] text-sm text-justify ">
              Une fois votre compte activé, vous pourrez profiter de toutes les fonctionnalités
               offertes par notre service. Si vous avez des questions ou rencontrez des problèmes lors 
               de l'activation, n'hésitez pas à nous contacter.
              </Text>
            </View>

          </View>
        </View>

      </View>

    </View>
  )
}
const CreationQrHome=()=>{
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator>
        <Stack.Screen name="CreerQr" options={{title:"Création QR"}} component={CreerQR} />
        <Stack.Screen name="creationQrBusiness" options={{title:"Génerer votre QR Business", presentation:'modal'}} component={CreationQrBusiness} />
        <Stack.Screen name="CreationHome" options={{title:"Génerer votre QR Business"}} component={CreationHome} />
    </Stack.Navigator>
  )
}

export default CreationQrHome

const styles = StyleSheet.create({

  container: {
    flex: 1,


  },

  titre: {
    maxWidth: 80,
    height: 80,
    backgroundColor: '#377a9b'


  },

  Qr: {

    fontSize: 18,
    color: '#377a9b',
    left: 4,
    marginTop: 4,




  }






})