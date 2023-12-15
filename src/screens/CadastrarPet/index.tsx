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
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { InputTelefone } from "../../components/InputTelefone";

type EnderecoCoord = {
  latitude: number;
  longitude: number;
};

export const CadastrarPet = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [nome, setNome] = useState<string>("");
  const [tutor, setTutor] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [locationAccess, setLocationAccess] = useState(false);
  const [markerLocation, setMarkerLocation] = useState<EnderecoCoord>();

  const [enderecoAtual, setEnderecoAtual] = useState<EnderecoCoord | null>(
    null
  );

  const [showForm, setShowForm] = useState(true);

  const [image, setImage] = useState<string>();

  const [userHasImage, setUserHasImage] = useState<boolean>(false);

  const [newImage, setNewImage] = useState<string>("");

  const sendForm = async () => {
    if (nome.length <= 0) {
      Alert.alert("Digite o nome do pet");
      return;
    } else if (tutor.length <= 0) {
      Alert.alert("Digite o nome do tutor");
      return;
    } else if (telefone.length != 15) {
      Alert.alert("Digite um telefone válido");
      return;
    } else if (!markerLocation) {
      Alert.alert("Escolha o endereço no mapa");
      return;
    }
    try {
      const form = new FormData();

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
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

      await api.post("/pet/create", form, config);
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

  useEffect(() => {
    getEnderecoAtual();
  }, [locationAccess]);

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
            onPress={() => {
              setShowForm(true);
            }}
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
            onPress={() => {
              setShowForm(false);
            }}
            size={16}
            text="Endereco"
            textColor={defaultTheme.COLORS.white}
          />
        </View>

        <ScrollView contentContainerStyle={styles.formPerfil}>
          {showForm ? (
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
              <InputTelefone
                label="Telefone"
                value={telefone}
                onChangeText={(text: string) => setTelefone(text)}
                placeholder="Telefone"
                size={16}
              />
            </>
          ) : (
            <View style={styles.mapContainer}>
              {enderecoAtual ? (
                <MapView
                  zoomControlEnabled
                  style={styles.mapContainer}
                  initialRegion={{
                    latitude: enderecoAtual.latitude,
                    longitude: enderecoAtual.longitude,
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
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
            </View>
          )}

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
