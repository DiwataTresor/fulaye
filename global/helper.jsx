
export const BACKEND_URL="http://192.168.0.101/root/backend-fulaye/";
export const API_URL=BACKEND_URL+"api.php";
export const photoProfil=BACKEND_URL+"imagesProfil/";
export const photoProfilFct=(img=null)=>{
    let res=
    img===null?
    res=require("./../screens/assets/profil.png"):
    res={uri:BACKEND_URL+"imagesProfil/"+img}
    return res;
}