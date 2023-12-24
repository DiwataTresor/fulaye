import { View, Text, TouchableOpacity, Image, Button, ScrollView, Switch } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReseauHome from "./ReseauHome";
import DetailReseau from "./DetailReseau";
import Messenger from "./Messenger";
import Detailprofil from "./Detailprofil";
import Prestataire from "./Prestataire";
import Formulaire from "./Formulaire";
import Profil from "./../CreerQR/Fulayepro"






const Tab2 = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#FFFFFF' } }}
        >
            <Stack.Screen name="Réseau" component={ReseauHome} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Messenger" component={Messenger}/>
            <Stack.Screen name="Detailprofil" component={Detailprofil}/>
            <Stack.Screen name="Prestataire" component={Prestataire}/>
            <Stack.Screen name="Formulaire" component={Formulaire}/>
          
            

        </Stack.Navigator>
    );
};

export default Tab2;
