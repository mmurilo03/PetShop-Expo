import {
  DrawerActionHelpers,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { CustomHeader } from "../../components/CustomHeader";
import { styles } from "./styles";
import { ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { api } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CardGerenciamento } from "../../components/CardGerenciamento";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Atendimento {
  id: number;
  tipo: string;
  descricao: string;
  data: string;
  responsavel: string;
  nome: string;
  status: number;
  endereco: string;
  imagem: string;
}

export const GerenciarAtendimento = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>(
    [] as Atendimento[]
  );

  const { user } = useContext(AuthContext);

  const getAtendimentos = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/atendimento");
    setAtendimentos(res.data.atendimentos);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAtendimentos();
    })
  }, [navigation]);

  return (
    <>
      <CustomHeader toggleDrawer={drawer.toggleDrawer} search={() => {}} />
      <View style={styles.container}>
        <View style={styles.pageTitle}>
          <Ionicons
            style={{ transform: [{ rotate: "-90deg" }] }}
            name="options-outline"
            color={"black"}
            size={25}
          />
          <Text style={styles.pageTitleText}>Gerenciar</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalButtons}
          horizontal={true}
        >
          <ButtonTextIcon
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.white}
            iconName="list-ul"
            onPress={() => {}}
            size={16}
            text="Atendimentos"
            textColor={defaultTheme.COLORS.white}
          />
          <ButtonTextIcon
            color={defaultTheme.COLORS.gray}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.black}
            iconName="briefcase-medical"
            onPress={() => {navigation.navigate("GerenciarResponsaveis")}}
            size={16}
            text="Responsaveis"
            textColor={defaultTheme.COLORS.black}
          />
          <ButtonTextIcon
            color={defaultTheme.COLORS.gray}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.black}
            iconName="paw"
            onPress={() => {navigation.navigate("GerenciarPets")}}
            size={16}
            text="Pets"
            textColor={defaultTheme.COLORS.black}
          />
        </ScrollView>
        <View style={styles.mainButton}>
          <ButtonTextIcon
            color={defaultTheme.COLORS.blueSecond}
            fontSize={16}
            height={0.05}
            width={0.5}
            iconColor={defaultTheme.COLORS.white}
            iconName="plus"
            onPress={() => {}}
            size={16}
            text="Cadastrar"
            textColor={defaultTheme.COLORS.white}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollStyle}>
          {atendimentos.length > 0 ? (
            atendimentos.map((atendimento) => {
              return (
                <CardGerenciamento
                  id={atendimento.id}
                  imagem={atendimento.imagem}
                  nome={atendimento.nome}
                  key={atendimento.id}
                >
                  <Text
                    style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                  >
                    {atendimento.tipo}
                  </Text>
                  <Text
                    style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                  >
                    {atendimento.responsavel}
                  </Text>
                </CardGerenciamento>
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </>
  );
};
