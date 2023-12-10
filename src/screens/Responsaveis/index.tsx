import { ScrollView, Text, View } from "react-native"
import { styles } from "./styles"
import { DrawerActionHelpers, ParamListBase, useNavigation } from "@react-navigation/native";
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

interface Entity {
    nome: string,
    imagem: string,
    email: string,
    funcao: string,
    id: number,
    children: ReactNode
}

export const Responsaveis = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

    const { user, validToken, logout } = useContext(AuthContext);

    const [responsaveis, setResponsaveis] = useState<Entity[]>([] as Entity[]);

    const getResponsaveis = async () => {
        api.defaults.headers.common.Authorization = user.token;
        const res = await api.get("/responsavel");
        setResponsaveis(res.data.responsaveis);
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
        getResponsaveis();        
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
            {responsaveis.length > 0 ? responsaveis.map((responsavel) => {
                return (<CardEnditade id={responsavel.id}
                    imagem={responsavel.imagem}
                    nome={responsavel.nome}
                    key={responsavel.id}>  
                        <Text>Email: {responsavel.email}</Text>
                        <Text>Função: {responsavel.funcao}</Text>
                    </CardEnditade> )
            }) : <></>}
            </ScrollView>
        </View>
        </>
    )
}