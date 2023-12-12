import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Alert, Dimensions, Image } from "react-native";
import { Text, View } from "react-native";
import { api } from "../../api/api";
import { styles } from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { ButtonIcon } from "../ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dialog } from "react-native-simple-dialogs";
import { Input } from "../Input";
import { Button } from "../Button";

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
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<string>();
  const [entityHasImage, setEntityHasImage] = useState<boolean>(false);
  const fadeAnim = useSharedValue(0);
  const [editing, setEditing] = useState(false);

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

  const callback = useCallback(() => {
    fadeAnim.value = withTiming(0, { duration: 0 }, () => {
      fadeAnim.value = withTiming(1, { duration: 500 });
    });
  }, [fadeAnim]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

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

  useFocusEffect(() => {
    callback();
  });

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
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
                width: "81%",
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
          <View>
            <ButtonIcon
              iconColor={defaultTheme.COLORS.white}
              iconName="pencil-alt"
              onPress={() => {
                editFunc();
              }}
              size={40}
              height={Dimensions.get("screen").height * 0.1}
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
              height={Dimensions.get("screen").height * 0.1}
              width={Dimensions.get("screen").height * 0.06}
              background={defaultTheme.COLORS.red}
              border={{ topRight: 5, bottomRight: 5 }}
            />
          </View>
        </>
      ) : (
        <></>
      )}
    </Animated.View>
  );
};
