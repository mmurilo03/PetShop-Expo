import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { Starting } from "../Starting";

type EnderecoCoord = {
  latitude: number;
  longitude: number;
};

interface Pet {
  id: number
  nome: string
  tutor: string
  telefone: string
  endereco: string
  imagem: string
}

export const EditPet = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [editedPet, setEditedPet] = useState<Pet>();

  const [nome, setNome] = useState<string>("");
  const [tutor, setTutor] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [locationAccess, setLocationAccess] = useState(false);
  const [markerLocation, setMarkerLocation] = useState<EnderecoCoord>();
  const route = useRoute();

  const [enderecoAtual, setEnderecoAtual] = useState<EnderecoCoord | null>(
    null
  );

  const [showForm, setShowForm] = useState(true);

  const [image, setImage] = useState<string>();

  const [userHasImage, setUserHasImage] = useState<boolean>(false);

  const [newImage, setNewImage] = useState<string>("");
  const [loadingPet, setLoadingPet] = useState(true);

  const sendForm = async () => {
    if (nome.length <= 0) {
      Alert.alert("Digite o nome do pet");
      return;
    } else if (tutor.length <= 0) {
      Alert.alert("Digite o nome do tutor");
      return;
    } else if (telefone.length <= 0) {
      Alert.alert("Digite um telefone");
      return;
    } else if (!markerLocation) {
      Alert.alert("Escolha o endereço no mapa");
      return;
    } else if (!(route.params && "editedId" in route.params)) {
      return
    }
    try {
      const form = new FormData();

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      form.append("id", `${route.params.editedId}`)
      form.append("nome", nome);
      form.append("tutor", tutor);
      form.append("telefone", telefone);
      form.append(
        "endereco",
        `${markerLocation.latitude}|${markerLocation.longitude}`
      );
      form.append("image", {
        name: newImage.split("/").pop()?.split("_").pop(),
        uri: newImage,
        type: "image/png",
      } as any);      
      api.defaults.headers.common.Authorization = user.token;
      
      await api.patch("/pet/edit", form, config);
      navigation.navigate("GerenciarPets");
    } catch (e: any) {      
      Alert.alert(e.response.data.error);
    }
  };

  const onButtonPress = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (result.assets) {
        saveImage(result.assets[0].uri);
      }
    } catch (e) {}
  };

  const saveImage = (image: string) => {
    setNewImage(image);
    setImage(image);
    setUserHasImage(true);
  };

  async function getEnderecoAtual() {
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("O aplicativo precisa da sua localização.");
      return;
    }
    setLocationAccess(true);
    let location = await ExpoLocation.getCurrentPositionAsync();
    setEnderecoAtual(location.coords);
  }

  const loadPet = async() => {
    if (!(route.params && "editedId" in route.params)) {
      return
    }
    api.defaults.headers.common.Authorization = user.token;
    
    const res = await api.get(`/pet/${route.params.editedId}`);
    setEditedPet(res.data.pet);    
    setLoadingPet(false);
  }

  const loadImage = async () => {
    if (editedPet) {
      try {
        await api.get(`images/${editedPet.imagem}`);
        setUserHasImage(true);
      } catch (e) {
        setUserHasImage(false);
      }
    }
  }

  useEffect(() => {
    loadImage()
    getEnderecoAtual();
    loadPet();
    if (editedPet) {
      setNome(editedPet.nome)
      setTutor(editedPet.tutor)
      setTelefone(editedPet.telefone)
      const image = api.getUri({ url: `images/${editedPet.imagem}`})
      setImage(image);
      setNewImage(image);
      setMarkerLocation({latitude: parseFloat(editedPet.endereco.split("|")[0]), longitude:parseFloat(editedPet.endereco.split("|")[1])})
    }
  }, [locationAccess, loadingPet, userHasImage]);

  if (loadingPet) {
    return (<Starting />)
  }

  return (
    <>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.header}></View>
        <View style={styles.goBackButton}>
          <ButtonIcon
            iconColor={defaultTheme.COLORS.black}
            iconName="arrow-left"
            onPress={() => {
              navigation.navigate("GerenciarPets");
            }}
            size={50}
          />
        </View>
        <View style={styles.headerButtonsContainer}>
          <ButtonTextIcon
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            width={0.3}
            iconColor={defaultTheme.COLORS.white}
            iconName="clipboard-list"
            onPress={() => {setShowForm(true)}}
            size={16}
            text="Formulário"
            textColor={defaultTheme.COLORS.white}
          />
          <ButtonTextIcon
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            width={0.3}
            iconColor={defaultTheme.COLORS.white}
            iconName="map-marked-alt"
            onPress={() => {setShowForm(false)}}
            size={16}
            text="Endereco"
            textColor={defaultTheme.COLORS.white}
          />
        </View>
        
        <ScrollView contentContainerStyle={styles.formPerfil}>
          {showForm ? 
          <>
          <View style={styles.imageContainer}>
          <View>
            <Image
              style={styles.image}
              source={
                userHasImage
                  ? { uri: image }
                  : require("../../images/kisspng-cat-computer-icons-user-profile-5ae8658e7a9b63.4256720315251797905022.png")
              }
            />
            <View style={styles.iconCam}>
              <ButtonIcon
                iconColor={defaultTheme.COLORS.black}
                iconName="camera"
                onPress={onButtonPress}
                size={30}
              />
            </View>
          </View>
        </View>
          <Input
            label="Nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
            placeholder="Nome"
            size={16}
          />
          <Input
            label="Tutor"
            value={tutor}
            onChangeText={(text) => setTutor(text)}
            placeholder="Tutor"
            size={16}
          />
          <Input
            label="Telefone"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            placeholder="Telefone"
            size={16}
          /></>
        : 
        <View style={styles.mapContainer}>
          {enderecoAtual ? (
            <MapView
              style={styles.mapContainer}
              initialRegion={{
                latitude: enderecoAtual.latitude,
                longitude: enderecoAtual.longitude,
                latitudeDelta: 10,
                longitudeDelta: 10,
              }}
              showsUserLocation
              showsMyLocationButton
              onPress={(mapLocation: MapPressEvent) => {
                const marker: EnderecoCoord = {
                  latitude: mapLocation.nativeEvent.coordinate.latitude,
                  longitude: mapLocation.nativeEvent.coordinate.longitude,
                };
                setMarkerLocation(marker);
              }}
            >
              {markerLocation && (
                <Marker
                  coordinate={{
                    latitude: markerLocation.latitude,
                    longitude: markerLocation.longitude,
                  }}
                />
              )}
            </MapView>
          ) : (
            <></>
          )}
        </View>}
          
          <Button
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.06}
            width={0.3}
            onPress={async () => await sendForm()}
            text="Salvar"
            textColor={defaultTheme.COLORS.white}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
