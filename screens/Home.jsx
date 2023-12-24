
import { useState } from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Tab1 from './scanner/Index'
import Tab2 from './Reseau/Index'
import Tab3 from './CreerQR/Index'
import Tab4 from './Notification/Index'
import Tab5 from './Parametre/Index'
import ParametreGen from './Parametre/ParametreGen'
import NotificationGen from './Notification/NotificationGen'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ReseauGen from './Reseau/ReseauGen';
import CreerQR from './CreerQR/CreerQR'
import CreationQrBusiness from './CreerQR/CreerQR'

export default function Home() {
  const a=2;
  const Tab = createBottomTabNavigator();
  return (

      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#2B303A",
            inactiveTintColor: "#2B303A",
            labelStyle: {
                fontSize:12,
                paddingBottom:2,
                height:20,
                fontWeight:80
                
                
            },
        }}
          
        >
          {/* <Tab.Screen name={"Scane"} component={About} /> */}
          <Tab.Screen name={"Rechercher"} component={Tab1} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="search-circle" size={28} color="#2B303" /> }} />
          <Tab.Screen name={"Reseau"} component={Tab2} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="console-network" size={24} color="#2B303" />, headerShown: false }} />
          <Tab.Screen name={"Profil"} component={Tab3} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="face-man-profile" size={24} color="#2B303" />, headerShown: false }} />
          <Tab.Screen name={"Notification"} component={Tab4} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="ios-notifications-sharp" size={24} color="#2B303A" />, headerShown: false,tabBarBadge:a }} />
          <Tab.Screen name={"Parametre"} component={Tab5} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="settings-sharp" size={24} color="#2B303A" />, headerShown: false }} />
          
        </Tab.Navigator>
      </NavigationContainer>

    )

}
