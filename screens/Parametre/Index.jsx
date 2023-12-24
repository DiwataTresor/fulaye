import { View, Text, TouchableOpacity, Image, Button,ScrollView ,Switch} from "react-native";


import React from "react";



import { createStackNavigator } from "@react-navigation/stack";
import ParametreHome from "./ParametreHome";
import ParametreCompte from "./ParametreCompte";
import ParametreActivationCompte from "./ParametreActivationCompte";
import ParametreGenerationQr from "./ParametreGenerationQr";
import ParametreAide from "./ParametreAide";
import CreationQrBusiness from "./CreationQrBusiness";
import Authentification from "./Authentification";
import ExportQrcode from "./ExportQrcode";
import ContactezNous from "./ContactezNous";
import suprimeCompte from "./suprimeCompte";
import statustique from "./statustique";






const Tab5 = ({navigation}) => {
  const Stack=createStackNavigator();    
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="Paramètre" component={ParametreHome} />
      <Stack.Screen name="parametreCompte" component={ParametreCompte} />
       <Stack.Screen name="ContactezNous" component={ContactezNous}/>
      <Stack.Screen name="parametreActivationCompte" component={ParametreActivationCompte} />
      <Stack.Screen name="parametreGenerationQr" component={ParametreGenerationQr} />
      <Stack.Screen name="parametreAide" component={ParametreAide} />
      <Stack.Screen name="creaionQrBusiness" component={CreationQrBusiness} />
      <Stack.Screen name="Authentification" component={Authentification} />
      <Stack.Screen name="ExportQrcode" component={ExportQrcode}/>
      <Stack.Screen name="suprimeCompte" component={suprimeCompte}/>
      <Stack.Screen name="statustique" component={statustique}/>
    

    </Stack.Navigator>
  );
};

export default Tab5;
