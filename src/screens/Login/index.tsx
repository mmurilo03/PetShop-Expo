import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Input";
import { defaultTheme } from "../../global/styles/themes";

export const Login = () => {

    const navigation = useNavigation();

    const navigateHome = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Image source={require("../../images/Logo-horizontal.png")} />
                <Input label="Email" placeholder="Email"/>
                <Input label="Senha" placeholder="Senha"/>
                <Button color={defaultTheme.COLORS.blueMain} height={0.06} width={0.6} text="Login" onPress={navigateHome}></Button>
            </View>
        </View>
    )
}