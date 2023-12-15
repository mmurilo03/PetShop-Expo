import { FlatList, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import {
  DrawerActionHelpers,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CustomHeader } from "../../components/CustomHeader";
import { api } from "../../api/api";
import { CardAtendimento } from "../../components/CardAtendimento";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../components/Button";

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
  complete: number;
  petId: number;
}

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

  const { user, validToken, logout } = useContext(AuthContext);

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>(
    [] as Atendimento[]
  );
  const [atendimentosFiltrados, setAtendimentosFiltrados] = useState<
    Atendimento[]
  >([] as Atendimento[]);
  const [searchText, setSearchText] = useState<string>("");
  const getAtendimentos = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/atendimento");
    setAtendimentos(res.data.atendimentos);
  };

  const [filtro, setFiltro] = useState<string>("todos");

  const navigateLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  const filtrar = (filtro: string) => {
    console.log(filtro);
    
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
    console.log(filtro);

    let filtradosStatus: Atendimento[] = [];
    if (filtro == "pendente") {
      filtrados.forEach((atendimento) => {
        if (atendimento.status == 0) {
          filtradosStatus.push(atendimento);
        }
      });
    } else if (filtro == "concluido") {
      filtrados.forEach((atendimento) => {
        if (atendimento.status == 1) {
          filtradosStatus.push(atendimento);
        }
      });
    } else {
      filtradosStatus = filtrados
    }
    console.log(filtradosStatus);

    setAtendimentosFiltrados(filtradosStatus);
  };

  useEffect(() => {
    if (!validToken) {
      navigateLogout();
    }
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAtendimentos();
    });
  }, [navigation]);

  useEffect(() => {
    filtrar(filtro);
  }, [searchText, filtro]);

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
              navigation.navigate("Responsaveis");
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
              navigation.navigate("Pets");
            }}
            size={16}
            text="Pets"
            textColor={defaultTheme.COLORS.black}
          />
        </ScrollView>
        <View style={styles.filter}>
          <Button
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            width={0.25}
            text="Todos"
            textColor={defaultTheme.COLORS.white}
            onPress={() => {
              setFiltro("todos");
            }}
          />
          <Button
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            width={0.25}
            text="Pendentes"
            textColor={defaultTheme.COLORS.white}
            onPress={() => {
              setFiltro("pendente");
            }}
          />
          <Button
            color={defaultTheme.COLORS.blueMain}
            fontSize={16}
            height={0.05}
            width={0.25}
            text="Concluidos"
            textColor={defaultTheme.COLORS.white}
            onPress={() => {
              setFiltro("concluido");
            }}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.scrollStyle}
          data={atendimentosFiltrados}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DetalhesAtendimento", {
                    id: item.id,
                  });
                }}
              >
                <CardAtendimento id={item.id} key={Math.random()} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
