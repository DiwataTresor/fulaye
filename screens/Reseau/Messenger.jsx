import { StyleSheet, Text, View, TextInput } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const Messenger = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#E7E4E4]">
    <View className="flex-row w-auto h-14 ">
        <View className=" w-14 h-14 bg-white rounded-full left-4 top-2"> 
          
        </View>
    </View>  
    
      <ScrollView>
        <View className=" w-[380] left-3 justify-center items-center h-[510]">
          <Text>Messenger</Text>
        </View>
      </ScrollView>
      <View className="flex-row  shadow-2xl  border-slate-100 space-x-1 h-14 -top-2 items-center mx-3 rounded-lg py-0  bg-[#f6f5f5]">
        <View className=" w-72   h-12">
          <TextInput className="p-2  text-[#94a3b8] h-10 rounded-2xl text-base  mb-1 w-[90%]  ml-4  shadow-lg" value='' placeholder='Message' />
        </View>
        <View className=" w-12 h-12 shadow-2xl border-slate-100 justify-center items-center left-4 rounded-full">
          <MaterialCommunityIcons name="send-circle" size={30} color="#007aff" />
        </View>
        
        <View></View>
      </View>
    </View>
  )
}

export default Messenger

const styles = StyleSheet.create({})