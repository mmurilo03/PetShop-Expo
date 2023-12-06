import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";

export const Home = () => {

    const navigation = useNavigation();

    const navigateLogin = () => {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <Text>HOME</Text>
            <TouchableOpacity style={styles.button} onPress={navigateLogin}></TouchableOpacity>
        </View>
    )
}