import { View, Text, Button, Alert, Modal, StyleSheet, Pressable,TouchableHighlight,ActivityIndicator,SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Fab, Icon, Tag,Input } from "native-base";
import { AntDesign,MaterialIcons,MaterialCommunityIcons } from "@expo/vector-icons";
import { useStateContext } from "../contexts/ContextProvider";

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [btnRechercheVisible,setBtnrechercheVisible] = useState(false);
  const [inputRecherche,setInputRecherche]=useState("");
  const [error,setError]=useState("");
  const {api} = useStateContext();
  const rechercheRes=useNavigation();
  const Recherche=()=>{
    
    if(inputRecherche==""){
      setError("* Veuillez saisir une immatriculation");
    }else
    {
      setModalVisible(false);
      rechercheRes.push("AccueilRechercheResultat",{txtSearch:inputRecherche});
    }
  }
  return (
    <SafeAreaView>
      <View className="">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          statusBarTranslucent={false}
        >
          <View className="modal h-full flex flex-col justify-between rounded-md">
            <View>
                <Text>&nbsp;</Text> 
            </View>
            <View class="h-64 bg-orange-200 mx-3 shadow-md text-black w-full items-center">
                <View className="bg-white h-56 mx-4 shadow-md items-center content-center justify-between rounded-md">
                    <View className="pt-4 items-center">
                        <Text className="text-extrabold mb-7">
                            <AntDesign name="search1" size={20} />&nbsp;&nbsp;
                            RECHERCHE
                        </Text>    
                        <View className="w-full items-center">
                            <Input className="px-2"w={{base: "90%",md: "90%",}}
                                pl="2" value={inputRecherche}  onChangeText={(e)=>{setInputRecherche(e);setError("")}} 
                                InputLeftElement={
                                    <MaterialIcons
                                        name="keyboard"
                                        size={24}
                                    color="gray"
                                className="pl-3"
                                  />
                              }
                              placeholder="Immatriculation"
                            />
                            <Text className="text-red-600">{error}</Text>
                        </View>
                    </View>
                    <View>

                    </View>
                    <View className="items-end pb-2 flex flex-row justify-between w-full px-4">
                        <View>
                            <Text>&nbsp;
                            </Text>
                        </View>
                        <TouchableHighlight className="items-end">
                            <Pressable className="content-end">
                                <View className="items-end p-4 flex flex-row space-x-2">
                                    <Button onPress={()=>{Recherche()}} title="TROUVER" />
                                    <Text>&nbsp;</Text>
                                    <Button onPress={()=>{setModalVisible(false)}}  variants="outline" title="ANNULER" />
                                </View>
                            </Pressable>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View>
                <Text>&nbsp;</Text> 
            </View>
          </View>
        </Modal>
      </View>
      <Fab onPress={() => { setModalVisible(true); }} renderInPortal={false} shadow={2} right={5} bottom={5} size="sm" icon={<Icon color="white" as={AntDesign} name="search1" size="7" />} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Search;
