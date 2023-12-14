import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { api } from "../../api/api";
import { styles } from "./styles";
import { defaultTheme } from "../../global/styles/themes";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ButtonIcon } from "../ButtonIcon";
import { ButtonTextIcon } from "../ButtonTextIcon";
import { AuthContext } from "../../context/AuthContext";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { Loading } from "../Loading";

interface Atendimento {
  id: number;
  tipoAtendimento: string;
  descricao: string;
  date: string;
  responsavel: string;
  pet: string;
  complete: number;
  imagem: string;
  petId: number;
}


interface AtendimentoProps {
  id: number;
}

export const CardAtendimento = ({
  id
}: AtendimentoProps) => {
  const { user } = useContext(AuthContext);
  const [dataAtendimento, setDataAtendimento] = useState<string[]>(
    [] as string[]
  );
  const [loading, setLoading] = useState(true);
  const [atendimento, setAtendimento] = useState<Atendimento>();
  const [horaAtendimento, setHoraAtendimento] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [image, setImage] = useState<string>();
  const [imageName, setImageName] = useState<string>();
  const [petHasImage, setPetHasImage] = useState<boolean>(false);

  const getPetImage = async () => {
    try {
      api.defaults.headers.common.Authorization = user.token;
      const petTemp = await api.get(`pet/${atendimento!.petId}`);
      
      setImageName(petTemp.data.pet.imagem);
      setPetHasImage(true);      
    } catch (e) {      
      setPetHasImage(false);
    }

    if (petHasImage) {
      try {
        await api.get(`images/${imageName}`);
      } catch (e) {
      }
    }

    if (petHasImage) {
      try {
        const image = api.getUri({ url: `images/${imageName}` });
        setImage(image);
        return image;
      } catch (error) {}
    }
  };

  const getAtendimento = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get(`/atendimento/${id}`);
    setAtendimento(res.data.atendimento);
    setLoading(false);
  };

  useEffect(() => {
    getAtendimento()
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      let tempData = atendimento!.date.split("T")[0].split("-");
      setHoraAtendimento(atendimento!.date.split("T")[1]);
      setDataAtendimento([tempData[2], tempData[1], tempData[0]]);
    }
  }, [loading]);
  
  useEffect(() => {
    if (!loading) {
      getPetImage();
    }
  });

  if (loading) {
    return (<Loading styles={{width: styles.container.width, height: styles.container.minHeight}}/>)
  }

  return (
    <Animated.View style={styles.container} entering={SlideInLeft.duration(1000)}>
      <View style={styles.imgContainer}>
        {image ? <Image
          style={styles.atendimentoImg}
          source={
            petHasImage
              ? { uri: image }
              : require("../../images/kisspng-cat-computer-icons-user-profile-5ae8658e7a9b63.4256720315251797905022.png")
          }
        /> : <Loading styles={{width: styles.atendimentoImg.width, height: styles.atendimentoImg.height}}/>}
        
      </View>
      <View style={styles.atendimentoName}>
        <View style={styles.atendimentoNameContent}>
          <Icon name="paw" size={16} />
          <Text style={styles.cardText}>{atendimento!.pet}</Text>
        </View>
        <View style={styles.atendimentoNameContent}>
          <ButtonTextIcon
            iconColor={defaultTheme.COLORS.white}
            iconName="map-marker-alt"
            onPress={() => navigation.navigate("DetalhesPet", { petId: atendimento!.petId })}
            size={16}
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            text="Endereço"
            textColor={defaultTheme.COLORS.white}
            width={0.3}
          />
        </View>
      </View>
      <View style={styles.atendimentoType}>
        <Text style={styles.atendimentoTypeText}>
          <Icon name="dog" size={16}>
            {" "}
          </Icon>
          {atendimento!.tipoAtendimento}
        </Text>
        <Text style={styles.atendimentoTypeText}>
          <Icon name="user-md" size={16}>
            {" "}
          </Icon>
          {atendimento!.responsavel}
        </Text>
        <Text style={styles.atendimentoTypeText}>
          <Icon name="calendar" size={16}>
            {" "}
          </Icon>
          {`${dataAtendimento[0]}/${dataAtendimento[1]}/${dataAtendimento[2]}`}
        </Text>
        <Text style={styles.atendimentoTypeText}>
          <Icon name="clock" size={16}>
            {" "}
          </Icon>
          {horaAtendimento}
        </Text>
        <ButtonTextIcon
          color={
            atendimento!.complete == 0
              ? defaultTheme.COLORS.redSecond
              : defaultTheme.COLORS.blueSecond
          }
          fontSize={16}
          height={0.05}
          iconColor={defaultTheme.COLORS.white}
          iconName={atendimento!.complete == 0 ? "hourglass" : "check"}
          size={16}
          text={atendimento!.complete == 0 ? "Pendente" : "Concluido"}
          textColor={defaultTheme.COLORS.white}
          width={0.3}
          onPress={() => {
            api.defaults.headers.common.Authorization = user.token;
            api.post("/atendimento/complete", { id: id });
            setLoading(true)
          }}
        />
      </View>
    </Animated.View>
  );
};
