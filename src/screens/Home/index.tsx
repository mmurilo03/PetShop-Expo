import { ScrollView, Text, View } from "react-native"
import { styles } from "./styles"
import { DrawerActionHelpers, ParamListBase, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CustomHeader } from "../../components/CustomHeader";
import { api } from "../../api/api";
import { CardAtendimento } from "../../components/CardAtendimento";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { defaultTheme } from "../../global/styles/themes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Atendimento {
    id: number,
    tipo: string,
    descricao: string,
    data: string,
    responsavel: string,
    nome: string,
    status: number
    endereco: string,
    imagem: string,
}

export const Home = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

    const { user, validToken, logout } = useContext(AuthContext);

    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([] as Atendimento[]);

    const getAtendimentos = async () => {
        api.defaults.headers.common.Authorization = user.token;
        const res = await api.get("/atendimento");
        setAtendimentos(res.data.atendimentos);
    }

    const navigateLogout = () => {
        logout();
        navigation.navigate("Login");
    } 

    useEffect(() => {
        if (!validToken) {
            navigateLogout()
        }
    })

    useEffect(() => {
        getAtendimentos();        
    }, [])

    return (
        <>
        <CustomHeader toggleDrawer={drawer.toggleDrawer} search={() => {}}/>
        <View style={styles.container}>
            <View style={styles.pageTitle}>
                <Icon name='home' color={"black"} size={30} />
                <Text style={styles.pageTitleText}>Página inicial</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalButtons} horizontal={true}>
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
                onPress={() => {navigation.navigate("Responsaveis")}}
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
                onPress={() => {navigation.navigate("Pets")}}
                size={16}
                text="Pets"
                textColor={defaultTheme.COLORS.black}
                />
            </ScrollView>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
            {atendimentos.length > 0 ? atendimentos.map((atendimento) => {
                return (<CardAtendimento 
                    data={atendimento.data} 
                    descricao={atendimento.descricao} 
                    endereco={atendimento.endereco}
                    id={atendimento.id}
                    imagem={atendimento.imagem}
                    nome={atendimento.nome}
                    responsavel={atendimento.responsavel}
                    status={atendimento.status}
                    tipo={atendimento.tipo}
                    key={atendimento.id}
                    /> )
            }) : <></>}
            </ScrollView>
        </View>
        </>
    )
}