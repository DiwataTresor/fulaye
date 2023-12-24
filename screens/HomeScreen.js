
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import About from './About'
import Contact from './Contact'
import Articles from './Articles'
import scanner from './scanner'
import reseau from './reseau'
import ParametreGen from './Parametre/ParametreGen'
import Scannerlivre from './Scannerlivre'
import Compte from './scanner/Compte'






const HomeScreen = () => {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator >
      {/* <Tab.Screen name={"Scane"} component={About} /> */}
      <Tab.Screen name={"Scanner"} component={Articles} options={{tabBarIcon:({color,size})=><MaterialIcons name="qr-code-scanner" size={24} color="black" />}} />
      <Tab.Screen name={"reseau"} component={reseau} />
      <Tab.Screen name={"Créezcodes"} component={Contact} />
      <Tab.Screen name={"Compte"} component={Compte} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default HomeScreen