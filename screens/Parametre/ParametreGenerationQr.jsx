import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import fulaye from "./../../assets/fulaye.png"
import { AntDesign } from '@expo/vector-icons';




const ParametreGeneration = () => {
  const [newArticle, setNewArticle] = useState();
  const [listeArticle, setListeArticle] = useState([]);
  const [showQR,setShowQR]=useState(false);
  const handleAdd = () => {
    setListeArticle([...listeArticle, newArticle]);
    setNewArticle("");
  };
  const handleDelete = (i) => {
    let newListe = listeArticle.indexOf(i);
    delete newListe[i];
    setListeArticle(newListe);
  };
  const generateQR = () => {};
  return (
    <ScrollView className="bg-[#ffd700] flex-1 relative">
      <View>
        <Text className="text-center mt-3 font-bold  text-[#377a9b] text-lg">
          Générer le QRCode de vos articles
        </Text>
        <View className="items-center mt-3 text-slate-400">
          <TextInput
            value={newArticle}
            onChangeText={(e) => setNewArticle(e)}
            placeholder="Nom de l'article"
            className="border  rounded-md h-12 px-3 py-0.5 w-[320px] border-[#377a9b]"
          />
        </View>

        

        <View className="items-center mt-3 text-slate-400">
          <TextInput
            value={newArticle}
            onChangeText={(e) => setNewArticle(e)}
            placeholder="Prix de l'article"
            className="border  rounded-md h-12 px-3 py-0.5 w-[320px]  border-[#377a9b]"
          />
        </View>

        <View className="items-center mt-3 text-slate-400">
          <TextInput
            value={newArticle}
            onChangeText={(e) => setNewArticle(e)}
            placeholder="Description"
            className="border  rounded-md h-24 px-3 py-0.5 w-[320px]  border-[#377a9b]"
          />
          
          
        </View>
              
      
        <View className="items-center mt-4">
          <TouchableOpacity
            className="bg-[#377a9b] rounded-full py-3 px-2 w-[320px]"
            onPress={() => handleAdd()}
          >
            <Text className="text-center text-white">Ajouter</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-11">
          {listeArticle.map((article, i) => {
            return (
              <View key={i} className="mt-1">
                <View className="flex flex-row pl-10 gap-1 ">
                  <TouchableOpacity
                    className="cursor-pointer hover:rounded-full p-1 hover:bg-blue-400 border border-red-600 rounded-full"
                    onPress={() => handleDelete(i)}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={20}
                      color="red"
                    />
                  </TouchableOpacity>
                  <Text className="p-2">{article}</Text>
                </View>
              </View>
            );
          })}
        </View>

        
      </View>
      
      {/* {listeArticle.length > 0 && (
        <View className="items-center mt-4">
          <TouchableOpacity
            className="bg-blue-400 rounded-full py-3 px-2 w-[320px]"
            onPress={() => generateQR()}
          >
            <Text className="text-center text-white">Generer QRCODE</Text>
          </TouchableOpacity>
        </View>
      )} */}
      {
        listeArticle.length > 0 &&
        <View className="mt-5 items-center">
            <QRCode
            value={listeArticle.join('\n')}
            color={"#2C8DDB"}
            backgroundColor={"white"}
            size={200}
            logoMargin={1}
            logoSize={80}
            logoBorderRadius={10}
            logoBackgroundColor={"white"}
            
            logo={fulaye}
            />
      </View>
      }
      <View className="w-98 h-20 bg-slate-200  top-3 items-center justify-center flex-1">
      <View className="flex-row my-0">
          
      <AntDesign name="sharealt" size={40} color="#377a9b" /> 
      <Text className="font-bold pl-3  text-lg text-gray-600">Partager</Text>
      </View>
      </View>
    </ScrollView>
  );
};

export default ParametreGeneration;