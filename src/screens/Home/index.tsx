import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { DrawerActionHelpers, ParamListBase, useNavigation } from "@react-navigation/native";
import { saveUser } from "../../storage/storage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CustomHeader } from "../../components/CustomHeader";

export const Home = () => {

    const navigation = useNavigation();
    const drawer = useNavigation<DrawerActionHelpers<ParamListBase>>();

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
        <>
        <CustomHeader toggleDrawer={drawer.toggleDrawer} search={() => {}}/>
        <View style={styles.container}>
            <Text>HOME</Text>
            <TouchableOpacity style={styles.button} onPress={drawer.toggleDrawer}><Text>AAAAAAAAA</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateLogout}><Text>Logout</Text></TouchableOpacity>
        </View>
        </>
    )
}