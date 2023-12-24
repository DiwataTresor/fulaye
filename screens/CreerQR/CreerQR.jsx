import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import CreationQrBusiness from "./CreationHome"
// import CreationHome from './CreationHome';
// import CreationBusiness from './CreationBusiness';
// import CreationUrl from './CreationUrl';
// import CreationVideo from './CreationVideo';


const CreerQR = ({navigation}) => {

  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <View className=" w-32 h-32 ml-6 left-28  top-6 items-center ">
        <Image
          source={require('../assets/Securite.png')}
          style={{ width: 70, height: 70 }}
        />
      </View>

      <Text className="left-2  text-xl text-[#4C0517] top-9">

      </Text>
      <View className="form space-y-2 flex-1 top-16">
        
        
        <View className=" flex-row items-center justify-center text-2xl">
          <Text className=" text-lg">
          Veuillez renseigner les informations.
          </Text>
            </View>
        <View className="form space-y-2" >
          <Text className="text-gray-700 text-sm ml-2"> </Text>
        <View className="justify-center pl-5"> 
          <TextInput  style={ styles.inputControl} />
        </View> 
          
          

          <View className="space-y-4 pt-8 mt-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('CreationHome',{id:1})} className=" py-3 shadow-lg shadow-black rounded-full mx-7">
              <Text style={styles.btn} className="text-[#2B303A]  justify-center">Valide la activation </Text>
            </TouchableOpacity>
                        
            <View className=" flex-row items-center justify-between px-8">
            <Text className=" font-thin -top-1">
            Entrez le code de vérification dans l'application pour valider votre compte.
            Une fois votre compte validé, vous pourrez accéder à toutes les fonctionnalités de l'application 
             et bénéficier de tous les avantages qu'elle offre.
            </Text>
            </View>
          
          </View>
        </View>

      </View>

    </View>
  )
}
// const CreationQrHome=()=>{
//   const Stack=createStackNavigator();
//   return(
//     <Stack.Navigator>
//         <Stack.Screen name="CreerQr" options={{title:"Création QR"}} component={CreerQR} />
//         <Stack.Screen name="creationQrBusiness" options={{title:"Génerer votre QR Business", presentation:'modal'}} component={CreationQrBusiness} />
//         <Stack.Screen name="CreationHome" options={{title:"Génerer votre QR"}} component={CreationHome} />
//         <Stack.Screen name="CreationBusiness" options={{title:"Génerer votre QR Business",presentation:"modal"}} component={CreationBusiness} />
//         <Stack.Screen name="CreationUrl" options={{title:"Génerer votre QR Url ",presentation:"modal"}} component={CreationUrl} />
//         <Stack.Screen name="CreationVideo" options={{title:"Génerer votre QR Video ",presentation:"modal"}} component={CreationVideo} />
//     </Stack.Navigator>
//   )
// }

export default CreerQR

const styles = StyleSheet.create({

  container: {
    flex: 1,


  },

  titre: {
    maxWidth: 80,
    height: 80,
    backgroundColor: '#377a9b'


  },
  btn: {
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingTop:17,
    borderWidth: 1,
    backgroundColor: '#facc15',
    borderColor: '#facc15',
    textAlign:'center'
  },

  Qr: {

    fontSize: 18,
    color: '#377a9b',
    left: 4,
    marginTop: 4,

  },
  
  sendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f1f5f9',
    textTransform: 'uppercase',
    marginBottom: 12,
    left:20
  },
  profileActionText: {
    textAlign:'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  formFooter: {
    fontSize:12,
    fontWeight: '450',
    color: '#2B303A',
    textAlign: 'center',
  },
  inputControl: {

    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
    fontSize: 15,
    borderWidth:0.4,
    fontWeight: '300',
    color: '#222',
    borderColor: "ffcccc",
   

  }



})