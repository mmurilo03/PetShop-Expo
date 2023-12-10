import { useContext, useEffect, useState } from "react";
import {
    Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import * as ImagePicker from "expo-image-picker"

export const EditResponsavel = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [nome, setNome] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [funcao, setFuncao] = useState<string>(user.funcao);
  const [telefone, setTelefone] = useState<string>(user.telefone);
  const [senhaAntiga, setSenhaAntiga] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>("");

  const navigation = useNavigation();

  const [image, setImage] = useState<string>();

  const [userHasImage, setUserHasImage] = useState<boolean>(false);

  const [newImage, setNewImage] = useState<string>("");

  const sendForm = async () => {
    try {
        const form = new FormData();
        console.log(newImage);
        
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        form.append("id", `${user.id}`)
        form.append("nome", nome)
        form.append("email", email)
        form.append("funcao", funcao)
        form.append("telefone", telefone)
        form.append("senhaAntiga", senhaAntiga)
        form.append("senhaNova", novaSenha)
        form.append("image", {
          name: newImage.split("/").pop()?.split("_").pop(),
          uri: newImage,
          type: "image/png",
        } as any);
        api.defaults.headers.common.Authorization = user.token;
        
        const newUser = await api.patch("/responsavel/edit", form, config);
        updateUser(newUser.data.responsavelEdited)
    } catch (e: any) {
        Alert.alert(e.response.data.error)
        
    }
  }

  const onButtonPress = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      
      if (result.assets) {
        saveImage(result.assets[0].uri);        
      }
    } catch (e) {}
  };

  const saveImage = (image: string) => {
    setNewImage(image);
  };

  const getUserImage = async () => {
    try {
      await api.get(`images/${user.img}`);
      setUserHasImage(true);
    } catch (e) {
      setUserHasImage(false);
    }

    if (userHasImage) {
      try {
        const image = api.getUri({ url: `images/${user.img}` });
        setImage(image);
        return image;
      } catch (error) {}
    }
  };
  useEffect(() => {
    getUserImage();
  });

  return (
    <>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.header}></View>
        <View style={styles.goBackButton}>
          <ButtonIcon
            iconColor={defaultTheme.COLORS.black}
            iconName="arrow-left"
            onPress={() => {
              navigation.goBack();
            }}
            size={50}
          />
        </View>
        <View style={styles.imageContainer}>
          <View>
            <Image
              style={styles.image}
              source={
                userHasImage
                  ? { uri: image }
                  : require("../../images/abstract-user-icon-3.png")
              }
            />
            <View style={styles.iconCam}>
              <ButtonIcon
                iconColor={defaultTheme.COLORS.black}
                iconName="camera"
                onPress={onButtonPress}
                size={30}
              />
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.formPerfil}>
            <Input label="Nome" value={nome} onChangeText={(text) => setNome(text)} placeholder="Nome" size={16}/>
            <Input label="Email" value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" size={16}/>
            <Input label="Funcao" value={funcao} onChangeText={(text) => setFuncao(text)} placeholder="Funcao" size={16}/>
            <Input label="Telefone" value={telefone} onChangeText={(text) => setTelefone(text)} placeholder="Telefone" size={16}/>
            <Input label="Senha antiga" value={senhaAntiga} onChangeText={(text) => setSenhaAntiga(text)} placeholder="Senha antiga" isPassword={true} size={16}/>
            <Input label="Nova senha" value={novaSenha} onChangeText={(text) => setNovaSenha(text)} placeholder="Nova senha" isPassword={true} size={16}/>
            <Input label="Confirmar senha" value={confirmarNovaSenha} onChangeText={(text) => setConfirmarNovaSenha(text)} placeholder="Confirmar senha" isPassword={true} size={16}/>
            <Button color={defaultTheme.COLORS.blueMain} fontSize={16} height={0.06} width={0.3} onPress={() => sendForm()} text="Salvar" textColor={defaultTheme.COLORS.white}/>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    )
}