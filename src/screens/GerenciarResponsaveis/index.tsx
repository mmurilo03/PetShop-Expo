import {
    DrawerActionHelpers,
    ParamListBase,
    useNavigation,
    useRoute,
  } from "@react-navigation/native";
  import { CustomHeader } from "../../components/CustomHeader";
  import { styles } from "./styles";
  import { ScrollView, Text, View } from "react-native";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { ButtonTextIcon } from "../../components/ButtonTextIcon";
  import { defaultTheme } from "../../global/styles/themes";
  import { api } from "../../api/api";
  import { ReactNode, useContext, useEffect, useState } from "react";
  import { AuthContext } from "../../context/AuthContext";
  import { CardGerenciamento } from "../../components/CardGerenciamento";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  
  interface Entity {
    nome: string,
    imagem: string,
    email: string,
    funcao: string,
    id: number,
    children: ReactNode
  }
  
  export const GerenciarResponsaveis = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();
  
    const [responsaveis, setResponsaveis] = useState<Entity[]>(
      [] as Entity[]
    );
  
    const { user } = useContext(AuthContext);
  
    const getResponsaveis = async () => {
      api.defaults.headers.common.Authorization = user.token;
      const res = await api.get("/responsavel");
      setResponsaveis(res.data.responsaveis);
    };
  
    useEffect(() => {
      navigation.addListener("focus", () => {
        getResponsaveis();
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
              color={defaultTheme.COLORS.gray}
              fontSize={16}
              height={0.04}
              width={0.35}
              iconColor={defaultTheme.COLORS.black}
              iconName="list-ul"
              onPress={() => {navigation.navigate("GerenciarAtendimento")}}
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
              onPress={() => {
                navigation.navigate("CadastrarResponsavel")
              }}
              size={16}
              text="Cadastrar"
              textColor={defaultTheme.COLORS.white}
            />
          </View>
          <ScrollView contentContainerStyle={styles.scrollStyle}>
          {responsaveis.length > 0 ? (
            responsaveis.map((responsavel) => {
              return (
                <CardGerenciamento
                  id={responsavel.id}
                  imagem={responsavel.imagem}
                  nome={responsavel.nome}
                  key={responsavel.id}
                >
                  <Text
                    style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                  >
                    {responsavel.funcao}
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
  