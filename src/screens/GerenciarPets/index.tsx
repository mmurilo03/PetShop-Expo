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
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CardGerenciamento } from "../../components/CardGerenciamento";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardGerenciamento2 } from "../../components/CardGerenciamento2";
import { SafeAreaView } from "react-native-safe-area-context";

interface Entity {
  nome: string;
  imagem: string;
  tutor: string;
  id: number;
  telefone: string;
  children: ReactNode;
}

export const GerenciarPets = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

  const [pets, setPets] = useState<Entity[]>([] as Entity[]);

  const [petsFiltrados, setPetsFiltados] = useState<Entity[]>([] as Entity[]);

  const { user } = useContext(AuthContext);

  const [searchText, setSearchText] = useState<string>("");
  const getPets = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/pet");
    setPets(res.data.pets);
  };

  const filtrar = () => {
    const filtrados: Entity[] = [];
    pets.forEach((pet) => {
      if (
        pet.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.tutor.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.telefone.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filtrados.push(pet);
      }
    });
    setPetsFiltados(filtrados);
  };

  const deletePet = async (deleteId: number) => {
    try {
      api.defaults.headers.common.Authorization = user.token;
      await api.delete(`/pet/delete/${deleteId}`);
      getPets();
    } catch (e: any) {
      Alert.alert(e.response.data.error);
    }
  };

  const editPet = async (editedId: number) => {
    navigation.navigate("EditPet", { editedId: editedId });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getPets();
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
            color={defaultTheme.COLORS.gray}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.black}
            iconName="list-ul"
            onPress={() => {
              navigation.navigate("GerenciarAtendimento");
            }}
            size={16}
            text="Atendimentos"
            textColor={defaultTheme.COLORS.black}
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
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.white}
            iconName="paw"
            onPress={() => {}}
            size={16}
            text="Pets"
            textColor={defaultTheme.COLORS.white}
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
              navigation.navigate("CadastrarPet");
            }}
            size={16}
            text="Cadastrar"
            textColor={defaultTheme.COLORS.white}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.scrollStyle}
          data={petsFiltrados.length > 0 ? petsFiltrados : pets}
          renderItem={({ item }) => {
            return (
              <CardGerenciamento2
                id={item.id}
                imagem={item.imagem}
                nome={item.nome}
                key={item.id}
                deleteFunc={deletePet}
                editFunc={() => {
                  editPet(item.id);
                }}
              >
                <Text
                  style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                >
                  {item.tutor}
                </Text>
              </CardGerenciamento2>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
