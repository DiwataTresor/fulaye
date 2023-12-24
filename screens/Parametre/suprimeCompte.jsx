import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

const suprimeCompte = () => {
    return (
        <View className=" flex-1 justify-center items-center bg-white">
            <Text></Text>
            <Text className=" font-light  text-[#999966] text-2xl">Suprimet Compte</Text>
            <Text className=" font-light text-[#999966] text-xs m-3">
                Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible
                et toutes les données associées seront définitivement supprimées.
            </Text>
            <Text className=" font-light text-[#999966] text-lg m-2">
                Veuillez confirmer votre choix en cliquant sur le bouton "Supprimer".
            </Text>

            <TouchableOpacity className="  w-80  space-x-3 h-14 bg-[#facc15] rounded-lg">
                <Text className="text-[#201335] font-light text-lg  text-center mt-3">
                    <MaterialCommunityIcons name="delete-circle" size={24} color="#201335" />
                    Supprimer
                </Text>
            </TouchableOpacity>

            <Text className=" font-light text-[#999966] text-xs m-3">
                Si vous avez des doutes ou souhaitez annuler cette action, veuillez cliquer sur le bouton
            </Text>

            <TouchableOpacity className=" w-80 m-3  h-14 bg-[#facc15]  rounded-lg">

                <Text className=" font-light text-lg text-[#201335]  text-center mt-3">
                    <MaterialIcons name="cancel" size={24} color="#201335" />
                    Annuler</Text>
            </TouchableOpacity>

        </View>
    )
}

export default suprimeCompte

const styles = StyleSheet.create({})