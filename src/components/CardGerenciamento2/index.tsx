import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Alert, Dimensions, Image, LayoutChangeEvent, ViewProps } from "react-native";
import { Text, View } from "react-native";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import Animated, { BounceIn, SlideInLeft } from "react-native-reanimated";
import { Loading } from "../Loading";

interface Entity {
  nome: string;
  imagem: string;
  id: number;
  children: ReactNode;
  deleteFunc: (deleteId: number) => Promise<void>;
  editFunc: () => void;
}

export const CardGerenciamento2 = ({
  id,
  nome,
  imagem,
  children,
  deleteFunc,
  editFunc,
}: Entity) => {
  const [image, setImage] = useState<string>();
  const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const getImage = async () => {
    setLoading(false)
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
    } else {
      setImage("../../images/abstract-user-icon-3.png")
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

  useEffect(() => {
    getImage();
  });

  if (loading) {
    return (<Loading styles={{width: styles.container.width, height: styles.container.minHeight}}/>)
  }

  return (
    <Animated.View style={styles.container} entering={SlideInLeft.duration(1000)}>
      <View style={styles.imgContainer}>
        {image ? <Image
          style={styles.entityImg}
          source={
            entityHasImage
              ? { uri: image }
              : require("../../images/abstract-user-icon-3.png")
          }
        /> : <Loading styles={{width: styles.imgContainer.height, height: styles.imgContainer.height}}/>}
      </View>
      <View style={styles.entityName}>
        <View style={styles.entityTitle}>
          <Text style={styles.cardText}>{nome}</Text>
        </View>
        <View style={styles.entityContent}>{children}</View>
      </View>

      <Animated.View style={styles.actionIcons} onLayout={(event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height)
      }}
      entering={BounceIn.duration(1500)}
      >
        <ButtonIcon
          iconColor={defaultTheme.COLORS.white}
          iconName="pencil-alt"
          onPress={() => {
            editFunc();
          }}
          size={40}
          height={buttonHeight}
          width={Dimensions.get("screen").height * 0.06}
          background={defaultTheme.COLORS.graySecond}
        />
      </Animated.View>
      <Animated.View style={[styles.actionIcons, styles.deleteButton]} entering={BounceIn.duration(1500)}>
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
      </Animated.View>
    </Animated.View>
  );
};
