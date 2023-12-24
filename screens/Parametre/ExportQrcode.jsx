import { Button, StyleSheet, Text, View, flex } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../context/AuthContext';




const ExportQrcode = ({navigation}) => {
  const [id,setId]=useState(null);
  const { authState } = useAuth();

  useEffect(()=>{
    console.log(authState);
  })
  return (
    
    <View className=" flex-1 justify-center items-center  bg-[#201335]" >
      

      <View className=" rounded-2xl w-[86%] h-[85%] bg-white">

         
        <View className=" flex-row justify-center  space-x-2  mt-2 ">
        <MaterialCommunityIcons name="account-child-outline" size={20} color="#003F91" />
          <Text  className="text-[#231336]  font-light text-lg">Metier : </Text>
         
          
        </View>
         <View className=" flex-row items-center  mt-0 justify-center">
         <MaterialCommunityIcons name="home-map-marker" size={20} color="#003F91" />
          <Text className=" font-light text-lg text-[#231336]">Activite: </Text>
          <Text className=" font-light text-lg text-[#231336]"> Vente de produits</Text>
         </View>
        <View className=" w-84 mt-5 h-1 bg-[#E7E4E4]">

        </View>
        <View className=" justify-center flex-row  items-center -left-7 ">
          <Text style={styles.btna}>
          <Octicons name="alert" size={24} color="#003F91" />
          <Text  className="text-[#003F91] text-xl mt-1 font-semibold"> Faites-vous scanner  </Text>
         
          </Text>
        </View>

        <View className=" w-72 items-center justify-center flex ml-5 mt-3 h-48 "> 
          {
            authState?.authenticated==false?
            <View>
              <Text>Vous devez avoir un compte ou être connecté pour générer le QRCode</Text>
            </View>:
            <View>
              <QRCode size={140} value={`FLY-${authState?.id}`} />
              <View className="justify-center items-center mt-4">
                <Text>Telecharger</Text>
              </View>
            </View>
          }
          {/* <AntDesign name="qrcode" size={204} color="#facc15" /> */}
        </View>

      <View className="  space-x-2 flex-row mt-3 ml-7">
        
      <Text className=" font-semibold text-base -mt-1  text-[#003F91]">
       Et bénéficiez de points
      </Text>

    </View>
      <Text className=" pl-14   mx-4  top-2 text-[#003F91] font-light text-xs"> 
      Nous avons une offre spéciale pour vous ! Scannez simplement le QR code ci-dessous 
      après avoir visionné notre publicité ,Convertissez vos points en espèces . Profitez de cette opportunité pour découvrir nos produits 
      de qualité et bénéficier d'avantages supplémentaires 
      </Text>
      
      </View>

    
 
      

    </View>





  )
}

export default ExportQrcode

const styles = StyleSheet.create({

  btn: {
    height: 40,
    width: 150,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    marginTop:30,
    marginLeft:1,
    borderColor: '#FABD14',
    textAlign: 'center',
    color:'#FABD14',

  },
  btn1: {
    height: 40,
    width: 150,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderWidth: 1,
    marginTop:30,
    left:4,
    backgroundColor:'#FABD14',
    borderColor: '#facc15',
    textAlign: 'center',
    color:'#003F91',

  },
  btna: {
    height: 40,
    width: 300,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderWidth: 1,
    left:27,
    marginTop:30,
    backgroundColor:'#FABD14',
    borderColor: '#facc15',
    textAlign: 'center',

  }
})