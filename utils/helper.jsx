import { Alert } from "react-native";
import { API_URL } from "../global/helper";
import { useAuth } from "../context/AuthContext";

export const camelCase = (str) => {
    let str2="";
    if(str!=="" || str!==undefined || str!==null)
    {
        const arr = str?.split(" ");
        for (var i = 0; i < arr?.length; i++) {
            arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1);
        }
        str2 = arr?.join(" ");
    }
    return str2;
}
export const getData=async (qry,id=null)=>{
    // const {authState}=useAuth();
    // const id=(JSON.parse(authState.token)?.id) || null;
    
    let response={};
    await fetch(`${API_URL}?qry=${qry}&id=${id}`,{method:"GET"}).then(r=>r.json())
    // await fetch(`${API_URL}?qry=${qry}`,{method:"GET"}).then(r=>r.json())
    .then(r=>{response=r});
    return response
}
export const postData=async(qry,data,id=null)=>{
    // const {authState}=useAuth();
    // const id=(JSON.parse(authState.token)?.id) || null;
    
    let response={};
    let formulaire=new FormData();
    formulaire.append("qry",qry);
    formulaire.append("data",JSON.stringify(data));
    formulaire.append("id",id);
    await fetch(`${API_URL}`,{method:"POST",body:formulaire}).then(r=>r.json())
    .then(r=>{response=r});
    return response
}
export const getMyProfil=async(id)=>{
    let resultat={};
    await getData("myProfil",id)
    .then(r=>{
        resultat=r;
    }).catch(err=>{
        
      });
      return resultat;
}
export const getProfil=(id)=>{
    let res={};
    getData(`getProfil&id=${id}`).then(r=>{
        res=r.data;
    });
    return res;
}
export const articleNbLike=async(articleId)=>{
    let r=0; 
    getData(`articleNbLike&articleId=${articleId}`).then(r=>{
        // console.log(r.data)
        r=parseInt(r.data);
    });
    return r
}
export const setArticleLikeStatus=async(articleId,profilId,status)=>{
   
    let retour=false;
    await postData(`setArticleLikeStatus`,{article:articleId,profilId:profilId,status:status})
    .then(r=>{
        retour=r.success
    });
    return retour
}

export const articleInitialStatus=async(articleId,profilId)=>{
    let s=false;
    await getData(`getArticleStatusLike&articleId=${articleId}&profilId=${profilId}`)
    .then(r=>{
        s=r.success;
    })
    return s;
}