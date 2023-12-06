import { Alert, Image, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Input";
import { defaultTheme } from "../../global/styles/themes";
import { api } from "../../api/api";
import { useState } from "react";

interface LoginProps {
    email: string,
    senha: string
}

export const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const navigation = useNavigation();

    const navigateHome = () => {
        navigation.navigate("Home");
    }

    const login = async ({email, senha}: LoginProps) => {
        const res = await api.post("/responsavel/login", {email, senha});

        if(res.data.token) {
            navigateHome()
        } else {
            Alert.alert("Usuário ou senha incorretos!");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={require("../../images/Logo-horizontal.png")} />
                <Input onChangeText={(text) => setEmail(text)} label="Email" placeholder="Email"/>
                <Input onChangeText={(text) => setSenha(text)} label="Senha" placeholder="Senha" isPassword={true}/>
                <Button color={defaultTheme.COLORS.blueMain} height={0.06} width={0.6} text="Login" onPress={async () => await login({email, senha})}></Button>
            </View>
        </View>
    )
}