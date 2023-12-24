import { View, Text, TouchableOpacity, Image, Button,ScrollView ,Switch} from "react-native";


import React from "react";



import { createStackNavigator } from "@react-navigation/stack";
import NotificationHome from "./NotificationHome";





const NotificationGen = ({navigation}) => {
  const Stack=createStackNavigator();    
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="NotificationHome" component={NotificationHome} />
    </Stack.Navigator>
  );
};

export default NotificationGen;
