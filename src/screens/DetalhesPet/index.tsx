import { useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Input } from "../../components/Input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { TextBold } from "../../components/TextBold";
import { LoadingScreen } from "../../components/LoadingScreen";

type EnderecoCoord = {
  latitude: number;
  longitude: number;
};

interface Pet {
  id: number;
  nome: string;
  tutor: string;
  telefone: string;
  endereco: string;
  imagem: string;
}

export const DetalhesPet = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [pet, setPet] = useState<Pet>();
  const [markerLocation, setMarkerLocation] = useState<EnderecoCoord>();
  const route = useRoute();

  const [image, setImage] = useState<string>();

  const [userHasImage, setUserHasImage] = useState<boolean>(false);

  const [loadingPet, setLoadingPet] = useState(true);

  const loadPet = async () => {
    if (!(route.params && "petId" in route.params)) {
      return;
    }
    api.defaults.headers.common.Authorization = user.token;

    const res = await api.get(`/pet/${route.params.petId}`);
    setPet(res.data.pet);
    setLoadingPet(false);
  };

  const loadImage = async () => {
    if (pet) {
      try {
        await api.get(`images/${pet.imagem}`);
        setUserHasImage(true);
      } catch (e) {
        setUserHasImage(false);
      }
    }
  };

  useEffect(() => {
    loadImage();
    loadPet();
    if (pet) {
      const image = api.getUri({ url: `images/${pet.imagem}` });
      setImage(image);
      setMarkerLocation({
        latitude: parseFloat(pet.endereco.split("|")[0]),
        longitude: parseFloat(pet.endereco.split("|")[1]),
      });
    }
  }, [loadingPet, userHasImage]);

  if (loadingPet) {
    return <LoadingScreen />;
  }

  return (
    <>
        <View style={styles.header}></View>
        <View style={styles.goBackButton}>
          <ButtonIcon
            iconColor={defaultTheme.COLORS.black}
            iconName="arrow-left"
            onPress={() => {
              navigation.navigate("Pets");
            }}
            size={50}
          />
        </View>
      <ScrollView contentContainerStyle={styles.formPerfil}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            {markerLocation ? (
              <MapView
                zoomControlEnabled
                style={styles.mapContainer}
                initialRegion={{
                  latitude: markerLocation.latitude,
                  longitude: markerLocation.longitude,
                  latitudeDelta: 0.007,
                  longitudeDelta: 0.007,
                }}
                showsUserLocation
                showsMyLocationButton
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
            </View>
          </View>
          <Text><TextBold text="Nome: "/>{pet ? pet.nome : ""}</Text>
          <Text><TextBold text="Tutor: "/>{pet ? pet.tutor : ""}</Text>
          <Text><TextBold text="Telefone: "/>{pet ? pet.telefone : ""}</Text>
        </View>
      </ScrollView>
    </>
  );
};
