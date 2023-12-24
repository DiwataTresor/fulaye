import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const CreationUrl = () => {
  const [formulaire,setFormulaire]=useState({
    titre:"",
    facebook:"",
    whatsapp:"",
    tiktok:"",
    instagram:""
  });
  return (
        <View className=" items-center justify-center flex flex-col gap-4">
            <Text>Réseaux Sociaux les Plus Populaires</Text>
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, titre: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.titre} placeholder='Titre du Url ' />
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, facebook: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.facebook} placeholder='Entre votre lieu Facebook ' />
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, whatsapp: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.whatsapp} placeholder='Entre votre Numero WhatsApp ' />
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, tiktok: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.tiktok} placeholder='Entre votre lieu TikTok ' />
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, instagram: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.instagram} placeholder='Entre votre lieu Instagram ' />

            <View className="flex flex-row bg-[#f4405b] justify-center items-center rounded-md w-[90%] py-2">
                <TouchableOpacity className="flex flex-row justify-center items-center px-3 w-[100%]" onPress={() => save()}>
                    <Text className="text-white text-[14px] py-2 rounded-md px-2 mr-2">Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default CreationUrl

const styles = StyleSheet.create({})