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
import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardEnditade } from "../../components/CardEntidade";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBold } from "../../components/TextBold";
import { LoadingScreen } from "../../components/LoadingScreen";

interface Entity {
  nome: string;
  imagem: string;
  email: string;
  funcao: string;
  id: number;
  telefone: string;
  children: ReactNode;
}

export const Responsaveis = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

  const { user, validToken, logout } = useContext(AuthContext);

  const [responsaveis, setResponsaveis] = useState<Entity[]>([] as Entity[]);
  const [responsaveisFiltrados, setResponsaveisFiltrados] = useState<Entity[]>(
    [] as Entity[]
  );
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getResponsaveis = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/responsavel");
    setResponsaveis(res.data.responsaveis);
    setLoading(false)
  };

  const navigateLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  const filtrar = () => {
    const filtrados: Entity[] = [];
    responsaveis.forEach((responsavel) => {
      if (
        responsavel.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        responsavel.email.toLowerCase().includes(searchText.toLowerCase()) ||
        responsavel.funcao.toLowerCase().includes(searchText.toLowerCase()) ||
        responsavel.telefone.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filtrados.push(responsavel);
      }
    });
    setResponsaveisFiltrados(filtrados);
  };
  useEffect(() => {
    if (!validToken) {
      navigateLogout();
    }
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      getResponsaveis();      
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setLoading(true)      
    });
  }, [navigation]);

  useEffect(() => {
    filtrar();
  }, [searchText]);

  if (loading) {
    return (<LoadingScreen />)
  }

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
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.white}
            iconName="briefcase-medical"
            onPress={() => {}}
            size={16}
            text="Responsaveis"
            textColor={defaultTheme.COLORS.white}
          />
          <ButtonTextIcon
            color={defaultTheme.COLORS.gray}
            fontSize={16}
            height={0.04}
            width={0.35}
            iconColor={defaultTheme.COLORS.black}
            iconName="paw"
            onPress={() => {
              navigation.navigate("Pets");
            }}
            size={16}
            text="Pets"
            textColor={defaultTheme.COLORS.black}
          />
        </ScrollView>
        <FlatList
          contentContainerStyle={styles.scrollStyle}
          data={searchText.length > 0 ? responsaveisFiltrados : responsaveis}
          renderItem={({ item }) => {
            return (
              <CardEnditade
                id={item.id}
                imagem={item.imagem}
                nome={item.nome}
                key={Math.random()}
              >
                <Text><TextBold text="Email: "/>{item.email}</Text>
                <Text><TextBold text="Função: "/>{item.funcao}</Text>
                <Text><TextBold text="Telefone: "/>{item.telefone}</Text>
              </CardEnditade>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
