import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Image, Text, View } from "react-native"
import { styles } from "./styles"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../api/api"
import { Button } from "../Button"
import { defaultTheme } from "../../global/styles/themes"
import { useNavigation } from "@react-navigation/native"

export const CustomMenu = (props: DrawerContentComponentProps) => {

    const { user, logout } = useContext(AuthContext);

    const navigation = useNavigation();

    const [image, setImage] = useState<string>();

    const getUserImage = () => {
        
        try {
            const image = api.getUri({url: `images/${user.img}`});
            setImage(image)
            return image
        } catch (error) {
        }
    }

    const navigateLogout = () => {
        logout();
        navigation.navigate("Login");
    }

    useEffect(() => {
        getUserImage();
    })

    return (
    <View style={styles.container}>
        <DrawerContentScrollView style={styles.content} {...props}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}} />
            </View>
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