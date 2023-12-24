import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Confiden = () => {
  return (
    
        <SafeAreaView style={{ flex: 1 ,backgroundColor:'#E7E4E4' }}>
            <View className=" justify-center items-center p-2  m-4">
                <Text className="text-lg -left-16 font-medium text-[#1C77C3]">Collecte des informations  </Text>
                    <Text className="text-sm p-3 text-[#39A9DB]">
                    « Application » : l’application Fulaye - Solution digital  à portée de main sur  Android.
                    <Text>
                     l’internaute visitant et utilisant les services de l'application ....
                    </Text>
                        Etablisement CONGO BOX, personne morale responsable de l’édition et du contenu de l'application.
                    </Text>
            </View>

            <View className=" justify-center items-center p-2 m-4">
                <Text className="text-lg font-medium text-[#1C77C3]"> Politique de confidentialité Article 1 - Accès à l'application </Text>
                    <Text className="text-sm p-3 text-[#39A9DB]">
                    Vous vous engagez à ne pas utiliser cette application et les informations ou données qui y figurent à des fins commerciales, politiques, publicitaires et pour toute forme de sollicitation commerciale 
                    et notamment l’envoi de courriers électroniques non sollicités
                    </Text>
            </View>

            <View className=" justify-center items-center p-2 m-4">
                <Text className="text-lg font-medium text-[#1C77C3]"> la politique de confidentialité dans votre application </Text>
                    <Text className="text-sm p-3 text-[#39A9DB]">
                    Identifiez les types de données personnelles collectées par votre application, telles que les informations d'identification, les données de localisation, les préférences utilisateur, etc.
                    Notez comment ces données sont collectées, stockées, utilisées et partagées
                    </Text>
            </View>

            <View className=" justify-center items-center p-2">
                <Text className="text-lg font-medium text-[#1C77C3]">Rédaction de la politique de confidentialité </Text>
                    <Text className="text-sm p-3 text-[#39A9DB]">
                    2. l applications utilisent un outil d'authentification unique. 
                    Une fois inscrit, vous pouvez utiliser l’applications.
                     Vos données personnelles ne sont pas transmises à une autre  applications 
                    </Text>
            </View>

            <View className=" justify-center items-center p-2">
                <Text className="text-lg font-medium text-[#1C77C3]">Rédaction de la politique de confidentialité </Text>
                    <Text className="text-sm p-3">
                    Identifiez les types de données personnelles collectées par l'application, telles que les informations d'identification, les préférences utilisateur, etc.
                    Notez comment ces données sont collectées, stockées, utilisées et partagées
                    </Text>
            </View>

          
        </SafeAreaView>
      
  )
}

export default Confiden

const styles = StyleSheet.create({})