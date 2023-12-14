import { ReactNode, useCallback, useEffect, useState } from "react"
import { Image } from "react-native"
import { Text, View } from "react-native"
import { api } from "../../api/api"
import { styles } from "./styles"
import Animated, { SlideInLeft } from "react-native-reanimated"
import { Loading } from "../Loading"

interface Entity {
    nome: string,
    imagem: string,
    id: number,
    children: ReactNode
}

export const CardEnditade = ({id, nome, imagem, children}: Entity) => {

    const [image, setImage] = useState<string>();
    const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

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
                setLoading(false)
                return image
            } catch (error) {
            }
        } else {
            setImage("../../images/abstract-user-icon-3.png")
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getImage();
    })

    if (loading) {
        return (<Loading styles={{width: styles.container.width, height: styles.container.minHeight}}/>)
    }

    return (
        <Animated.View style={styles.container} entering={SlideInLeft.duration(1000)} >
            <View style={styles.imgContainer}>
                {image ? 
                <Image style={styles.entityImg} source={entityHasImage ? {uri: image} : require("../../images/abstract-user-icon-3.png")} />
                : <Loading styles={{width: styles.imgContainer.height, height: styles.imgContainer.height}} />
                }
            </View>
            <View style={styles.entityName}>
                <View style={styles.entityContentTitle}>
                    <Text style={styles.cardText}>{nome}</Text>
                </View>
                <View style={styles.entityContent}>
                    {children}
                </View>
            </View>
        </Animated.View>
    )
}