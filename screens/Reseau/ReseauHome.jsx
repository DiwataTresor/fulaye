import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { bgColorPrimary } from '../../utils/constats';
import { getData, getMyProfil } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';
import { photoProfil, photoProfilFct } from '../../global/helper';


const img="https://www.challenges.fr/assets/afp/2018/07/25/ef5a0135078d22912853808dfbcdda279c5416fd.jpg";

const Example=({navigation})=>{
  const {authState} = useAuth();
  const id=JSON.parse(authState.token)?.id || null;
  const [reseaux,setReseaux]=useState([]);
  const [myProfil,setMyProfil]=useState({});
  
  useEffect(()=>{
     
    getData("reseau",id).then(r=>{
      
      if(r.success)
      {
        // console.log(r);
        setReseaux(r.data);

      }
    }).catch(e=>{
      // console.log(e);  
    });
    

  });
  useEffect(()=>{
    getMyProfil(id).then(r=>setMyProfil(r));
  },[])
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'#FFFFFF' }} className={`${bgColorPrimary}`}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header} className=" rounded-2xl">
            <View>
              

              <Text className=" font-thin  text-xl text-[#201335]">Mon réseau</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.avatar}>
                <Image
                  alt=""
                  source={photoProfilFct(myProfil?.photo)}
                  style={styles.avatarImg}
                />

                {/* <View style={styles.avatarNotification} />   */}
              </View>
            </TouchableOpacity>
          </View> 

          

        <View style={styles.send}>    

        <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false} 
        >
          <View className="flex flex-col gap-3">
              {reseaux?.map(({ id,nom,libelle,photo,categorie }, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={()=>navigation.navigate("Profil",{id:id,nom:nom,categorie:categorie})}
                    className="flex flex-row gap-2"
                  >
                    <View>
                      <Image
                        alt=""
                        source={photoProfilFct(photo)}
                        className="w-10 h-10 rounded-full"
                        />
                      </View>
                      <View>
                        <Text className=" text-lg font-medium text-[#999966]">{nom}</Text>
                        <Text className=" font-thin text-[#999966] text-sm">{libelle}</Text>
                      </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
        </View>

          <View style={styles.placeholder}>
          
          </View>
          
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default Example;
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  balance: {
    backgroundColor: '#f4405b',
    borderRadius: 24,
    marginTop: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  send: {
    marginVertical: 32,
  },
  sendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sendScroll: {
    marginHorizontal: -20,
  },
  sendUser: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendUserAvatar: {
    width: 54,
    height: 54,
    borderRadius:9,
    marginBottom: 6,
  },
  sendUserName: {
    fontSize: 15,
    color: '#2B303A',
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    height:60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#facc15',
    paddingLeft:3,
    paddingRight:3,
  

  
  },
  headerBadge: {
    fontSize: 15,
    fontWeight: '400',
    color: '#f4405b',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#f4405b',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 1,
    borderColor: '#f4405b',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#f4405b',
    top: 0,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: '#f4405b',
  },
  
  ListTitle: {
    fontSize:18,
    fontWeight: '450',
    color: '#2B303A',
    textAlign: 'center',
    
    
  },
});