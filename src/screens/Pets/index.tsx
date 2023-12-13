import { FlatList, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import {
  DrawerActionHelpers,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CustomHeader } from "../../components/CustomHeader";
import { api } from "../../api/api";
import { CardAtendimento } from "../../components/CardAtendimento";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardEnditade } from "../../components/CardEntidade";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBold } from "../../components/TextBold";

interface Entity {
  nome: string;
  imagem: string;
  tutor: string;
  telefone: string;
  endereco: string;
  id: number;
  children: ReactNode;
}

export const Pets = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

  const { user, validToken, logout } = useContext(AuthContext);

  const [pets, setPets] = useState<Entity[]>([] as Entity[]);
  const [petsFiltrados, setPetsFiltados] = useState<Entity[]>([] as Entity[]);
  const [searchText, setSearchText] = useState<string>("");
  const getPets = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/pet");
    setPets(res.data.pets);
  };

  const navigateLogout = () => {
    logout();
    navigation.navigate("Login");
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
  useEffect(() => {
    if (!validToken) {
      navigateLogout();
    }
  });

  useEffect(() => {
    getPets();
  }, []);

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
          <Icon name="home" color={"black"} size={30} />
          <Text style={styles.pageTitleText}>Página inicial</Text>
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
              navigation.navigate("Home");
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
              navigation.navigate("Responsaveis");
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
            iconColor={defaultTheme.COLORS.gray}
            iconName="paw"
            onPress={() => {}}
            size={16}
            text="Pets"
            textColor={defaultTheme.COLORS.gray}
          />
        </ScrollView>
        <FlatList
          contentContainerStyle={styles.scrollStyle}
          data={petsFiltrados.length > 0 ? petsFiltrados : pets}
          renderItem={({ item }) => {
            return (
              <CardEnditade
                id={item.id}
                imagem={item.imagem}
                nome={item.nome}
                key={item.id}
              >
                <Text><TextBold text="Tutor: "/>{item.tutor}</Text>
                <Text><TextBold text="Telefone: "/>{item.telefone}</Text>
                <Text><TextBold text="Endereço: "/>{item.endereco}</Text>
              </CardEnditade>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
