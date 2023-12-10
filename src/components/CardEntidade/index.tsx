import { ReactNode, useEffect, useState } from "react"
import { Image } from "react-native"
import { Text, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { api } from "../../api/api"
import { styles } from "./styles"


interface Entity {
    nome: string,
    imagem: string,
    id: number,
    children: ReactNode
}

export const CardEnditade = ({id, nome, imagem, children}: Entity) => {

    const [image, setImage] = useState<string>();
    const [entityHasImage, setEntityHasImage] = useState<boolean>(false);

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
    
    useEffect(() => {
        getImage();
    })

    return (
        <View style={styles.container}>
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
        </View>
    )
}