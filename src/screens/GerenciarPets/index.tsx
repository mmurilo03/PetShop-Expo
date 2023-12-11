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
  import { ReactNode, useContext, useEffect, useState } from "react";
  import { AuthContext } from "../../context/AuthContext";
  import { CardGerenciamento } from "../../components/CardGerenciamento";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  
  interface Entity {
    nome: string,
    imagem: string,
    tutor: string,
    id: number,
    children: ReactNode
  }
  
  export const GerenciarPets = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();
  
    const [pets, setPets] = useState<Entity[]>(
      [] as Entity[]
    );
  
    const { user } = useContext(AuthContext);
  
    const getPets = async () => {
      api.defaults.headers.common.Authorization = user.token;
      const res = await api.get("/pet");
      setPets(res.data.pets);
    };
  
    useEffect(() => {
      navigation.addListener("focus", () => {
        getPets();
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
              onPress={() => {}}
              size={16}
              text="Cadastrar"
              textColor={defaultTheme.COLORS.white}
            />
          </View>
          <ScrollView contentContainerStyle={styles.scrollStyle}>
          {pets.length > 0 ? (
            pets.map((pet) => {
              return (
                <CardGerenciamento
                  id={pet.id}
                  imagem={pet.imagem}
                  nome={pet.nome}
                  key={pet.id}
                >
                  <Text
                    style={{ color: defaultTheme.COLORS.white, fontSize: 14 }}
                  >
                    {pet.tutor}
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
  