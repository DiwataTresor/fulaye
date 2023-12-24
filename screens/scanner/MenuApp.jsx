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
const Articles = () => {
  return (
    <Stack.Navigator
      initialRouteName=""

      screenOptions={{ keyboardHandlingEnabled: true, mode: "card" }}
      headerMode={'screen'} // option (screen, float, none)
    >
      <Stack.Screen
        name="Home"
        component={App}
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
      <Stack.Screen options={{ title: "Scanner le QRCode" }} name="ScannerEts" component={ScannerEts} />
      <Stack.Screen options={{ title: "Vos articles" }} name="Listearticles" component={Listearticles} />
      <Stack.Screen options={{ title: "Meilleurs prix" }} name="Meilleursprix" component={MoinsCher} />
      <Stack.Screen options={{ title: "Créer votre Compte" }} name="compte" component={Compte} />
      <Stack.Screen options={{ title: "Fulaye" }} name="Murfulaye" component={Murfulaye} />
      
    </Stack.Navigator>
  );
}
export default Articles;