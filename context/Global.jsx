import { useContext,useState,useEffect, createContext } from "react";
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native";

const stateContext=createContext();

export const GlobalContext=({children})=>{
    const endPoint="http://192.168.43.184:8000/";
    const [connected,setConnected]=useState(true);
    const [profil,setProfil]=useState({
        nom:"",
        role:"",
        id:""
    });
    let connectAction=(action)=>{
        SecureStore.setItemAsync("connected",action);
       try {
        SecureStore.getItemAsync("connected").then(d=>{setConnected(Boolean(action)); console.log(d)});
       } catch (error) {
        console.log(error)
       }
    }
    const [authentification,setAuthentification]=useState({connected,profil});
    
    return (
        <stateContext.Provider value={{endPoint,profil,setProfil,connected,setConnected,connectAction}}>
            {children}
        </stateContext.Provider>
    )
}
export const useStateContext=()=>useContext(stateContext);
