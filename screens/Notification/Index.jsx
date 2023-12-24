import { View, Text, TouchableOpacity, Image, Button,ScrollView ,Switch} from "react-native";


import React from "react";



import { createStackNavigator } from "@react-navigation/stack";
import NotificationHome from "./NotificationHome";





const Tab4 = ({navigation}) => {
  const Stack=createStackNavigator();    
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="Notification" component={NotificationHome} />
      
    </Stack.Navigator>
  );
};

export default Tab4;
