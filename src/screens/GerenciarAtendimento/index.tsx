import {
  DrawerActionHelpers,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { CustomHeader } from "../../components/CustomHeader";
import { styles } from "./styles";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { api } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardGerenciamento2 } from "../../components/CardGerenciamento2";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [atendimentosFiltrados, setAtendimentosFiltrados] = useState<
    Atendimento[]
  >([] as Atendimento[]);

  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState<string>("");

  const getAtendimentos = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/atendimento");
    setAtendimentos(res.data.atendimentos);
  };

  const deleteAtendimento = async (deleteId: number) => {
    try {
      api.defaults.headers.common.Authorization = user.token;
      await api.delete(`/atendimento/delete/${deleteId}`);
      getAtendimentos();
    } catch (e: any) {
      Alert.alert(e.response.data.error);
    }
  };

  const editAtendimento = async (editedId: number) => {
    navigation.navigate("EditAtendimento", { editedId: editedId });
  };

  const filtrar = () => {
    const filtrados: Atendimento[] = [];
    atendimentos.forEach((atendimento) => {
      if (
        atendimento.descricao
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        atendimento.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        atendimento.responsavel
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        atendimento.tipo.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filtrados.push(atendimento);
      }
    });
    setAtendimentosFiltrados(filtrados);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAtendimentos();
    });
  }, [navigation]);

  useEffect(() => {
    filtrar();
  }, [searchText]);

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
      <CustomHeader
        toggleDrawer={drawer.toggleDrawer}
        onChangeText={(text) => {
          setSearchText(text);
        }}
      />
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
            onPress={() => {
              navigation.navigate("GerenciarResponsaveis");
            }}
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
            onPress={() => {
              navigation.navigate("GerenciarPets");
            }}
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
            onPress={() => {
              navigation.navigate("CadastrarAtendimento");
            }}
            size={16}
            text="Cadastrar"
            textColor={defaultTheme.COLORS.white}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.scrollStyle}
          data={
            atendimentosFiltrados.length > 0
              ? atendimentosFiltrados
              : atendimentos
          }
          renderItem={({ item }) => {
            return (
              <CardGerenciamento2
                id={item.id}
                imagem={item.imagem}
                nome={item.nome}
                key={Math.random()}
                deleteFunc={deleteAtendimento}
                editFunc={() => editAtendimento(item.id)}
              >
                <Text
                  style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                >
                  {item.tipo}
                </Text>
                <Text
                  style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                >
                  {item.responsavel}
                </Text>
              </CardGerenciamento2>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
