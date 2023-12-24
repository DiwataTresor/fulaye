import React, { useEffect,useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { bgColorPrimary } from '../../utils/constats';
import { getData } from '../../utils/helper';
import { TextInput } from 'react-native-gesture-handler';


const imgIcon="https://www.wikimeubles.fr/wp-content/uploads/2021/02/SalleamangerdelavillaMajorelleMEN-ClicheSKopiejpg-e1613953469418.jpg";
const items = [
  {
    img: 'https://www.wikimeubles.fr/wp-content/uploads/2021/02/SalleamangerdelavillaMajorelleMEN-ClicheSKopiejpg-e1613953469418.jpg',
    label: 'Menusier',
    ordered: 232,
    likes: 87,
    
  },
  {
    img: 'https://cdn.lcieducation.com/-/media/images/responsive/maroc/ecoles/mode/manager-styliste-modeliste-1920x1080.jpg?rev=c1d313826d6047d28a921340405b71a3',
    label: 'Modeliste',
    ordered: 76,
    likes: 23,
    
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijfE7oSgQ3dWV5DBW50Wa5aUEahHxE_qxJw&usqp=CAU',
    label: 'Commerçante',
    ordered: 283,
    likes: 85,
    
  },
  {
    img: 'https://gdb.voanews.com/03180000-0aff-0242-7208-08da3bcf8f04_w1200_r1.png',
    label: 'Mécanicien',
    ordered: 82,
    likes: 73,
    
  },
  {
    img: 'https://www.challenges.fr/assets/afp/2018/07/25/ef5a0135078d22912853808dfbcdda279c5416fd.jpg',
    label: 'Moto taxi',
    ordered: 232,
    likes: 87,
    
  },
  {
    img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    label: 'Opoeta',
    ordered: 76,
    likes: 23,
    
  },
  {
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    label: 'Make Your Own Salad',
    ordered: 283,
    likes: 85,
    
  },
  {
    img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    label: 'French Toasts',
    ordered: 82,
    likes: 73,
   
  },
];

export default function Example({navigation,route}) {
  const {categorie}=route.params;
  const [metiers,setMetiers]=useState([]);
  const [isloading,setIsloading]=useState(true);
  const [dataInit,setDataInit]=useState([]);
  const [textSearch,setTextSearch]=useState(null);
  
  useEffect(()=>{
    getData(`categorie&categorie=${categorie}`).then(r=>{
      setDataInit(r.data);
      setMetiers(r.data);
    }).finally(()=>{
      setIsloading(false)
    })
  },[])

  const suppr_acc_car_spec = function (a) {
    if (typeof a === 'string') {
      var str = a; var tab_accent_brut = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ";
      var tab_sansAccent_brut = "aaaaaaaaaaaaooooooooooooeeeeeeeecciiiiiiiiuuuuuuuuynn";
      var tab_accent = tab_accent_brut.split('');
      var tab_sansAccent = tab_sansAccent_brut.split('');
      tabCorrAcc = new Array();
      var i = -1;
      while (tab_accent[++i]) {
        tabCorrAcc[tab_accent[i]] = tab_sansAccent[i]
      }
      tabCorrAcc['Œ'] = 'OE';
      tabCorrAcc['œ'] = 'oe';
      str = str.replace(/./g, function ($0) {
        return (tabCorrAcc[$0]) ? tabCorrAcc[$0] : $0
      })
      str = str.replace(/&amp;/g, '_');
      str = str.replace(/_amp;/g, '');
      str = str.replace(/&lt;/g, '_');
      str = str.replace(/_lt;/g, '_');
      str = str.replace(/&gt;/g, '_');
      str = str.replace(/_gt;/g, '_');
      str = str.replace(/(-| |#|"|@|:|\.|,|;|'|%|!|²|=|÷|\+|\?|\/|\[|\]|\{|\}|\*|\^|\$|\\|`|"|'|¨|€|£|¤|µ|§|~|ƒ|„|©|°)/g, '_')
      return str;
    }
  }
  return (
    <SafeAreaView className="bg-[#faf9f9]" >
      <View className=" flex-row justify-center items-center space-x-3">
           <View className=" h-14 bg-[#F7F7FF] shadow-lg">
            <TextInput
             placeholder="les mots-clés à ce que vous recherchez"
             placeholderTextColor="#6b7280"
             style={styles.inputControl}
             keyboardType="email-address"
             value={textSearch}
             onChangeText={(e)=>{
              if(e.trim()=="")
              {
                setMetiers(dataInit)
              }else
              {
                console.log(dataInit);
                const v=dataInit.filter((d)=>{
                  if(suppr_acc_car_spec(d?.libelle)?.toUpperCase().startsWith(suppr_acc_car_spec(e).toUpperCase()) || suppr_acc_car_spec(d?.libelle)?.toUpperCase()?.includes(suppr_acc_car_spec(e).toUpperCase()))
                  {
                    return true
                  }else
                  {
                    return false
                  }
                    
                  });
                console.log(v);
                setMetiers(v);
              }
             }}
            />
           </View>
           <View className=" w-14 h-14 rounded-md  justify-center items-center bg-black">
            <Text><FontAwesome name="search-minus" size={30} color="#facc15" /></Text>
           </View>
      </View>
      <Text className=" m-3 top-3 text-center font-thin text-lg"></Text>
      <ScrollView contentContainerStyle={styles.container} className=" mt-2">
        {/* <Text style={styles.title}></Text> */}
        {
          isloading ?
            <View className=" w-16 h-16 rounded-lg bg-[#201335] mt-60 left-40 flex justify-center items-center">
              <ActivityIndicator color={"#facc15"} size={30} /> 
            </View>:
            metiers.map(({ id,categorie,libelle,nb }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("utilisateurPaCcategorie",{categorie:id,libelle:libelle})
                  }}>
                  <View style={styles.card}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{ uri: imgIcon }}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{libelle}</Text>

                      <View style={styles.cardRow}>
                        <View
                          style={[
                            styles.cardRowItem,
                            { borderRightColor: '#facc15' },
                          ]}>
                          <Fontisto name="folder" size={14} color="#facc15" />

                          <Text style={styles.cardRowItemText}>{nb}</Text>
                        </View>

                        <View style={styles.cardRowItem}>
                          <FeatherIcon color="#201335" name="heart" size={14} />

                          <Text style={styles.cardRowItemText}>{0}</Text>
                        </View>
                      </View>

                      <Text style={styles.cardPrice}>
                      
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.cardAction}>
                      <FeatherIcon color="#201335" name="plus" size={14} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 2,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 7,
    backgroundColor: '#fff',
    padding:5
  },
  cardImg: {
    width: 76,
    height: 76,
    borderRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontWeight: '300',
    fontSize: 18,
    lineHeight: 24,
    color: '#323142',
    marginBottom: 6,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -8,
    marginBottom: 'auto',
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: 'transparent',
  },
  cardRowItemText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#377a9b',
    marginLeft: 4,
  },
  detailcat:{
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 16,
    color: '#377a9b',
    textAlign:'center',
    marginTop:10,
    
  },
  cardPrice: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    color: '#ff9801',
    marginTop: 8,
  },
  cardAction: {
    width: 19,
    height: 19,
    borderRadius: 9999,
    backgroundColor: '#facc15',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  inputControl: {
    height: 54,
    width: 300,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 15,
    borderWidth:2,
    fontWeight: '300',
    color: '#222',
    borderColor: "#facc15",
  },
});