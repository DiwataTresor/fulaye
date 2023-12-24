// import { StatusBar } from 'expo-status-bar';
// import { ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native';
// import { , Text, View, HeroImage, Image } from 'react-native';


import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, SafeAreaView, Text, Button, StyleSheet, HeroImage, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ScannerEts from './ScannerEts';
import Listearticles from './Listearticles';
import MoinsCher from './MoinsCher';
import Compte from './Compte';
import { useStateContext } from '../../context/Global'
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store"
import Murfulaye from './Murfulaye';
import DetailArticle from './DetailArticle';
import DetailOffre from './DetailOffre';
import Profil from './Profil';
import Tout from './Tout';
import UtilisateurPaCcategorie from './UtilisateurParCategorie';
import DetailCategorie from './Tout';
import Authentification from './Authentification';
import topcathegorie from './topcathegorie';
import Editerprofil from './Editerprofil.tsx';
import sincrire from'./sincrire';
import Confiden from './Confiden';
import Fulayepro from '../CreerQR/Fulayepro';

function App({ navigation }) {
  const { connected, setConnected, profil, connectAction } = useStateContext();

  useEffect(() => {
    console.log(connected);
  }, [connected])

  const connexion = () => {
    SecureStore.setItemAsync("connected", "true").then(r => setConnected(true))
  }
  return (
    
    <View className="top-4"></View>,
    <SafeAreaView className=" bg-[#f4f4f5] flex-1 relative ">
      
        <Murfulaye/>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Test</Text>
      <Button onPress={() => navigation.push("Page2")} title='Page 2' />
    </View>
  )
}
const Page2 = ({ navigation }) => {
  return (
    <View>
      <Text>Page 2</Text>
      <Button title='Retour' onPress={() => navigation.push("Home")} />
    </View>
  )
}

const Stack = createStackNavigator();
const Tab1 = () => {
  return (
    <Stack.Navigator
      initialRouteName=""

      screenOptions={{ keyboardHandlingEnabled: true, mode: "card" }}
      headerMode={'screen'} // option (screen, float, none)
    >
      <Stack.Screen
        name="Home"
        component={Murfulaye}
        options={
          {
            headerShown: false,
            headerTitleAlign: 'center', // option (center, left) Defaults to center on iOS and left on Android.
            headerStyle: {},
            headerTitleStyle: {},
            headerBackTitleStyle: {},
            headerLeftContainerStyle: {},
            headerTitleContainerStyle: {},
            headerRightContainerStyle: {},

            headerTransparent: false,
            cardShadowEnabled: true,
            cardOverlayEnabled: true, // Defaults to true on Android and false on iOS.
            //headerStatusBarHeight: 0,
            //headerBackground: settings => { return null },
            //header: settings => { return null }, // React Element
            //headerTitle:settings => { return null }, // React Element
            //headerRight: settings => { return null }, // React Element
            //headerLeft: settings => { return null }, // React Element
            //headerBackImage: settings => { return null }, // React element
            //headerBackTitle:'', // Title string used by the back button on iOS. Defaults to the previous scene's headerTitle
            //headerBackTitleVisible:true,
          }
        }
      />
      <Stack.Screen
        name="Page2"
        component={Page2}
        options={{
          title: 'My profile',
          headerShown: false
        }}

      />
      <Stack.Screen options={{ title: "Detail Produit" }} name="detailArticle" component={DetailArticle} />
      <Stack.Screen options={{ title: "Detail Offre" }} name="detailOffre" component={DetailOffre} />
      <Stack.Screen options={{ title: "Profil Fulaye" }} name="profil" component={Profil} />
      <Stack.Screen options={{ title: "Detail" }} name="detailCategorie" component={DetailCategorie} />
      <Stack.Screen options={{ title: "Detail" }} name="utilisateurPaCcategorie" component={UtilisateurPaCcategorie} />
      <Stack.Screen options={{ title: "Scanner le QRCode" }} name="ScannerEts" component={ScannerEts} />
      <Stack.Screen options={{ title: "Vos articles" }} name="Listearticles" component={Listearticles} />
      <Stack.Screen options={{ title: "Meilleurs prix" }} name="Meilleursprix" component={MoinsCher} />
      <Stack.Screen options={{ title: "Créer votre Compte" }} name="compte" component={Compte} />
      <Stack.Screen options={{ title: "Fulaye", headerShown:false }} name="Murfulaye" component={Murfulaye} />
      <Stack.Screen options={{ title: "Profil", headerShown:false }} name="fulayePro" component={Fulayepro} />
      <Stack.Screen options={{title:"Profil"}} name="Tout" component={Tout}/>
      <Stack.Screen options={{title:"Authentification"}} name="Authentification" component={Authentification}/>
      <Stack.Screen options={{title:"Top Categorie"}} name='topcathegorie' component={topcathegorie}/>
      <Stack.Screen options={{title:"Editer"}} name='Editerprofil' component={Editerprofil}/>
      <Stack.Screen options={{title:"sincrire"}} name='sincrire' component={sincrire}/>
      <Stack.Screen options={{title:"Confiden"}} name='Confiden' component={Confiden}/>
      <Stack.Screen options={{title:"Confiden"}} name='profilPro' component={Fulayepro}/>
     

    </Stack.Navigator>
  );
}
export default Tab1;       