import { StyleSheet, Text, View,Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const statustique = () => {
  return (
    <ScrollView>
    <View className=" flex justify-center items-center">
        <View className="overflow-hidden w-96 h-40 mx-4  top-5 rounded-xl  justify-center items-center">
          <Image
            source={require('../assets/Social.png')}
            style={{ width: 380, height: 155 }}
            className=" rounded-xl"
          />
        </View>
      
      <View className=" flex-row mt-10  space-x-20">
        <View>
            <Text className=" font-light text-2xl text-[#201335] ">Rémunération</Text>
            <Text className="">Valeur du point,</Text>
        </View>
        <View className=" w-28 h-10 bg-[#00CC66]  rounded-md">
              <Text className=" text-center text-white  mt-2 text-lg">340</Text>
        </View>

      </View>

      <View className=" m-7 flex-row">
        <View className="flex-row space-x-3 justify-center items-center">
            <Text className="font-light text-xs">articles</Text>
            <View className=" justify-center w-14 h-7 bg-[#00CC66] rounded-3xl">
                <Text className=" text-center text-white">32</Text>
            </View>
        </View>

        <View className="flex-row space-x-4 justify-center items-center">
            <Text className="font-light text-xs"> au reseau</Text>
            <View className=" justify-center w-14 h-7 bg-[#00CC66] rounded-3xl">
                <Text className=" text-center text-white">42</Text>
            </View>
        </View>

        <View className="flex-row space-x-2 left-2 justify-center items-center">
            <Text className=" font-light text-xs">Nombre scan</Text>
            <View className=" justify-center w-14 h-7 bg-[#00CC66] rounded-3xl">
                <Text className=" text-center text-white">62</Text>
            </View>
        </View>

      </View>

      <View className=" w-96  h-36 bg-[#00CC66] shadow-md  rounded-lg ">
            <View className="justify-center  space-x-20  items-center mt-6 flex-row">
                <Text className=" font-light text-lg  text-white ">Nombre des vus article </Text>
                <View>
                <AntDesign name="checkcircleo" size={24} color="#F7F7FF" />
                </View>
                
            </View>
            <Text className=" justify-center items-center  m-o left-5  text-white ">
            Cet article a suscité l'intérêt de nombreux lecteurs
            </Text>
            <View className=" w-80 h-1 m-3  left-3  bg-white"></View>
            <View className=" flex-row">
              <Text className=" mx-4 text-white">Ajourdhuit 10h30 PM- 12H20  </Text>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
            </View>
      </View>


      <View className=" w-96 mt-2  h-36 bg-[#facc15] shadow-md  rounded-lg ">
            <View className="justify-center  space-x-20  items-center mt-6 flex-row">
                <Text className=" font-light text-lg  text-slate-700">Les articles les plus suivis</Text>
                <View>
                <AntDesign name="checkcircleo" size={24} color="#201335" />
                </View>
                
            </View>
            <Text className=" justify-center items-center left-5  text-slate-700 ">
            l'article consulté par un grand nombre de lecteurs
            </Text>
            <View className=" w-80 h-1 m-3  left-3 bg-[#201335]"></View>
            <View className=" flex-row">
              <Text className=" mx-4 text-slate-700">Ajourdhuit 10h30 PM- 12H20  </Text>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
            </View>
      </View>

      <View className=" w-96 mt-2  h-36 bg-[#facc15] shadow-md  rounded-lg ">
            <View className="justify-center  space-x-20  items-center mt-6 flex-row">
                <Text className=" font-light text-lg  text-slate-700">Nombre d"appartenance au reseau </Text>
                <View>
                <MaterialCommunityIcons name="console-network" size={24} color="#201335" />
                </View>
                
            </View>
            <Text className=" justify-center items-center left-5  text-slate-700 ">
             Liste des utilisateurs qui vous ont ajouté à leur réseau"
            </Text>
            <View className=" w-80 h-1 m-3  left-3 bg-[#201335]"></View>
            <View className=" flex-row">
              <Text className=" mx-4 text-slate-700">Ajourdhuit 10h30 PM- 12H20  </Text>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
            </View>
      </View>
      

      <View className=" w-96  h-36 bg-[#00CC66] mt-2 shadow-md  rounded-lg ">
            <View className="justify-center  space-x-20  items-center mt-6 flex-row">
                <Text className=" font-light text-lg  text-white ">Nombre des vus profil </Text>
                <View>
                <MaterialCommunityIcons name="face-man-profile" size={24} color="#201335" />
                </View>
                
            </View>
            <Text className=" justify-center items-center  m-o left-5  text-white ">
            Cet article a suscité l'intérêt de nombreux lecteurs
            </Text>
            <View className=" w-80 h-1 m-3  left-3  bg-white"></View>
            <View className=" flex-row">
              <Text className=" mx-4 text-white">Ajourdhuit 10h30 PM- 12H20  </Text>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
              <View className=" w-10 h-10  bg-slate-100 rounded-full"></View>
            </View>
      </View>
      
    </View>
    </ScrollView>
  )
}

export default statustique

const styles = StyleSheet.create({})