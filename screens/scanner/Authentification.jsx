import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useAuth } from '../../context/AuthContext';


export default function Example({ navigation,route }) {
  const [isConnexion,setIsConnexion]=useState(false);
  const [form, setForm] = useState({
    telephone: '',
    password: '',
  });
  const {authState,onLogin}=useAuth();
  const connectedSuccess=()=>{
    ToastAndroid.showWithGravity("Bien connecté",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    navigation.navigate("Murfulaye");
    setIsConnexion(false);
  }
  const connectedFail=()=>{
    ToastAndroid.showWithGravity("Echec de connexion",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    setIsConnexion(false);
  }
  const connect=async ()=>{
    setIsConnexion(true);
    const connexion=await onLogin(form.telephone,form.password);
    connexion.success? connectedSuccess():connectedFail();
  }
  return (
    <SafeAreaView style={{ flex:1 ,backgroundColor:'#facc15'}}>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View className=" justify-center -top-8 items-center">
          <Image
          source={require('../assets/Securite.png')}
          style={{ width: 90, height: 90 }}
          className=" rounded-full"
           />
          </View>
          <Text className=" pl-24 -top-6 text-[#201335] text-lg  font-light   mx-3 ">Content de te revoir!</Text>

          <Text className=" text-lg  font-light -mt-1 justify-center items-center text-[#201335] pl-16  -top-6">Connectez-vous à votre compte</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Téléphone</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={telephone => setForm({ ...form, telephone })}
              placeholder="Numero de telephone"
              placeholderTextColor="#A3A9AA"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#A3A9AA"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                connect();
              }}>
              <View style={styles.btn} className=" rounded-3xl ">
                {
                  isConnexion?
                    <ActivityIndicator />
                  :
                    <Text style={styles.btnText}>Se connecter</Text>
                }
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
          onPress={()=>navigation.navigate("sincrire")}
               >
            <Text style={styles.formFooter}>
            Vous n'avez pas de compte ?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 2,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '200',
    color: '#2B303A',
    textAlign: 'center',
    marginTop:25,
  },
  
  subtitle: {
    fontSize: 15,
    fontWeight: '200',
    color: '#2B303A',
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  inputLabel: {
    lineHeight: 44,
    fontSize: 18,
    fontWeight: '300',
    color:'#2B303A',
    marginBottom: 2,
  },
  inputControl: {
    height: 50,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
    borderRadius: 50,
    fontSize: 15,
    borderWidth: 0.5,
    fontWeight: '300',
    color: '#222',
    borderColor: "#ffff",
  },
  btn: {
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#201335',
    borderColor: '#2E2D4D',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    color: '#ffffff',
  },
});