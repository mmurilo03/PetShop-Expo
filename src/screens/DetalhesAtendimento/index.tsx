import { useContext, useEffect, useState } from "react";
import {
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
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextBold } from "../../components/TextBold";
import { CardAtendimento } from "../../components/CardAtendimento";

type EnderecoCoord = {
  latitude: number;
  longitude: number;
};

interface Atendimento {
  tipo: string;
  descricao: string;
  data: string;
  pet: string;
  responsavel: string;
  imagem: string;
  status: number;
  id: number;
  petId: number
}

interface AtendimentoProps {
  id: number
}

export const DetalhesAtendimento = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [atendimentoId, setAtendimentoId] = useState<number>();
  const [descricao, setDescricao] = useState<string>("");
  const route = useRoute();

  const loadAtendimento = async () => {
    if (
      !(route.params && "id" in route.params)
    ) {
      return;
    }

    api.defaults.headers.common.Authorization = user.token;

    const atendimentoTemp: AtendimentoProps = {
      id: route.params.id as number,
    };
    setAtendimentoId(atendimentoTemp.id)
    const res = await api.get(`/atendimento/${route.params.id}`);
    setDescricao(res.data.atendimento.descricao);
  };

  useEffect(() => {
    loadAtendimento();
  }, []);

  return (
    <>
      <View style={styles.header}></View>
      <View style={styles.goBackButton}>
        <ButtonIcon
          iconColor={defaultTheme.COLORS.black}
          iconName="arrow-left"
          onPress={() => {
            navigation.navigate("Home");
          }}
          size={50}
        />
      </View>
    <View style={styles.container}>
      {atendimentoId && <>
        <CardAtendimento
          id={atendimentoId}
        />
        
        <Text style={styles.descricao}>
        <TextBold text="Descrição: "/>
          {descricao}</Text>
      </>}
      
    </View>
    </>
  );
};
