import { StyleSheet, Text, View,Switch, value, onValueChange, handleValueChange } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const Formulaire = () => {
  return (
    <ScrollView>
          <View style={styles.container}>
            <View className=" w-96 h-16 shadow rounded  bg-[#facc15]">
              <Text className=" text-center font-thin text-xl pt-4 text-white">Passe une annonce</Text>
            </View>
              <Text className=" font-thin text-lg -left-36  p-2  ">Objectif</Text>
            <Text className=" text-xl">Quels résultats attendez-vous de cette Anonce?</Text>
            <View className=" flex-row pt-4 space-x-2">
             <View className="w-10 h-10 bg-black   rounded-full">

             </View>
             <View className="flex">
              <Text className=" text-xl">Trafic vers web, point de vente</Text>
              <Text className=" text-xs font-thin w-64">Une annonce peut générer du trafic vers le site web de l'entreprise ou vers son point de vente physique</Text>
             </View>
             <View>
             <View>
      <Switch
        value={value}
        onValueChange={handleValueChange}
      />
    </View>
             </View>
            </View>
            <View className=" flex-row pt-2 space-x-2">
             <View className="w-10 h-10 bg-[#facc15]   rounded-full">

             </View>
             <View className="flex">
              <Text className=" text-xl">Augmentation des ventes </Text>
              <Text className=" text-xs font-thin w-64">Une annonce bien conçue peut stimuler les ventes en incitant les clients potentiels à effectuer un achat</Text>
              <Text className=" text-xs  text-[#facc15] font-bold w-56">Bien pour Vendre </Text>
             </View>

             <View>
             <View>
      <Switch
        value={value}
        onValueChange={handleValueChange}
      />
    </View>
             </View>
            </View>

            <View className=" flex-row pt-2 space-x-2">
             <View className="w-10 h-10 bg-[#facc15]   rounded-full">

             </View>
             <View className="flex">
              <Text className=" text-xl">Notoriété de la marque</Text>
              <Text className=" text-xs font-thin w-64">Une annonce peut contribuer à accroître la visibilité et la reconnaissance de la marque auprès du public</Text>
              <Text className=" text-xs  text-[#facc15] font-bold w-56">Bien pour Vendre </Text>
             </View>

             <View>
             <View>
      <Switch
        value={value}
        onValueChange={handleValueChange}
      />
    </View>
             </View>
            </View>

            <View className=" w-96 top-2 h-12 bg-[#ffffcc] rounded-md">
             <Text className=" text-center text-lg pt-3 ">Selectionne un article ou Services</Text>
            </View>
            <View style={styles.article} className="w-96 space-x-2 flex-row h-32 top-3">
              <View className=" w-11 h-11  rounded-2xl bg-black"></View>
              <View>
                <Text className="font-thin text-slate-500">Sandal Homme </Text>
                <Text className="font-thin text-slate-500">Prix :3000</Text>
                <Text className=" font-semibold">Objectif : Augmentation des ventes </Text>
                <Text className=" font-thin">Types d'Offres : soldes </Text>
              </View>
              
            </View>
            <Text className=" text-sm font-thin pt-4">Offrez des promotions et des remises pour  attirer l'attention des prospects et les convertir en clients</Text>
            <View className="flex-row space-x-2 pt-2">
              <View className=" h-7  pl-2 pr-2 pt-1 rounded  bg-[#facc15]">
                <Text>Solde</Text>
              </View>
              <View className=" h-7 pl-2 pr-2 pt-1 rounded  bg-[#facc15]">
                <Text>Reduction de prix</Text>
              </View>

              <View className=" h-7 pl-2 pr-2 pt-1 rounded  bg-[#facc15]">
                <Text>Offre de promotion</Text>
              </View>
            
            </View>
            <Text className=" text-sm font-thin pt-4">Offrez des promotions et des remises pour  attirer l'attention des prospects et les convertir en clients</Text>
          </View>
    </ScrollView>
  )
}

export default Formulaire

const styles = StyleSheet.create({

  container:{
                  
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     padding:10,
     backgroundColor:'#ffffff'

  },
  article:{
    
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#cccccc',
    }
  


})