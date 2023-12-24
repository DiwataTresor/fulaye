import { ScrollView, StyleSheet, Text, View, Image, TextInput, form } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


const NotificationHome = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Text className=" pt-3 pl-4 font-thin  text-lg">Nouveaute</Text>

      <View className="flex-row  pt-4 left-4 w-96">
        <View className=" w-16 h-16  bg-yellow-600 rounded-full">

        </View>
        <View className="w-7 h-7 top-9 -left-4 bg-[#facc15] rounded-full">
          <Text className=" left-1 pt-1 ">
            <MaterialCommunityIcons name="check-network-outline" size={18} color="black" />
          </Text>
        </View>
        <View className="flex">
          <Text className="  text-slate-400 space-x-3  font-thin text-sm">
            <Text className="font-medium text-slate-600  text-lg">Merdie Mabiala </Text>
            vous ajoute aux reseau
          </Text>
          <Text className="  text-slate-400 space-x-3 -left-1  font-thin text-sm"> depuis la ville de kinshasa </Text>
          <Text className=" font-thin text-xs">il y a 34 minutes</Text>

        </View>
        <View className=" space-x-3 top-2 left-4">
          <AntDesign name="bars" size={24} color="black" />
        </View>
      </View>

    </ScrollView>

  )
}

export default NotificationHome

const styles = StyleSheet.create({

  inputControl: {
    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
    fontSize: 15,
    borderWidth: 0.5,
    fontWeight: '300',
    color: '#222',
    borderColor: "#B7D1DA",
  }
})