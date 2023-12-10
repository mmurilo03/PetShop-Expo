import { useCallback, useEffect, useState } from "react"
import { Image } from "react-native"
import { Text, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { api } from "../../api/api"
import { styles } from "./styles"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useFocusEffect } from "@react-navigation/native"


interface Atendimento {
    id: number,
    tipo: string,
    descricao: string,
    data: string,
    responsavel: string,
    nome: string,
    status: number
    endereco: string,
    imagem: string,
}

export const CardAtendimento = ({id, tipo, descricao, data, responsavel, nome, status, endereco, imagem}: Atendimento) => {

    const [dataAtendimento, setDataAtendimento] = useState<string[]>([] as string[]);

    const [image, setImage] = useState<string>();
    const [petHasImage, setPetHasImage] = useState<boolean>(false);
    const fadeAnim = useSharedValue(0);

    const getPetImage = async () => {        
        try {
            await api.get(`images/${imagem}`);
            setPetHasImage(true);
        } catch (e) {            
            setPetHasImage(false);
        }
        
        if (petHasImage) {
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
            fadeAnim.value = withTiming(1, {duration: 1000})
        });
    }, [fadeAnim])

    const reanimatedStyle = useAnimatedStyle (() => {
        return {
            opacity: fadeAnim.value,
        }
    })

    useEffect(() => {
        let temp = data.split("T")[0].split("-");
        setDataAtendimento([temp[2], temp[1], temp[0]])
    }, [])
    
    useEffect(() => {
        getPetImage();
    })


    useFocusEffect(() => {
        callback();
    });

    return (
        <Animated.View style={[styles.container, reanimatedStyle ]}>
            <View style={styles.imgContainer}>
                <Image style={styles.atendimentoImg} source={petHasImage ? {uri: image} : require("../../images/kisspng-cat-computer-icons-user-profile-5ae8658e7a9b63.4256720315251797905022.png")} />
            </View>
            <View style={styles.atendimentoName}>
                <View style={styles.atendimentoNameContent}>
                    <Icon name="paw" size={16}/>
                    <Text style={styles.cardText}>{nome}</Text>
                </View>
                <View style={styles.atendimentoNameContent}>
                    <Icon name="map-marker-alt" size={16}/>
                    <Text style={styles.cardText}>Endereço</Text>
                </View>
            </View>
            <View style={styles.atendimentoType}>
                <Text style={styles.atendimentoTypeText}>{tipo}</Text>
                <Text style={styles.atendimentoTypeText}>{responsavel}</Text>
                <Text style={styles.atendimentoTypeText}>{`${dataAtendimento[0]}/${dataAtendimento[1]}/${dataAtendimento[2]}`}</Text>
            </View>
        </Animated.View>
    )
}