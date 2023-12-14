import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { api } from "../../api/api";
import { styles } from "./styles";
import { TextBold } from "../TextBold";
import { AuthContext } from "../../context/AuthContext";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { Loading } from "../Loading";

interface Entity {
  nome: string;
  imagem: string;
  id: number;
  endereco: string;
  children: ReactNode;
}

export const CardPet = ({ id, nome, imagem, endereco, children }: Entity) => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<string>();
  const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
  const [enderecoCard, setEnderecoCard] = useState("");
  const [loading, setLoading] = useState(true);

  const getImage = async () => {
    try {
      await api.get(`images/${imagem}`);
      setEntityHasImage(true);
    } catch (e) {
      setEntityHasImage(false);
    }

    if (entityHasImage) {
      try {
        const image = api.getUri({ url: `images/${imagem}` });
        setImage(image);
        return image;
      } catch (error) {}
    } else {
      setImage("../../images/abstract-user-icon-3.png")
      setLoading(false)
    }
  };

  const getAddress = async (latitude: string, longitude: string) => {
    const lat = latitude;
    const lng = longitude;
    try {
      api.defaults.headers.common.Authorization = user.token;

      const end = await api.post("/pet/endereco", { lat: lat, lng: lng });
      setEnderecoCard(end.data.address);
    } catch (error) {
      setEnderecoCard("Endereço inválido");
    }
  };

  useEffect(() => {
    getImage();
    getAddress(endereco.split("|")[0], endereco.split("|")[1]);
  });

  if (loading) {
    return (<Loading styles={{width: styles.container.width, height: styles.container.minHeight}}/>)
  }

  return (
    <Animated.View style={styles.container} entering={SlideInLeft.duration(1000)}>
      <View style={styles.imgContainer}>
        {image ? 
        <Image
          style={styles.entityImg}
          source={
            entityHasImage
              ? { uri: image }
              : require("../../images/abstract-user-icon-3.png")
          }
        /> : <Loading styles={{width: styles.imgContainer.height, height: styles.imgContainer.height}}/>
        }
      </View>
      <View style={styles.entityName}>
        <View style={styles.entityContentTitle}>
          <Text style={styles.cardText}>{nome}</Text>
        </View>
        <View style={styles.entityContent}>
          {children}
          <Text>
            <TextBold text="Endereço: " />
            {enderecoCard}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
