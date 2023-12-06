import { Image, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";

export const Starting = () => {

    const navigation = useNavigation();

    const navigateLogin = () => {
        navigation.navigate("Login");
    }

    setTimeout(() => {
        navigateLogin()
    }, 1000);

    return <>
        <View style={styles.container}>
            <Image source={require("../../images/Logo.png")}/>
        </View>
    </>
}