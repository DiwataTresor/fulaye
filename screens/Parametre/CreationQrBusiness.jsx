import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreationQrBusiness = ({navigation,route}) => {
    try {
       const {id} = route.params;
    Alert.alert(id.toString());
   } catch (error) {
    console.log(error)
   }
  return (
    <View>
      <Text>CreationQrBusiness</Text>
    </View>
  )
}

export default CreationQrBusiness

const styles = StyleSheet.create({})