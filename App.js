
import { useState } from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MenuApp from './screens/scanner/MenuApp'
import ParametreGen from './screens/Parametre/ParametreGen'
import NotificationGen from './screens/Notification/NotificationGen'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ReseauGen from './screens/Reseau/ReseauGen'
import {GlobalContext} from './context/Global'
import Home from './screens/Home'
import { AuthProvider } from './context/AuthContext'




export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <AuthProvider>
      {/* <GlobalContext> */}
        <Home  />
      {/* </GlobalContext>  */}
    </AuthProvider>
    )

}
