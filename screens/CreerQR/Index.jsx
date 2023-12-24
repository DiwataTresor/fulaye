import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CreationQrBusiness from "./Formulaire"
import CreationHome from './Formulaire';
import CreationBusiness from './CreationBusiness';
import CreationUrl from './CreationUrl';
import CreationVideo from './CreationVideo';
import CreerQR from './CreerQR';
import Louer from './Louer';
import Vehicule from './Vehicule';
import Fulayepro from './Fulayepro';
import Completeprofil from './Completeprofil';
import Monprofil from './Monprofil';
// import { FormulaireCommerce } from '../scanner/Editerprofil';
import FormulaireCommerce from "./FormulaireCommerce"
import FormulaireService from "./FormulaireService"
import FormulaireEntreprise from "./FormulaireEntreprise"







const Tab3=()=>{
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator>
        
        <Stack.Screen name="Fulayepro" options={{title:"Profil"}} component={Monprofil} />
        <Stack.Screen name="creationQrBusiness" options={{title:"Génerer votre QR Business", presentation:'modal'}} component={CreationQrBusiness} />
        <Stack.Screen name="CreationHome" options={{title:"Ajouter un article"}} component={CreationHome} />
        <Stack.Screen name="CreationBusiness" options={{title:"Génerer votre QR Business",presentation:"modal"}} component={CreationBusiness} />
        <Stack.Screen name="CreationUrl" options={{title:"Génerer votre QR Url ",presentation:"modal"}} component={CreationUrl} />
        <Stack.Screen name="CreationVideo" options={{title:"Génerer votre QR Video ",presentation:"modal"}} component={CreationVideo} />
        <Stack.Screen name="Louer" options={{title:"Nouvelle annonce ",presentation:"modal"}} component={Louer} />
        <Stack.Screen name="Vehicule" options={{title:" Nouvelle annonce",presentation:"modal"}} component={Vehicule} />
        <Stack.Screen name="CreerQR"  options={{title:"Page d'activation", presentation:"modal"}} component={CreerQR}/>
        <Stack.Screen name="Completeprofil" options={{title:"Completeprofil",presentation:"modal"}} component={Completeprofil}/>
        <Stack.Screen name="FormulaireArticle" component={FormulaireCommerce}/>
        <Stack.Screen name="FormulaireEntreprise" component={FormulaireEntreprise}/>
        <Stack.Screen name="FormulaireService" component={FormulaireService}/>
    </Stack.Navigator>
  )
}

export default Tab3

const styles = StyleSheet.create({

  container: {
    flex: 1,


  },

  titre: {
    maxWidth: 80,
    height: 80,
    backgroundColor: '#377a9b'


  },

  Qr: {

    fontSize: 18,
    color: '#377a9b',
    left: 4,
    marginTop: 4,




  }






})