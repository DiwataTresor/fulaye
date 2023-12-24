import { Alert } from "react-native";
import { API_URL } from "../global/helper";
import { getData } from "./helper";

export const getActivites=async ()=>{
    let resultat={};
    await getData("activites")
    .then(r=>{
        resultat=r.data}
    )
    .catch(r=>{
        resultat={success:false,msg:r};
    })
    return resultat;
}
export const getVilles=async ()=>{
    let resultat={};
    await getData("villes")
    .then(r=>{
        resultat=r.data}
    )
    .catch(r=>{
        resultat={success:false,msg:r};
    })
    return resultat;
}
export const getCommunes=async (ville)=>{
    let resultat={};
    await getData(`communes&ville=${ville}`)
    .then(r=>{
        resultat=r.data}
    )
    .catch(r=>{
        resultat={success:false,msg:r};
    })
    return resultat;
}