import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { bgColorPrimary } from '../../utils/constats';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default Profil=({navigation,route}) =>{
    const {nom,id}=route.params;
  return (
    <SafeAreaView style={{ flex:1 ,backgroundColor:'#E7E4E4'}}>
      <ScrollView className={`${bgColorPrimary}`}>
      <View style={styles.container} >
       <View className=" flex-row w-96 bg-[#ffffff] shadow-2xl shadow-black rounded -left-6  h-28  m-3 -top-2">
         <View className=" w-32  h-24 top-2 left-3 ">
         <Image
                 source={require('../assets/Mobile.png')}
                 style={{ width: 90, height: 90 }}
             />
         </View>
         <View className=" flex  bg-white">
          <Text className=" text-center  w-40 pt-3 text-[#6c63ff]">
          Most of the time, you won't use
           NavigationContext directly 
          </Text>
          
         </View>
       </View>
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
            <View className=" w-20 h-20 rounded-full">    
            <Image
                 source={require('../assets/userprofile.png')}
                 style={{ width: 80, height: 80 }}
             />
            </View>
              

              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text className=" text-2xl ">{nom}</Text>

              <Text className=" text-base">
                 Compte professionnel 
                {' · '}
                
              </Text>
              <Text style={styles.profileSubtitle} className=" -left-16 text-sm pt-1">089 78 69 274</Text>
            </View>
          </View>
          <Text className="text-center mb-2ß"></Text>
          
          <View className="flex-row space-x-1 justify-center ">
            
          <View className=" flex-row  -top-4  space-x-10 justify-center items-center">
              <View style={ styles.btnId}>
               <Text className=" text-center font-bold text-sm  text-[#2B303A]">ID No. 3391102196</Text>
              </View>

              <View style={ styles.btnshare}>
              <Entypo name="share" size={24} color="black" />
              <Text className="  -top-5  text-center pl-5">Share</Text>
              </View>
            
          </View>  

          </View>
           
        </View>

        <View className="bg-[#2B303A] rounded-full p-2 h-14">
          <Text className=" text-center justify-center top-2 text-white font-bold text-xl">
            Edite Profil
          </Text>
        </View>

       <View className="flex-row justify-center space-x-28 top-3">
          
          
          <View className=" flex-row top-1 space-x-16">
           
          <View className=" left-2 top-0"><Ionicons name="md-share-social-sharp" size={34} color="#facc15" /></View>
          <View className=" left-2 top-0"><Fontisto name="photograph" size={34} color="#facc15" /></View>
          <View className=" left-2 top-0"><Ionicons name="ios-videocam" size={34} color="#facc15" /></View>
          </View>


       </View>

        <View style={styles.list}>
        <View style={styles.listHeader}>
            <Text style={styles.profileSubtitle}>Voire les articles</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <Text style={styles.profileSubtitle}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {[
              {

                icon: 'figma',
    
                label: 'Senior UI/UX Designer',
                company: 'Figma',
                jobType: 'Full Time',
                years: '2019-2023',
              },
              {
                icon: 'github',
                label: 'Mid-level Designer',
                company: 'GitHub',
                jobType: 'Full Time',
                years: '2017-2019',
              },
              {
                icon: 'twitter',
                label: 'Junior Designer',
                company: 'Twitter',
                jobType: 'Full Time',
                years: '2015-2017',
              },
            ].map(({ icon, label, company, jobType, years }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardIcon}>
                      <FeatherIcon color="#000" name={icon} size={24} />
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{label}</Text>

                      <Text style={styles.cardSubtitle}>{company}</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{jobType}</Text>

                    <Text style={styles.cardFooterText}>{years}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>

        <View className="flex-row w-96 bg-[#facc15] shadow-2xl shadow-black rounded -left-6  h-28  m-3 -top-2">

        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingVertical: 18,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#f4405b',
    
  },
  list: {
    marginTop: 18,
    marginHorizontal: -6,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    width: CARD_WIDTH,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 20,
    fontWeight: '200',
    color: '#373F51',
    textAlign: 'center',
  },
  profileDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
    textAlign:"center"
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#f4405b',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#f4405b',
    borderColor: '#f4405b',
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 20,
    height: 20,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  cardFooter: {
    textAlign:"center",
    justifyContent: 'center',
    marginTop: 10,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',

  },
  logofulaye:{

    width:700,
    height:90,
    backgroundColor:'#f4405b',
    textAlign:'center'
  },
  icon:{
    left:20,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  icone:{
    left:10,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  icons:{
    left:5,
    fontWeight: '600',
    lineHeight: 22,
    color: '#fc2222',
  },
  btnId:{
     width:160,
     height:40,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',
    textAlign:'center',
    color:'#fc2222'
    
  },
  btnshare:{
    width:100,
    height:40,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B303A',
    textAlign:'center',
    color:'#fc2222'
  }
});