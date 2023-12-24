import { View, Text, TouchableOpacity, Image, Button,ScrollView ,Switch} from "react-native";


import React from "react";



import { createStackNavigator } from "@react-navigation/stack";
import ParametreHome from "./ParametreHome";
import ParametreCompte from "./ParametreCompte";
import ParametreNotification from "./ParametreNotification";
import ParametreActivationCompte from "./ParametreActivationCompte";
import ParametreGenerationQr from "./ParametreGenerationQr";
import CreationQrBusiness from "./CreationQrBusiness";
import Editerprofil from "./../scanner/Editerprofil";







const ParametreGen = ({navigation}) => {
  const Stack=createStackNavigator();    
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="parametreHome" component={ParametreHome} />
      <Stack.Screen name="parametreCompte" component={ParametreCompte} />
      <Stack.Screen name="parametreNotification" component={ParametreNotification} />
      <Stack.Screen name="parametreActivationCompte" component={ParametreActivationCompte} />
      <Stack.Screen name="parametreGenerationQr" component={ParametreGenerationQr} />
      <Stack.Screen name="creaionQrBusiness" component={CreationQrBusiness} />
      <Stack.Screen name="Editerprofil" component={Editerprofil} />
    

    </Stack.Navigator>
  );
};

export default ParametreGen;
