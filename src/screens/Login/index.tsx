import { Image, View } from "react-native";
import { styles } from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { defaultTheme } from "../../global/styles/themes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={require("../../images/Logo-horizontal.png")} />
                <Input value={email} onChangeText={(text) => setEmail(text)} label="Email" placeholder="Email"/>
                <Input value={senha} onChangeText={(text) => setSenha(text)} label="Senha" placeholder="Senha" isPassword={true}/>
                <Button color={defaultTheme.COLORS.blueMain} height={0.06} width={0.6} text="Login" onPress={() => login(email, senha)}fontSize={16}
                textColor={defaultTheme.COLORS.white}></Button>
            </View>
        </View>
    )
}