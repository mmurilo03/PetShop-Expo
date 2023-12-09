import { Image, View } from "react-native";
import { styles } from "./styles";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { defaultTheme } from "../../global/styles/themes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface LoginProps {
    email: string,
    senha: string
}

export const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const { login, validToken } = useContext(AuthContext);
    
    const navigateHome = () => {
        navigation.navigate("NavigationDrawer");
    }

    useEffect(() => {
        if (validToken) {
            navigateHome();
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={require("../../images/Logo-horizontal.png")} />
                <Input onChangeText={(text) => setEmail(text)} label="Email" placeholder="Email"/>
                <Input onChangeText={(text) => setSenha(text)} label="Senha" placeholder="Senha" isPassword={true}/>
                <Button color={defaultTheme.COLORS.blueMain} height={0.06} width={0.6} text="Login" onPress={() => login(email, senha)}fontSize={16}
                textColor={defaultTheme.COLORS.white}></Button>
            </View>
        </View>
    )
}