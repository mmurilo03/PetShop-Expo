import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";
import { saveUser } from "../../storage/storage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Home = () => {

    const navigation = useNavigation();

    const { validToken, logout } = useContext(AuthContext);

    const navigateLogin = () => {
        navigation.navigate("Login");
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

    return (
        <View style={styles.container}>
            <Text>HOME</Text>
            <TouchableOpacity style={styles.button} onPress={navigateLogin}></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateLogout}><Text>Logout</Text></TouchableOpacity>
        </View>
    )
}