import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Image, Text, View } from "react-native"
import { styles } from "./styles"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../api/api"
import { Button } from "../Button"
import { defaultTheme } from "../../global/styles/themes"

export const CustomMenu = (props: DrawerContentComponentProps) => {

    const { user, logout } = useContext(AuthContext);

    const [image, setImage] = useState<string>();
    const [userHasImage, setUserHasImage] = useState<boolean>(false);

    const getUserImage = async () => {        
        try {
            await api.get(`images/${user.img}`);
            setUserHasImage(true);
        } catch (e) {            
            setUserHasImage(false);
        }
        
        if (userHasImage) {
            try {
                const image = api.getUri({url: `images/${user.img}`});
                setImage(image)
                return image
            } catch (error) {
            }
        }
    }

    const navigateLogout = () => {
        logout();
    }

    useEffect(() => {
        getUserImage();
    })

    return (
    <View style={styles.container}>
        <DrawerContentScrollView style={styles.content} {...props}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={userHasImage ? {uri: image} : require("../../images/abstract-user-icon-3.png")} />
                <Text style={styles.username}>{user.name && user.name.length > 40 ? user.name.substring(0, 39)+"..." : user.name}</Text>
                {/* <Text style={styles.username}>{user.name}</Text> */}
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