import { View, Text,ScrollView,TextInput} from 'react-native'
import React from 'react'

const Perso = () => {
    
  return (
    <ScrollView className="bg-[#ffd700] flex-1 relative">
        <View className="mt-4 justify-center items-center">
        <Text className="text-3xl mb-5">Informations d'entrée</Text>
        <View className="space-x-2 items-center">
        
        <Text className="mt-1"> Immatriculation : </Text>
        
        </View>
      
        </View>
        
    </ScrollView>
  )
}

export default Perso