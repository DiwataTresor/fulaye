import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const Prestataire = () => {
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
        <ScrollView>
          <View style={styles.container} >
            
        <View className=" w-96 h-40  -left-3  top-5 rounded-xl bg-[#6666cc] justify-center items-center">
          <Image
            source={require('../assets/Esthetique.png')}
            style={{ width: 350, height: 145 }}
          />
        </View>
        <View className="w-96  h-16 top-5  mx-4">
          <Text className=" text-xs pt-2 font-thin">COSMETIQUE ET MAQUILLAGE</Text>
          <Text className=" text-lg pt-0 font-medium">Estheticien / Estheticienne</Text>
          <Text className="w-20  h-10 text-xs font-thin  bg-[#EAC435] text-center  pt-3 rounded-lg mx-60 -top-10">DECOUVRIR</Text>
        </View>

            

            <View className=" justify-center border-2 border-y-gray-100  top-2 flex-row items-center space-x-3">


            </View>
            <View className=" w-96 h-1  top-3  border-y-gray-200 "></View>
            <Text className="text-sm font-thin pt-7">
            Envie de devenir une professionnel  de l'esthétique, du maquillage, 
            des soins du visage, du corps, ou encore des ongles ? 
            Découvrez notre formation à distance au CAP Esthétique Cosmétique et Parfumerie
            </Text>

            <View className=" flex-row h-14 top-1">
            <MaterialIcons name="home-repair-service" size={38} color="#201335" />
            <Text className=" top-2 font-bold text-lg text-[#201335]" >Des Centre qui peut vous interesse</Text>
            
            </View>

            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View className=" flex-row   space-x-2 justify-center items-center">
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/plomberiee.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                  l'installation de tuyaux, de robinets, 
                  de lavabos, de toilettes, de douches, 
                  de baignoires, de chauffe-eau
                  </Text>
                  
                </View>
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/plomberieb.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                  Débouchage des canalisations : 
                   les canalisations obstruées,
                    que ce soit dans les éviers,
                  </Text>
                </View>
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/jordan.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-base font-thin top-1  left-3 text-[#2B303A]">Sandales Homme</Text>
                  <Text className="text-base font-thin  left-3 text-[#2B303A]">30.000FC</Text>
                </View>







              </View>
            </ScrollView>
            <View className=" w-96 h-1  top-1  bg-gray-100 "></View>

            <View className=" flex-row h-14  top-1">
            
            <Text className=" top-2 font-bold text-lg text-[#201335]" >l'article Cosmetique en Vente / Salon </Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View className=" flex-row   space-x-2 justify-center items-center">
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/plomberiee.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                  l'installation de tuyaux, de robinets, 
                  de lavabos, de toilettes, de douches, 
                  de baignoires, de chauffe-eau
                  </Text>
                  
                </View>
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/plomberieb.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-[10] font-thin top-1 w-40  left-1 text-[#2B303A]">
                  Débouchage des canalisations : 
                   les canalisations obstruées,
                    que ce soit dans les éviers,
                  </Text>
                </View>
                <View className=" w-46 h-52 rounded-md  bg-gray-200">
                  <View className=" w-46 h-39 bg-white rounded-md ">
                    <Image
                      source={require('../assets/jordan.png')}
                      style={{ width: 164, height: 109 }}
                      className=" rounded-md"
                    />
                  </View>
                  <Text className=" text-base font-thin top-1  left-3 text-[#2B303A]">Sandales Homme</Text>
                  <Text className="text-base font-thin  left-3 text-[#2B303A]">30.000FC</Text>
                </View>







              </View>
            </ScrollView>
            <View className="w-96 h-14 top-2 flex-row font-bold  bg-[#ecd781] rounded-md justify-center items-center -left-3">
            <Entypo name="price-tag" size={24} color="#201335" />
             <Text className=" text-[#201335] font-medium">Voir toute Nous tarification de nos services</Text>
            </View>

            <View className="w-96 h-14 top-4  space-x-2 flex-row font-bold  bg-[#003F91] rounded-md justify-center items-center -left-3">
            <FontAwesome name="facebook-square" size={24} color="#FFFFFF" />
             <Text className=" text-[#FFFFFF] font-medium">Rejoindre notre page facebook</Text>
            </View>
            <Text className="text-sm font-thin pt-7">
              Notre outil de paraphrase  outil de paraphrase aide à reformuler le texte en remplaçant
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Prestataire

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