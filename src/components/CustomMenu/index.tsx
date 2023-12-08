import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Image, Text, View } from "react-native"
import { styles } from "./styles"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../api/api"
import { Button } from "../Button"
import { defaultTheme } from "../../global/styles/themes"
import { useNavigation } from "@react-navigation/native"

export const CustomMenu = (props: DrawerContentComponentProps) => {

    const { user, logout } = useContext(AuthContext);

    const navigation = useNavigation();

    const navigateLogout = () => {
        logout();
        navigation.navigate("Login");
    }

    return (
    <View style={styles.container}>
        <DrawerContentScrollView style={styles.content} {...props}>
            {/* <Image source={getUserImage()} /> */}
            <DrawerItemList {...props} />
            <View style={styles.buttonContainer}>
                <Button 
                color={defaultTheme.COLORS.blueMain} 
                height={0.06} 
                width={0.3} 
                onPress={(navigateLogout)} 
                text="Logout" 
                fontSize={16} 
                textColor={defaultTheme.COLORS.white}/>
            </View>
        </DrawerContentScrollView>
    </View>
    )
}