import { View, Text ,Image, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './CreationCode/Home';
import Personnel from './CreationCode/Personnel';
import Perso from './CreationCode/Perso';
//import CreerQrcode from './CreationCode/CreerQrcode';
import Team  from './CreationCode/Team';
import Publicite from './CreationCode/Publicite';
import Compte from './scanner/Compte';


const CreationCode = () => {
  const Stack=createStackNavigator();
  return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Team' component={Team}/>
        <Stack.Screen name='Personnel' component={Personnel} />
        <Stack.Screen name='Perso' component={Perso} />
        <Stack.Screen name='Publicite' component={Publicite} />
        <Stack.Screen name='Compte' component={Compte} />
      </Stack.Navigator>
  )
}

export default CreationCode