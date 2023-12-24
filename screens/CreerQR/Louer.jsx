import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';

const Louer = () => {
  return (
    <ScrollView className="flex-1">
    <View className=" flex  justify-center items-center">
      <Text style={styles.inputLabel}> Maisons a vendre ou a louer</Text>
        <View  style={ styles.photVehicule}>
            <MaterialIcons name="add-a-photo" size={54} color="#facc15" />
            <Text className=" m-2 -left-8 text-[#facc15] text-sm">Ajouter des photos</Text>
          
        </View>
        <Text className=" mx-3 pt-4 text-sm  text-[#2B303A]">
          Photo 0/3 Choisissesz d'abord la photo principale de votre annonce.
          Ajoutez plus de photos sous differents angles
        </Text>
        <Text className=" mx-4 pt-2 text-sm  text-[#2B303A]">
          Toutes les annonces fond l'objet d un bref examen au moment de leur publication. avant d'etre vues.
          ll est ainsi interdit  des armes, des objets contrefaits et plus encore
        </Text>
        <View className=" w-full top-3 rounded-2xl h-auto bg-white"> 
            <ScrollView>
              <View className="items-center">
                
              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Titre d'Article</Text>
                  <TextInput
                    autoCapitalize="Titre"
                    autoCorrect={false}
                    placeholder="Titre "
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    
                    
                  />
              </View>
              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Prix</Text>
                  <TextInput
                    autoCapitalize="Prix"
                    autoCorrect={false}
                    placeholder="Prix "
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    
                    
                  />
              </View>

              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Etat</Text>
                  <TextInput
                    autoCapitalize="Etat"
                    autoCorrect={false}
                    placeholder="Etat de la Vehicule"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                
                  />
              </View>

              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Lieu</Text>
                  <TextInput
                    autoCapitalize="Lieu"
                    autoCorrect={false}
                    placeholder="Lieu"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                
                  />
              </View>
              <View style={styles.input}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Description du Vehicule"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                
                  />
              </View>
              <Text>
                 <TouchableOpacity
                    onPress={() => {handleSubmit()}} className="">
                    <Text style={styles.btn}>Enregistrer  </Text>
                  </TouchableOpacity>
              </Text>
              
              </View>
            </ScrollView>
        </View>
      
    </View>
    </ScrollView>
  )
}

export default Louer

const styles = StyleSheet.create({

  inputControl: {

    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
    fontSize: 15,
    borderWidth:0.5,
    fontWeight: '300',
    color: '#222',
    borderColor: "ffcccc",

  },
  input: {
    marginBottom: 16,
  },

  inputLabel: {
    lineHeight: 44,
    fontSize: 18,
    fontWeight: '500',
    color:'#2B303A'
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: 'row',
    height:50,
    width:220,
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
  photVehicule:{
     width:360,
     height:180,
     borderRadius: 10,
    fontSize: 15,
    borderWidth:0.5,
    justifyContent:'center',
    paddingLeft:150
    
  }
})