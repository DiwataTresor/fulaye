import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { bgColorPrimary } from '../../utils/constats';
import Editeprofil from './Editeprofil';
import ParametreNotification from './ParametreNotification';
import ContactezNous from './ContactezNous';
import ExportQrcode from './ExportQrcode';
import { useAuth } from '../../context/AuthContext';



const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { id: 'download', icon: 'download', label: 'télécharger Qr code', type: 'link' },
      { id: 'save', icon: 'save', label: 'Statistique', type: 'link' },
      { id: 'wifi', icon: 'wifi', label: 'Notification', type: 'toggle' },
    ],
  },
  {
    header: 'Help',
    items: [
      { id: 'Help', icon: 'save', label: 'Supprime Compte', type: 'link' },
      { id: 'contact', icon: 'mail', label: 'Contactez-nous', type: 'link' },
    ],
  },
  {
    header: 'Content',
    items: [
      { id: 'save', icon: 'save', label: 'Confidentialite', type: 'link' },
      { id: 'download', icon: 'download', label: 'Déconnecté', type: 'link' },
    ],
  },
];

export default function Example({ navigation }) {
  const [form, setForm] = useState({
    language: 'English',
    darkMode: true,
    wifi: false,
  });
  const { authState } = useAuth();
  useEffect(() => {
    console.log(JSON.parse(authState?.token)?.nom);
  }, [])
  return (
    <SafeAreaView className={`${bgColorPrimary} px-2`} style={{ backgroundColor: '#cccccc' }}>
       {
            authState?.authenticated!==null?
            <ScrollView contentContainerStyle={styles.container} >

              <View style={styles.profile} className=" shadow-2xl shadow-slate-500 rounded-2xl">
                <Image
                  source={require('../assets/userprofile.png')}
                  // source={{uri:"https://reactnative.dev/img/tiny_logo.png"}} 
                  style={{ width: 76, height: 76 }}
                />

                <Text style={styles.profileName}>
                  {authState.authenticated !== null ? JSON.parse(authState?.token)?.nom : "Aucun utilisateur"}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('ContactezNous', { id: 1 })}>

                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Editerprofil', { id: 1 })}>
                  <View style={styles.profileAction}>
                    <Text style={styles.profileActionText}>Editer mon profile</Text>

                    <FeatherIcon color="#2B303A" name="edit" size={16} />
                  </View>
                </TouchableOpacity>

              </View>

              <View className=" w-auto h-60 justify-center items-center top-4 bg-white shadow-2xl shadow-slate-500 rounded-2xl">
                <TouchableOpacity onPress={() => navigation.navigate("ExportQrcode")}>
                  <View className="pt-1" style={styles.sectionBody} >
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#FACC15]">
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FAF9F9" />
                      </View>
                      <Text className=" text-lg  font-medium">Compte : </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ExportQrcode")}>
                  <View View style={styles.sectionBody} >
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#FACC15]">
                        <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FAF9F9" />
                      </View>
                      <Text className=" text-lg  font-medium">Télécharger Qr code</Text>
                    </View>
                    <Text className="  left-14 -top-5  font-thin text-sm text-slate-600">télécharger et imprimer un QR code</Text>
                  </View>
                </TouchableOpacity>
                <View className=" w-auto h-3 bg-[#C2C1C2]"></View>

                <View View style={styles.sectionBody} >
                  <TouchableOpacity onPress={() => navigation.navigate("suprimeCompte")}>
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#0081AF]">
                        <MaterialCommunityIcons name="delete-sweep" size={24} color="#FAF9F9" />
                      </View>

                      <Text className=" text-lg  font-medium">Supprime Compte</Text>
                    </View>
                  </TouchableOpacity>
                  <Text className="  left-14 -top-5  font-thin text-sm text-slate-600">le contenu sont définitivement supprimés</Text>
                </View>

                <View className=" w-auto h-3 bg-[#C2C1C2]"></View>
                <TouchableOpacity onPress={() => navigation.navigate("statustique")}>
                  <View View style={styles.sectionBody} >
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#DD614A]">
                        <Ionicons name="stats-chart" size={24} color="#FAF9F9" />
                      </View>
                      <Text className=" text-lg  font-medium">Statistique</Text>
                    </View>
                    <Text className="  left-14 -top-5  font-thin text-sm text-slate-600">d'analyser et d'interpréter les données</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View className="w-7 h-2"></View>
              <View className=" w-auto h-40  justify-center items-center top-4 bg-white shadow-2xl shadow-slate-500 rounded-2xl">
                <TouchableOpacity onPress={() => navigation.navigate("ContactezNous")}>
                  <View View style={styles.sectionBody} >
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#FACC15]">
                        <AntDesign name="contacts" size={24} color="#FAF9F9" />
                      </View>
                      <Text className=" text-lg  font-medium">Contactez-nous</Text>
                    </View>
                    <Text className="  left-14 -top-5  font-thin text-sm text-slate-600">télécharger et imprimer un QR code</Text>
                  </View>
                </TouchableOpacity>
                <View className=" w-auto h-3 bg-[#C2C1C2]"></View>
                <TouchableOpacity onPress={() => navigation.navigate("Tout")}>
                  <View View style={styles.sectionBody} >
                    <View className="flex-row space-x-2">
                      <View className=" w-11 justify-center items-center h-11 rounded-full bg-[#0081AF]">
                        <MaterialCommunityIcons name="delete-sweep" size={24} color="#FAF9F9" />
                      </View>
                      <Text className=" text-lg  font-medium">Déconnecté</Text>
                    </View>
                    <Text className="  left-14 -top-5  font-thin text-sm text-slate-600">le contenu sont définitivement supprimés</Text>
                  </View>
                </TouchableOpacity>
                <View className=" w-auto h-3 bg-[#C2C1C2]"></View>
              </View>
            </ScrollView>:
            <View className=" justify-center items-center  h-screen rounded-lg mt-3 text-3xl bg-white">
              <Text className=" text-2xl text-[#facc15]">Aucun utilisateur connecté</Text>
            </View>
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B303A',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    width: 350,
    height: 54,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,

  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2B303A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#201335',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#facc15',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#2B303A',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '300',
    color: '#2B303A',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});