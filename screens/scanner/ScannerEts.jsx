// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import QRCode from 'react-native-qrcode-svg'

// const ScannerEts = () => {
//   return (
//     <View>
//       <View>
//         <QRCode
//                   value={"12345"}
//                   color={"#2C8DDB"}
//                   backgroundColor={"white"}
//                   size={200}

//                   logoMargin={2}
//                   logoSize={80}
//                   logoBorderRadius={10}
//                   logoBackgroundColor={"transparent"}
//                 />
//       </View>
//     </View>
//   )
// }

// export default ScannerEts

// const styles = StyleSheet.create({})

import { View, Text, StyleSheet, SafeAreaView, Pressable, TouchableHighlight, Alert, Button, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Plume } from '@expo/vector-icons';



import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, } from "@expo/vector-icons";


import Loading from './../../components/Loading';
import { getData } from "../../utils/helper";

const ScannerEts = ({ navigation }) => {

  const [scannerActive, setScannerActive] = useState(true);
  const [hasPermission, setHasPermissions] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [saisieCode, setSaisieCode] = useState(false);
  const [immatriculation, setImmatriculation] = useState("");
  const [immatriculationInput, setImmatriculationInput] = useState("");
  const [loadingIsOpened, setLoadingIsOpened] = useState(false);
  const [dateEntree, setDateEntree] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [heureEntree, setHeureEntree] = useState("");
  const [heureSortie, setHeureSortie] = useState("");
  const [opEntree, setOpEntree] = useState("");
  const [dataMouvement, setDataMouvement] = useState({});
  const [displayInfo, setDisplayInfo] = useState(false);
  const [feedBack,setFeedBack]=useState(<ActivityIndicator size={30} />)

  useEffect(() => {
   
    async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermissions(status == "granted");
    };
  }, []);
  
  const handleSuccess = ({ type, data }) => {
    console.log(data);
    setScannerActive(false);
    getData("checkQrCode&data="+data?.toString()).then(r=>{
      console.log(r.data[0]?.nom)
      if(r.success==false)
      {
        setFeedBack( 
          <>
          <View className="bg-red-500 border border-red-700 rounded-md py-3 px-4">
            <Text className="text-red-400 px-2 text-center justify-center">Aucun profil ne correspond au QRCode scanné</Text>
          </View>
          <TouchableOpacity className="mt-5" onPress={()=>setScannerActive(true)}>
            <View className="flex flex-col w-full gap-3 h-fit items-center justify-center">
              <Text>Scanner de nouveau</Text>
              <MaterialIcons name="qr-code-scanner" size={50} color="#ffffff" />
            </View>
          </TouchableOpacity>
          </>
        );
      }else
      {
       
        // Alert.alert(""+r.data[0].id+"  "+r.data[0].nom);
        navigation.navigate("profilPro",{id:r.data[0].id,nom:r.data[0].nom,categorie:r.data[0].categorie})
      }
    })
  };

  const handleScanQr = () => {
    setScannerActive(true);
  };
  const capturer = () => { };
  if (hasPermission === null && hasPermission === false) {
    return <Text>Vous n'avez d'accès à la Camera</Text>;
  }
  useEffect(() => {
    // handleScanQr();
  })
  return (
    <ScrollView className="pb-2 bg-[#ffffff] h-full">
      <SafeAreaView className="mt-25 h-full"> 

        <View className="mb-1 pb-1">
          {scannerActive ? (
            <View className="flex flex-col">

              <View className="mt-2 w-[100%] pr-3">
                <BarCodeScanner
                  type={type}
                  barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.Qr],
                  }}
                  barCodeTypes={BarCodeScanner.Constants.BarCodeType.Qr}
                  onBarCodeScanned={scanned ? undefined : handleSuccess}
                  className="w-screen mr-3 h-screen"

                >
                  <TouchableOpacity
                    class="bg-blue-200 w-fit py-2 px-1"
                    onPress={() => {
                      setType(
                        type === BarCodeScanner.Constants.type.Back
                          ? BarCodeScanner.Constants.Type.Front
                          : BarCodeScanner.Constants.Type.Back
                      );
                    }}
                  ></TouchableOpacity>
                </BarCodeScanner>
              </View>
            </View>
          ) : (
            <ScrollView className="pb-2 bg-[#ffffff] h-screen">
              <View className="items-center pt-3 -mt-32 flex-1 h-screen flex-col flex justify-center">
              
                <View className=" w-16 h-16 rounded-xl bg-[#201335]  items-center justify-center ">
                 
                  <Text>{feedBack}</Text>
                </View>
                <Text className="items-center mt-6">
                  <Text className="mr-2 font-thin mt-3 text-[#2B303A]">
                  veuillez patienter pendant l l'exécution  &nbsp; &nbsp;
                  </Text>
                </Text>
                <View className=" flex-row items-center justify-between px-8">
                  <Text className="text-[#2B303A] text-xs text-justify ">
                  des annonces seront annoncées après chaque scan de QR code
                  liées à votre intérêts  générer des revenus grâce à ces annonces.
                  </Text>
                </View>

                <View className=" w-96 h-40 rounded-lg mt-5 bg-black">

                </View>
                

              </View>
            </ScrollView>
          )}
        </View>
        <Loading isOpened={loadingIsOpened} text="Traitement en cours..." />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ScannerEts;
