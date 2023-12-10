import { useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";


export const EditResponsavel = () => {
    
    const { user } = useContext(AuthContext);

    const [nome, setNome] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [senhaAntiga, setSenhaAntiga] = useState<string>("");
    const [novaSenha, setNovaSenha] = useState<string>("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>("");

    const navigation = useNavigation();

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
    useEffect(() => {
        getUserImage();
    })

    return (
        <>
            <KeyboardAvoidingView behavior="height">
                <View style={styles.header}>
                </View>
                <View style={styles.goBackButton}>
                    <ButtonIcon iconColor={defaultTheme.COLORS.black} iconName="arrow-left" onPress={() => {navigation.goBack()}} size={50} />
                </View>
                <View style={styles.imageContainer}>
                    <View>
                        <Image style={styles.image} source={userHasImage ? {uri: image} : require("../../images/abstract-user-icon-3.png")} />
                        <View style={styles.iconCam}><ButtonIcon iconColor={defaultTheme.COLORS.black} iconName="camera" onPress={() => {}} size={30}/></View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.formPerfil}>
                    <Input label="Nome" value={nome} onChangeText={(text) => setNome(text)} placeholder="Nome" size={16}/>
                    <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" size={16}/>
                    <Input label="Senha antiga" value={senhaAntiga} onChangeText={(text) => setSenhaAntiga(text)} placeholder="Senha antiga" isPassword={true} size={16}/>
                    <Input label="Nova senha" value={novaSenha} onChangeText={(text) => setNovaSenha(text)} placeholder="Nova senha" isPassword={true} size={16}/>
                    <Input label="Confirmar senha" value={confirmarNovaSenha} onChangeText={(text) => setConfirmarNovaSenha(text)} placeholder="Confirmar senha" isPassword={true} size={16}/>
                    <Button color={defaultTheme.COLORS.blueMain} fontSize={16} height={0.06} width={0.3} onPress={() => {}} text="Salvar" textColor={defaultTheme.COLORS.white}/>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}