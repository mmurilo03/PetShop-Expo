import { ReactNode, useCallback, useEffect, useState } from "react"
import { Image } from "react-native"
import { Text, View } from "react-native"
import { api } from "../../api/api"
import { styles } from "./styles"
import Animated, { useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated"
import { useFocusEffect } from "@react-navigation/native"


interface Entity {
    nome: string,
    imagem: string,
    id: number,
    children: ReactNode
}

export const CardEnditade = ({id, nome, imagem, children}: Entity) => {

    const [image, setImage] = useState<string>();
    const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
    const fadeAnim = useSharedValue(0);

    const getImage = async () => {        
        try {
            await api.get(`images/${imagem}`);
            setEntityHasImage(true);
        } catch (e) {            
            setEntityHasImage(false);
        }
        
        if (entityHasImage) {
            try {
                const image = api.getUri({url: `images/${imagem}`});                
                setImage(image)
                return image
            } catch (error) {
            }
        }
    }

    const callback = useCallback(() => {
        fadeAnim.value = withTiming(0, {duration: 0}, () => {
            fadeAnim.value = withTiming(1, {duration: 500})
        });
    }, [fadeAnim])

    const reanimatedStyle = useAnimatedStyle (() => {
        return {
            opacity: fadeAnim.value,
        }
    })
    
    useEffect(() => {
        getImage();
    })

    useFocusEffect(() => {
        callback();
    });

    return (
        <Animated.View style={[styles.container, reanimatedStyle ]}>
            <View style={styles.imgContainer}>
                <Image style={styles.entityImg} source={entityHasImage ? {uri: image} : require("../../images/abstract-user-icon-3.png")} />
            </View>
            <View style={styles.entityName}>
                <View style={styles.entityContent}>
                    <Text style={styles.cardText}>{nome}</Text>
                </View>
                <View style={styles.entityContent}>
                    {children}
                </View>
            </View>
        </Animated.View>
    )
}