import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Alert, Dimensions, Image, LayoutChangeEvent } from "react-native";
import { Text, View } from "react-native";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { AuthContext } from "../../context/AuthContext";
import { Dialog } from "react-native-simple-dialogs";
import { Input } from "../Input";
import { Button } from "../Button";

interface Entity {
  nome: string;
  imagem: string;
  id: number;
  children: ReactNode;
  deleteFunc: (deleteId: number) => Promise<void>;
  editFunc: (editedId: number, funcao: string) => Promise<void>;
}

export const CardGerenciamento = ({
  id,
  nome,
  imagem,
  children,
  deleteFunc,
  editFunc,
}: Entity) => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<string>();
  const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
  const [editing, setEditing] = useState(false);
  const [funcao, setFuncao] = useState("");
  const [buttonHeight, setButtonHeight] = useState<number>(0);

  const getImage = async () => {
    try {
      await api.get(`images/${imagem}`);
      setEntityHasImage(true);
    } catch (e) {
      setEntityHasImage(false);
    }

    if (entityHasImage) {
      try {
        const image = api.getUri({ url: `images/${imagem}` });
        setImage(image);
        return image;
      } catch (error) {}
    }
  };

  const deleteAlert = () => {
    Alert.alert("Deletar responsável?", `Deletar: ${nome}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => deleteFunc(id),
      },
    ]);
  };

  const editAlert = () => {
    setEditing(true);
  };

  useEffect(() => {
    getImage();
  });

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.entityImg}
          source={
            entityHasImage
              ? { uri: image }
              : require("../../images/abstract-user-icon-3.png")
          }
        />
      </View>
      <View
        style={[
          styles.entityName,
          user.id != 1
            ? {
                width: "75%",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }
            : {},
        ]}
      >
        <View style={styles.entityTitle}>
          <Text style={styles.cardText}>{nome}</Text>
        </View>
        <View style={styles.entityContent}>{children}</View>
      </View>
      {user.id == 1 ? (
        <>
          <View
            style={styles.actionIcons}
            onLayout={(event: LayoutChangeEvent) => {
              const { height } = event.nativeEvent.layout;
              setButtonHeight(height);
            }}
          >
            <ButtonIcon
              iconColor={defaultTheme.COLORS.white}
              iconName="pencil-alt"
              onPress={() => {
                editAlert();
              }}
              size={40}
              height={buttonHeight}
              width={Dimensions.get("screen").height * 0.06}
              background={defaultTheme.COLORS.graySecond}
            />
          </View>
          <View style={styles.actionIcons}>
            <ButtonIcon
              iconColor={defaultTheme.COLORS.white}
              iconName="trash"
              onPress={() => {
                deleteAlert();
              }}
              size={40}
              height={buttonHeight}
              width={Dimensions.get("screen").height * 0.06}
              background={defaultTheme.COLORS.red}
              border={{ topRight: 5, bottomRight: 5 }}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      {editing ? (
        <Dialog
          dialogStyle={styles.dialogView}
          visible={editing}
          title="Editar Função"
          onTouchOutside={() => setEditing(false)}
        >
          <View>
            <Input
              label="Função"
              onChangeText={(text) => setFuncao(text)}
              placeholder="Digite a função"
              value={funcao}
              size={16}
              width={0.76}
            />
            <View style={styles.dialogButtons}>
              <Button
                color={defaultTheme.COLORS.blueMain}
                fontSize={16}
                height={0.05}
                text="Cancelar"
                onPress={() => setEditing(false)}
                textColor={defaultTheme.COLORS.white}
                width={0.3}
              />
              <Button
                color={defaultTheme.COLORS.blueMain}
                fontSize={16}
                height={0.05}
                text="Salvar"
                onPress={() => {
                  editFunc(id, funcao);
                  setEditing(false);
                }}
                textColor={defaultTheme.COLORS.white}
                width={0.3}
              />
            </View>
          </View>
        </Dialog>
      ) : (
        <></>
      )}
    </View>
  );
};
