import { StyleSheet, StatusBar, Text, TextInput, View, Image, Alert } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FulayerComponent from './Components/FulayerComponent';
import { Video, ResizeMode } from 'expo-av';
import ProfilItem from './Components/ProfilItem';
import { bgColorPrimary } from '../../utils/constats';
import { useAuth } from '../../context/AuthContext';
import { getData,camelCase } from '../../utils/helper';
import { Foundation } from '@expo/vector-icons';
import { BACKEND_URL, photoProfil } from '../../global/helper';
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';




const Murfulaye = ({ navigation, route }) => {
  const [myProfil, setMyProfil] = useState({});
  const [profilData, setProfilData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [offres, setOffres] = useState([]);

  const fromInscription = route?.params?.fromInscription || false;
  const { authState } = useAuth();

  const video = useRef();
  const [statut, setStatus] = useState(true);

  const feedBack = (action, auteur = null, id = null) => {
    if (action === "login") {
      navigation.navigate("Authentification");
    } else if (action === "apercu") {
      // Alert.alert(auteur);
      navigation.navigate("fulayePro", { nom: auteur, id: id });
    }
  }
  const Categorie = [
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      img: require('../assets/logo.png'),
      text: "Métier",
      textId:"metier"
    },
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      text: "Commerce",
      textId:"commerce"
    },
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      text: "Entreprise",
      textId:"entrerise"
    },
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      text: "Service",
      textId:"service"
    },
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      text: "Divertissement",
      textId:"Divertissement"
    },
    {
      icon: <AntDesign name="qrcode" size={34} color="#2B303A" />,
      text: "Resto/Bar",
      textId:"Resto/Bar"
    }
    

  ];
  const fulayeData = [


  ];
  const profilDatas = [
    {
      id: 1,
      auteur: "Jean Robert",
      categorie: "Menusier",
      dt: "01/02/2023",
      lien: "",
      img: require('../assets/Nino.png')
    },
    {
      id: 2,
      auteur: "TDL",
      categorie: "Modeliste",
      dt: "12/11/2022",
      lien: "",
      img: require('../assets/tdl.png')
    },
    {
      id: 3,
      auteur: "Mireille Tonde",
      categorie: "Styliste",
      dt: "01/02/2023",
      lien: "",
      img: require('../assets/Machine.png')
    },


  ];

  const DisplayCategorie = ({item,selectionner}) => {
    return (
      <TouchableOpacity onPress={()=>selectionner(item.textId)} className="items-center justify-center space-y-2 mr-2" >
        <View className=" w-16 h-16 items-center  flex-row justify-center shadow-3xl rounded-full  bg-[#fdfefe]">
          {item.icon}
        </View>
        {/* <Text className="text-sm font-thin text-[#9291e3] flex-wrap w-[80px] text-center">{item.text}</Text>   */}
        <Text className="text-base font-thin  text-[#377a9b] w-fit text-center">{item.text}</Text>
      </TouchableOpacity>
    )
  }
  const fulayeItem = ({ item: { id, titre, prix, dt, img, auteur } }) => {
    return (
      // <FulayerComponent auteur={item.auteur} titre={item.titre} prix={item.prix} dt={"08/09/2023"} img={item.img === "" ? false : item.img} />
      <View className="p-0 w-48 mr-2 h-82  bg-[#DDF0FF] shadow-3xl shadow-slate-300 rounded-xl ">
        <Image className="w-full h-36 rounded-tl-md rounded-tr-md" source={img || require('../assets/car.png')} />
        <View className="px-2 py-3">
          <View className="text-center text-lg pt-2 mb-3">
            <Text className=" font-semibold text-base   text-[#3f3f46]">{titre}</Text>
          </View>
          <View className="text-lg flex flex-row">

            <View className="flex flex-row gap-3">
              <Entypo name="price-tag" size={20} color="#1C77C3" />
              <Text className=" text-[#1C77C3] text-xl">{prix}</Text>
            </View>
          </View>
          <View className="flex flex-row gap-2 text-lg pt-2">
            <EvilIcons name="user" size={24} color="#1C77C3" />
            <Text className="font-bold -top-1 text-[#8490a0]" style={styles.PourvousTitle}>{auteur}</Text>
          </View>
          <View className=" flex-row top-1 space-x-2">
            <View className=" left-2 top-0"><Foundation name="star" size={14} color="#facc15" /></View>
            <Text className=" left-3 text-[#8490a0] ">4,8 198 review</Text>
          </View>
          <View className="flex flex-row gap-2 text-lg pt-2">
            <View>

            </View>
          </View>
          <View>
            <TouchableOpacity className="text-right -top-3 pr-2 mt-4" onPress={() => {
              // navigation.navigate("detailArticle")

              navigation.navigate("detailArticle", {
                id, titre, prix, auteur
              });
            }}>
              <Text className="text-right text-[#377a9b]">Voir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
  const profilItem = ({ item: { img, photo, categorie, auteur, dt, id, isInNetwork } }) => {
    return (
      <ProfilItem img={img} 
      photo={photo} 
      categorie={categorie} 
      auteur={auteur} 
      dt={dt} 
      isInNetwork={isInNetwork} id={id} is feedBack={feedBack} />
    );
  }
  const videoItem = ({ item }) => {
    return (
      //  <WebView  source={{uri:`https://www.youtube.com/watch?v=LGYHEdzSEf4&list=RDLGYHEdzSEf4&start_radio=1`}}  
      //  /> 
      <Video
        ref={video}
        style={{ height: 300, width: 300 }}
        source={{
          uri: 'https://youtu.be/4Srtdtki-f4'
        }}
        useNativeControls
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay


      />
    )
  }

  const getProfil = async () => {
    const id = JSON.parse(authState.token)?.id || null;
    await getData(`profils`, id).then(r => {
      let data = [];
      r?.data?.forEach((d) => {
        data.push({
          id: d.profilId,
          auteur: d.profilNom,
          categorie: d.profilTypeActivite,
          dt: d.profilDateCreation,
          lien: "",
          img: require('../assets/Machine.png'),
          isInNetwork: d.isInNetwork,
          photo: d.photo
        });
        console.log(d);
      });
      setProfilData(data);
      // Alert.alert(""+ data.isInReseau);
      // console.log(data);
    }).catch(r => {
      // console.log("canceled : "+r); 
    }).finally(() => {

    });
  }
  const getMyProfil = async () => {
    let pr = JSON.parse(authState.token)?.id || null;
    if (pr !== null) {
      await getData("myProfil", pr).then(r => {
        setMyProfil(r);
        // console.log("profil ",r); 
        // Alert.alert(`http://192.168.43.117/root/backend-fulaye/imagesProfil/uploads/${myProfil?.photo}`);
      }).catch(err => {
        // console.log(err);
      })
    }
  }
  const loadData = async () => {
    await getProfil();
  }
  const getArticles = async () => {
    await getData("getArticlesByClient&id=" + myProfil.id).then(r => {
    
      setArticles(r.data);
    });
  }
  const getOffres=async()=>{
    await getData("getOffres&id=" + myProfil.id).then(r => {
      setOffres(r.data);
    });
  }
  useEffect(() => {
    // console.log(authState);      
    getProfil();
  }, []);
  useEffect(() => {
    getMyProfil();
    getArticles();
    getOffres();
  }, []);
  const selectionner=(data)=>{
   navigation.navigate("detailCategorie",{categorie:data});
  }
  return (
    <>
      <StatusBar />
      <ScrollView className={`${bgColorPrimary} flex-1`} style={{ backgroundColor: '#FFFFFF', }}>
        <View className=" w-auto h-16 bg-[#facc15]">
          <View className="flex flex-row gap-3 pl-5 w-full mb-2 pt-3">
            <View className="shadow-2xl justify-between">
              <View className=" h-14 w-14 -top-2 bg-black rounded-full">
                {
                  myProfil?.photo !== "" ?
                    <Image
                      source={{ uri: photoProfil + myProfil?.photo }}
                      style={{ width: 56, height: 56 }}
                      className="rounded-full"
                    /> :
                    <Image
                      source={require('../assets/userprofile.png')}
                      // source={{uri:"https://reactnative.dev/img/tiny_logo.png"}} 
                      style={{ width: 56, height: 56 }}
                    />

                }
              </View>
            </View>
            <View className="flex-1 flex flex-col">
              <Text className="text-lg font-bold text-[#4d4e51]">{JSON.parse(authState.token)?.nom || "no user"}</Text>
              <Text className="text-sm text-[#4d4e51]">Commercente</Text>
            </View>
            <View className="flex-row gap-2 space-x-7">
              <TouchableOpacity onPress={() => navigation.navigate("Authentification")} >
                <AntDesign name="user" size={24} color="#2B303A" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("NotificationHome")} >
                <View className=" rounded-full w-8 h-8  border-spacing-9">
                <MaterialCommunityIcons name="account-search" size={30} color="#2B303A" />
                
                </View>
              </TouchableOpacity> 

            </View>
          </View>

        </View>

        {
          fromInscription &&
          <View className="bg-[#39A9DB] shadow-md pl-12 py-2 flex flex-row gap-2">
            <View>
              <FontAwesome5 name="check-circle" size={30} color="#EAC435" />
            </View>
            <View>
              <Text className="text-[#EAC435] text-[13px]">Votre inscription s'est bien faite</Text>
              <Text className="text-[#EAC435] text-[13px]">Veuillez completer vos information
                <TouchableOpacity className="pl-4" onPress={() => navigation.navigate("Editerprofil")}><Text className="text-[#FC2222]">Completer</Text></TouchableOpacity>
              </Text>
            </View>
          </View>
        } 


        <View className="flex-row space-x-14  mt-7  font-bold items-center justify-between  px-3">
          
          {
            Categorie.map((c)=>{
              return(
                // <TouchableOpacity onPress={()=>{
                //   Alert.alert("tes");
                //   navigation.navigate("detailCategorie")
                // }}>
                    <DisplayCategorie item={c} selectionner={selectionner} />
              //  </TouchableOpacity>
              )
            })
          }
        </View>
        <View className="overflow-hidden w-96 h-40 mx-4  top-5 rounded-xl  justify-center items-center">
          <Image
            source={require('../assets/Social.png')}
            style={{ width: 380, height: 155 }}
            className=" rounded-xl"
          />
        </View>
        
        
       
        <Text className=" font-light  text-lg  pt-7 pl-5 text-[#999966] ">Toutes les Ventes / Flash</Text>
        <ScrollView 
          contentContainerStyle={styles.listContent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
           
           <View className="pl-3 flex-row   space-x-2 top-3 justify-center items-center ">
            {
              articles.map((article, i) => {
                return (
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate("detailArticle",
                    {
                      id:article.id,
                      prix:article.prix,
                      titre:article.libelle,
                      auteur:article.nom,
                      img:article.photo,
                      description:article.description,
                      utilisateur:article.utilisateur 
                    });
                  }}>
                  <View className=" w-56  rounded-md  bg-gray-200">
                    <View className=" w-46   bg-gray-200 rounded-md ">
                      <Image
                        // source={require('../assets/sendal.png')}
                        source={{uri:BACKEND_URL+article.photo}}  
                        style={{ width: 222, height: 190 }}
                        className=" rounded"
                      />
                    <View className=" pr-2 space-x-2"> 
                    <Text className=" font-light  text-lg pl-2   text-[#999966]">{camelCase(article.libelle)}</Text>
                    <Text className=" font-light text-base -top-1  text-[#999966]">{parseFloat(article.prix).toFixed(2)} CDF</Text>
                    </View> 
                    <View className=" flex-row pl-2 -top-1">
                    <MaterialIcons name="location-pin" size={14} color="#F1A00A" />
                    <Text className=" font-light  text-xs  text-[#999966] ">Kinshasa </Text>
                    <Text className="font-light  text-xs text-[#999966] ml-6">Produit Promotionel</Text>
                    </View>

                    </View>
                  </View>
                  </TouchableOpacity>
                )
              })
            }

  

          </View>

          
        </ScrollView>

        

        {/* <View className="flex-col space-x-2  px-3 mt-3">

          <FlatList data={fulayeData} renderItem={fulayeItem} horizontal={true} className=" bg-[#FFFFFF] py-3 px-3" />
        </View> */}


        {/* <View className="mx-4">
        <FlatList data={fulayeData} renderItem={videoItem} horizontal={true} className="bg-slate-200 py-3 px-3" />

      </View> */}
        <View className="flex-col space-x-2 px-3 mt-3 pb-4 mb-4">
          <View className="flex flex-row mt-6 justify-between">
            <TouchableOpacity onPress={() => {
              loadData();
            }}>
              <Text className=" font-light  text-lg text-[#999966]  pl-3 ">Activité / Métier </Text>
            </TouchableOpacity>

            <TouchableOpacity TouchableOpacity onPress={() => navigation.navigate("Tout")}>
              <Text className=" text-sm text-black pl-3 mb-2 " style={styles.listTitle}>
                
                <AntDesign name="right" size={12} color="#201335" />
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList data={profilData} renderItem={profilItem} horizontal={true} className="bg-[#FFFFFF] py-3 px-3" />
        </View>

        <View className=" w-96 h-40 mx-4 -top-7 rounded-xl bg-[#f33339] justify-center items-center">
          <Image
            source={require('../assets/food.png')}
            style={{ width: 350, height: 145 }}
          />
        </View>
        <View className="w-96  h-16 -top-4  mx-4">
          <Text className=" text-xs text-[#999966] pt-2 font-thin">MEILLEURS  SERVICES </Text>
          <Text className=" text-lg text-[#999966] pt-0 font-medium">Food / Promo</Text>
          <Text className="w-20 text-[#f2f1f4]  h-10 text-xs font-thin  bg-[#EAC435] text-center  pt-3 rounded-lg mx-60 -top-10">DECOUVRIR</Text>
        </View>
        <Text className=" font-light  text-lg text-[#999966] pt-0 pl-7 ">Soyez curieux et découvrez les multiples offres</Text>
        <ScrollView
          contentContainerStyle={styles.listContent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View className="pl-4 flex-row  space-x-2 top-0 justify-center items-center ">
            {
              offres.map((article, i) => {
                return (
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate("detailOffre",
                    {
                      id:article.id,
                      prix:article.prix,
                      titre:article.titre,
                      localisation:article.localisation,
                      fichier:article.fichier,
                      categorie:article.categorie,
                      periode:article.periode,
                      utilisateur:article.utilisateur 
                    });
                  }}>
                  <View className=" w-56 h-56 rounded-md  ">
                    <View className=" w-46 h-52  rounded-md ">
                      <Image
                        // source={require('../assets/sendal.png')}
                        source={{uri:BACKEND_URL+"imagesOffre/"+article.fichier}}  
                        style={{ width: 223, height: 110 }}
                        className=" rounded"
                      />
                    <View className=" ml-2 mb-1">
                      <Text className=" text-lg font-medium  text-[#999966]">
                      l'offre : {camelCase(article.titre)}
                      </Text>
                      <Text className="  text-xl text-[#999966] justify-center items-center">{article.categorie}</Text>
                      <Text className="  text-sm text-[#999966] font-thin">{article.periode} Participation:</Text>
                       <Text className=" text-sm  font-thin -top-0  text-[#999966]">{parseFloat(article.prix).toFixed(2)} CDF</Text>
                       <Text className=" font-light  text-[#999966]">Vérifiez les conditions  </Text>
                    </View>
                    
                    <View className=" h-6 w-40 left-3  pl-3 pr-1 pt-1 rounded-lg ">
                      
                    {/* <Text className=" text-xs  text-[#ff9900]  font-thin">Acheter maintenant</Text> */}
                    </View>
                   
                    
                    </View>
                  </View>
                  </TouchableOpacity>
                )
              })
            }

            {/* <View className=" w-36 h-36 rounded-md bg-white">
              <View className=" w-36 h-24 bg-white rounded-md ">
                <Image
                  source={require('../assets/basket.png')}
                  style={{ width: 144, height: 99 }}
                />
              </View>
              <Text className=" text-center pt-1 text-sm font-medium  text-slate-500">Basket homme</Text>
              <Text className=" text-center mx-10 font-medium text-sm  text-slate-500"> 39,90€ </Text>
            </View>

            <View className=" w-36 h-36 rounded-md bg-white">
              <View className=" w-36 h-24 bg-white rounded-md ">
                <Image
                  source={require('../assets/jordan.png')}
                  style={{ width: 144, height: 99 }}
                />
              </View>
              <Text className=" text-center pt-1 text-sm font-medium  text-slate-500">Baskets Jordan</Text>
              <Text className=" text-center mx-10 font-medium text-sm  text-slate-500">30.000FC</Text>
            </View>

            <View className=" w-36 h-36 rounded-md bg-white">
              <View className=" w-36 h-24 bg-white rounded-md ">
                <Image
                  source={require('../assets/sendal.png')}
                  style={{ width: 144, height: 99 }}
                />
              </View>
              <Text className=" text-center pt-1 text-sm font-medium  text-slate-500">Sandales Homme</Text>
              <Text className=" text-center mx-10 font-medium text-sm  text-slate-500">30.000FC</Text>
            </View> */}

          </View>
        </ScrollView>

      
        
        <View className="96 h-48 bg-[#facc15] top-4">
        <Image
            source={require('../assets/4.png')}
            style={{ width: 409, height: 175 }}
          />
        </View>
      </ScrollView>
      {/* <FloatingAction
      onPress={()=>{
        Alert.alert("jjj")
      }}
      onPressItem={name => {
      console.log(`selected button: ${name}`);
      }}
    /> */}
      <View className=" w-14 h-14  rounded-xl absolute  bottom-14 bg-[#facc15] right-4 shadow-2xl shadow-black flex items-center justify-center">
        <AntDesign onPress={() => {
          navigation.navigate("ScannerEts")
        }} name="qrcode" size={30} color="#2B303A" />
      </View>
    </>
  )
}

export default Murfulaye

const styles = StyleSheet.create({

  listTitle: {
    fontSize: 18,
    fontWeight: '450',
    color: '#2B303A',


  },
  fond: {
    paddingTop: 30

  },
  PourvousTitle: {
    fontSize: 18,
    fontWeight: '100',
    lineHeight: 22,
    color: '#8490a0',
    right: 3,
    top: 3

  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#fc2222',
    textAlign: 'center',
    color: '#fc2222'
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    backgroundColor: '#f4405b',
    borderColor: '#f4405b',
    textAlign: 'center',
    color: '#f8fafc',
    paddingLeft: 5
  },
  list: {
    marginTop: 30,
    marginHorizontal: -10,
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

})