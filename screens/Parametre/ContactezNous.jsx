import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ContactezNous = ({ navigation }) => {
  return (
    <ScrollView className=" bg-white ">
      <View className=" flex-1 justify-center items-center mx-7   mt-2 pt-9">

        <Text className=" font-light text-2xl">Entrer en contact</Text>
        <Text className="  font-light text-xs pt-4 ml-2 ">
          Si vous avez des questions, contactez-nous, nous serons heureux de vous aider
        </Text>

        <View style={styles.contactNamber} >
          <FontAwesome name="phone" size={24} color="#2B303A" />
          <Text className=" font-thin text-lg text-[#2B303A] ">  +243 898939494 </Text>
        </View>

        <View style={styles.contactemail}>
          <MaterialCommunityIcons name="email-alert-outline" size={24} color="#2B303A" />
          <Text className=" font-thin text-lg text-[#2B303A] ">  fulaye-commerciale@.net  </Text>
        </View>

        <View className=" justify-center items-center ">
          <Text className="font-light text-2xl mt-24">Sociale Medias</Text>
        </View>

        <View className=" flex-row mt-3 ">
          <View style={styles.btn3}>
            <Text className=" justify-center items-center">
              <Entypo name="facebook-with-circle" size={34} color="#064789" />
            </Text>
          </View>
          <Text className=" mt-3 font-light text-xs mx-3 text-[#999999]">Restez informé, connectez-vous et interagissez avec nous sur Facebook </Text>
        </View>
        
        <View className=" flex-row mt-3 ">
          <View style={styles.btn3}>
            <Text className=" justify-center items-center">
            <AntDesign name="twitter" size={34} color="#08B2E3" />
            </Text>
          </View>
          <Text className=" mt-3 font-light text-xs mx-3 text-[#999999]">Restez informé, connectez-vous et interagissez avec nous sur Facebook </Text>
        </View>

        <View className=" flex-row mt-3 ">
          <View style={styles.btn3}>
            <Text className=" justify-center items-center">
              <Entypo name="facebook-with-circle" size={34} color="#064789" />
            </Text>
          </View>
          <Text className=" mt-3 font-light text-xs mx-3 text-[#999999]">Restez informé, connectez-vous et interagissez avec nous sur Facebook </Text>
        </View>
        

        

      </View>

    </ScrollView>

  )
}
const styles = StyleSheet.create({
  btn3: {

    height: 55,
    width: 55,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    textAlign: 'center',

  },
  contactNamber: {

    height: 65,
    width: 360,
    borderRadius: 28,
    paddingVertical: 19,
    paddingHorizontal: 12,
    left: 3,
    top: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    textAlign: 'center',
    flexDirection: 'row',

  },
  contactemail: {

    height: 65,
    width: 360,
    borderRadius: 28,
    paddingVertical: 19,
    paddingHorizontal: 12,
    left: 3,
    top: 30,
    borderWidth: 1,
    borderColor: '#cccccc',
    textAlign: 'center',
    flexDirection: 'row',

  }
});
export default ContactezNous