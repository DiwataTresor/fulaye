import { View, Text, Modal, StyleSheet,ActivityIndicator } from "react-native";
import React, { useState } from "react";



const Loading = ({text="Traitement en cours...",isOpened=false}) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      <View className="">
        <Modal
          animationType="fade"
          transparent={true}
          visible={isOpened}
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
                <View className="bg-white h-24 mx-4 shadow-md items-center content-center justify-between rounded-md">
                    <View className="pt-4 items-center">
                        <ActivityIndicator color="orange" size="large"/>
                        <Text>{text}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <Text>&nbsp;</Text> 
            </View>
          </View>
        </Modal>
      </View>
    </>
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

export default Loading;
