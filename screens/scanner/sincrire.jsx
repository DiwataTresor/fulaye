import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { postData, API_URL } from '../../utils/helper';

const INPUT_OFFSET = 110;

export default function Example({ navigation }) {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    password: ''
  });
  const handleSubmit = () => {

    setSubmit(true);
    Alert.alert("Inscription", "Confirmez-vous votre inscription dans FULAYE ?",
      [
        {
          text: "Je confirme",
          onPress: () => {
            let formulaire = new FormData();
            formulaire.append("qry", "inscription");
            formulaire.append("data", JSON.stringify(form));
            postData("inscription", form)
              .then(r => {
                navigation.navigate("Murfulaye", { "fromInscription": true });
              })
              .catch(e => {
                Alert.alert("Inscription", "Une erreur s'est produite pendant votre inscription, veuillez reessayer")
              })
              .finally(() => setSubmit(false))
          }
        },
        {
          title: "Annuler"
        }
      ]
    )


  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView>
        <View className="flex flex-col gap-6 px-4 pt-9">
          <View>
            <View className=" justify-center  items-center">

            </View>

            <Text style={styles.title}>
              Bienvenue à <Text style={{ color: '#facc15' }}>Fulaye</Text>
            </Text>

            <Text style={styles.subtitle}>Créer un compte</Text>
          </View>
          <View className=" justify-center items-center">
            <View style={styles.compteprol}>
                <View className=" flex-row h-10 ">
                  <View className="w-10 h-10 bg-[#facc15] rounded-full m-2"></View>
                  <Text className=" mt-3 font-light text-xl">Profil personnel </Text>
                  <View style={styles.selpro} className=" ml-24 mt-6"></View>
                </View>
                <View className=" justify-center items-center m-3">
                  <Text className=" font-light text-xs text-[#201335]">
                    Obtenez un nouveau nom 
                    résumer les compétences clés, les réalisations professionnelles, 
                     ou les domaines d'expertise pertinents
                  </Text>
                </View>
            </View>

            <View style={styles.compteprol} className=" mt-4">
                <View className=" flex-row h-10 ">
                  <View className="w-10 h-10 bg-[#facc15] rounded-full m-2"></View>
                  <Text className=" mt-3 font-light text-xl">Profil publique </Text>
                  <View style={styles.selpro} className=" ml-24 mt-6"></View>
                </View>
                <View className=" justify-center items-center m-3">
                  <Text className=" font-light text-xs text-[#201335]">
                    Developpez-vous en tant qu entreprise, marque, ou organisation
                    afin de se rendre visibles aux cliens potentiels.  
                  </Text>
                </View>
            </View>

          </View>
          <View>
            <Text className=" font-light text-lg">Quel est le nom de votre compte</Text>
            <Text className="font-light text-xs">utilisez le nom de votre entreprise , marque ,ou organisation ,ou un nom
              Qui decrit votre compte
            </Text>
            <View style={styles.input}>
              <Text style={styles.inputLabel}> </Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={nom => setForm({ ...form, nom })}
                placeholder="Ex: Longindo "
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.nom}
              />
            </View>

            <View style={styles.input} className="top-1">
              <Text style={styles.inputLabel}>Téléphone</Text>
              <Text className=" font-light text-xs -top-1">
                vous aller recevoir un code de vérification par
                SMS pour confirmer votre numéro de téléphone .
                

              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={telephone => setForm({ ...form, telephone })}
                placeholder="+243 970273089"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.telephone}
              />
            </View>



            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={password => setForm({ ...form, password })}
                placeholder="fulaye@2023"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>
            <Text className=" font-light text-xs -top-1">
              J’accepte de recevoir des information de la part de Fulaye
              J’accepte de recevoir des information de la part  des  partenaires Fulaye
            </Text>
            <View style={styles.formAction}>
              {
                submit ? <ActivityIndicator /> :
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit()
                    }}>
                    <View className=" rounded-full bg-[#facc15] h-12 justify-center items-center  font-bold">
                      <Text style={styles.btnText}>Créer un compte</Text>
                    </View>
                  </TouchableOpacity>
              }
              <View style={styles.formActionSpacer} />


            </View>


          </View>
          <View>
            <Text className="text-center font-light text-xs -top-12">
              En cliquant sur « S'inscrire » ci-dessus, vous acceptez les conditions d'utilisation de Fulaye.
              <TouchableOpacity onPress={() => { navigation.navigate("Confiden") }} >
                <Text style={styles.confidentialite} className=" font-light mt-3 text-xs"> termes et conditions politique de confidentialité </Text>
              </TouchableOpacity>
            </Text>
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
  headerIcon: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginBottom: 36,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,

    color: '#3f3f46',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '200',
    color: '#3f3f46',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formActionSpacer: {
    marginVertical: 8,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '200',
    color: '#2B303A',
    textAlign: 'center',
  },
  confidentialite: {
    fontSize: 15,
    fontWeight: '200',
    color: '#1C77C3',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 60,
    width: 360,
    backgroundColor: '#ffff',
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: 15,
    borderWidth: 1.2,
    fontWeight: '300',
    color: '#222',
    borderColor: "#201335",
    justifyContent:'center',
    
    
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '300',
    color: '#3f3f46',
    marginBottom: 8,
  },
  btn: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#1C77C3',
    borderColor: '#1C77C3',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#f4405b',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  inputLabel: {
    lineHeight: 44,
    fontSize: 18,
    fontWeight: '500',
    color: '#2B303A',
    marginBottom: 8,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '300',
    color: '#2B303A',
  },
  btn: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#facc15',
    borderColor: '#facc15',
  },
  compteprol:{
    
    width:360,
    height:110,
    borderRadius:8,
    borderWidth: 1.2,
    borderColor: '#201335',
    justifyContent:'center',
    alignItems:'center',
  },
  selpro:{

    width:15,
    height:15,
    borderRadius:8,
    borderWidth: 3,
    borderColor: '#facc15',
    
  }
});