import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { api } from "../../api/api";
import { styles } from "./styles";
import { TextBold } from "../TextBold";
import { AuthContext } from "../../context/AuthContext";

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

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.entityImg}
          source={
            entityHasImage
              ? { uri: image }
              : require("../../images/abstract-user-icon-3.png")
          }
        />
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
    </View>
  );
};
