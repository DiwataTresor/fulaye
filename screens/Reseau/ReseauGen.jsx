import { View, Text, TouchableOpacity, Image, Button, ScrollView, Switch } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReseauHome from "./ReseauHome";
import DetailReseau from "./DetailReseau";
import Messenger from "./Messenger";
import Detailprofil from "./Detailprofil";






const ReseauGen = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator>
            <Stack.Screen name="Reseau" component={ReseauHome} />
            <Stack.Screen name="Messenger" component={Messenger}/>
            <Stack.Screen name="Detailprofil" component={Detailprofil}/>
          
            

        </Stack.Navigator>
    );
};

export default ReseauGen;
