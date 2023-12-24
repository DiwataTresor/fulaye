import { StyleSheet, Text, View,Alert, TextInput,TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useTransition } from 'react'
import { useStateContext } from '../../context/Global';



const CreationVideo = () => {
    const {endPoint} =useStateContext();
    const [isExecute,setIsExecution]=useState(false);
    const [formulaire,setFormulaire]=useState({
        titre:"",
        lien:""
    });
    const save=()=>{
        Alert.alert("Ajout lien video","Voulez-vous vraiment ajouter ce lien",[
            {
                text:"Ajouter",
                onPress:()=>{
                        setIsExecution(true);
                        fetch(endPoint+"insertionlienvideo",{method:"POST",body:JSON.stringify({"lien":formulaire.lien,"titre":formulaire.titre})}).then(r=>r.json())
                        .then(r=>{
                            Alert.alert("Votre lien est bien créé");
                            console.log(r)
                        }).catch(r=>{
                            Alert.alert("errer");
                            console.log(r);
                        }).finally(()=>{
                            setIsExecution(false)
                        })
                    
                }
            },
            {
                text:"Annuler",
                onPress:()=>{
                    Alert.alert("okn")
                }
            }

        ]);
    }
    return (
        <View className=" items-center justify-center flex flex-col gap-4">
            <Text>CreationVideo</Text>
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, titre: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.titre} placeholder='Titre du vido *' />
            <TextInput onChangeText={(e) => setFormulaire({ ...formulaire, lien: e })} className="p-3  w-[90%] bg-white text-gray-700 rounded-md text-lg  shadow-lg" value={formulaire.lien} placeholder='Entre votre lieu Youtube  du video *' />

            {!isExecute ?
            <View className="flex flex-row bg-[#f4405b] justify-center items-center rounded-md w-[90%] py-2">
                <TouchableOpacity className="flex flex-row justify-center items-center px-3 w-[100%]" onPress={() => save()}>
                    <Text className="text-white text-[14px] py-2 rounded-md px-2 mr-2">Enregistrer</Text>
                </TouchableOpacity>
            </View>:
            <View className="text-center items-center">
                <ActivityIndicator />
            </View>
            }
        </View>
    )
}

export default CreationVideo

const styles = StyleSheet.create({})