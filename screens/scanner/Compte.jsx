import { StyleSheet, Text, View, ToastAndroid, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'
import { useStateContext } from '../../context/Global'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { postData } from '../../utils/helper';

const Compte = ({navigation}) => {
  const { endPoint,connected,setConnected,profil,setProfil } = useStateContext();
  const [formulaire, setFormulaire] = useState({ nom: "", telephone: "", password: "", passwordbis: "" });
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    detailError: ""
  });

  useEffect(() => {

  }, []);
  const createCompte = () => {
    setError({ detailError: "", isError: false });
    if (formulaire.password !== formulaire.passwordbis) {
      setError({ isError: true, detailError: "Veuillez verifier les 2 mot de passe" });

    }
    if (formulaire.password.trim() == "") setError({ isError: true, detailError: "Le mot de passe ne peut pas être vide" })
    if (formulaire.nom.trim() == "") setError({ isError: true, detailError: "Veuillez ajouter votre nom" })
    if (formulaire.telephone.trim() == "") setError({ isError: true, detailError: "Veuillez ajouter votre Numero de téléphone" });
    if (error.isError == false) {
      setIsloading(true);

      fetch(endPoint + "utilisateurPriveNew", 
      { method: "POST",
        body:JSON.stringify({"nom":formulaire.nom,"telephone":formulaire.telephone,"password":formulaire.password}) }
      ).then(r => r.json())
        .then(r => {
          if (r.success)
          {
            setConnected(true);
            setProfil({...profil,
              nom:formulaire.nom
            });
            ToastAndroid.showWithGravity("Votre compte est bien crée",ToastAndroid.CENTER,ToastAndroid.BOTTOM)
            navigation.navigate("Home")
          }
        }).catch(err => {
          console.log(err);
        }).finally((e) => {
          setError(false);
          setIsloading(false);
          
        })
    }


  }
  return (
    // <KeyboardAvoidingView>
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.logo}>
          <View>
            <Text style={styles.Texttitre}>Formulaire de Enregistrement </Text>
          </View>
        </View>
        <View>
          <TextInput onChangeText={(e) => { setFormulaire({ ...formulaire, nom: e }) }} placeholder='Nom' placeholderTextColor="#377a9b" style={styles.TextInput} />
          <TextInput onChangeText={(e) => { setFormulaire({ ...formulaire, telephone: e }) }} placeholder='Numero de telephone ' placeholderTextColor="#377a9b" style={styles.TextInput} />
          <TextInput onChangeText={(e) => { setFormulaire({ ...formulaire, password: e }) }} secureTextEntry placeholder='Votre mot de passe' placeholderTextColor="#377a9b" style={styles.TextInput} />
          <TextInput onChangeText={(e) => { setFormulaire({ ...formulaire, passwordbis: e }) }} secureTextEntry placeholder='Retaper le mot de passe' placeholderTextColor="#377a9b" style={styles.TextInput} />
        </View>

        {
          isLoading ?
            <View>
              <ActivityIndicator />
            </View> :
            <View >
              <TouchableOpacity style={styles.button} onPress={() => createCompte()}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>}
        {
          error.isError &&

          <View>
            <Text style={{ color: "black", textAlign: "center" }}>{error.detailError}</Text>
          </View>
        }
      </View>
    </View>
    // </KeyboardAvoidingView>
  )
}

export default Compte

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  button: {
    backgroundColor: '#377a9b',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white'

  },

  buttonText: {

    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5


  },
  TextInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#377a9b',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    shadowRadius: 3.86,




  },
  logo: {

    alignItems: 'center',
    width: 440,
    height: 50,
    backgroundColor: '#377a9b'

  },

  Texttitre:{

    marginTop:10,
    fontSize:20,
    textAlign:"center",
    justifyContent:'center',
    color:'#FDFEFE',
    alignContent:'flex-end'
  }


})