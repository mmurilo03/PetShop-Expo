import { Dimensions, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
    width: number,
    height: number,
    color: string,
    text: string,
    textColor: string,
    fontSize: number,
    iconName: string,
    iconColor: string,
    size: number,
    onPress: () => void
}


export const ButtonTextIcon = ({ width, height, text, color, textColor, fontSize, iconColor, iconName, size, onPress}: Props) => {

    const buttonWidth = Dimensions.get("screen").width * width;
    const buttonHeight = Dimensions.get("screen").height * height;

    return (
    <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonHeight, backgroundColor: color}]} onPress={onPress}>
        <Icon name={iconName} color={iconColor} size={size}></Icon>
        <Text style={{ color: textColor, fontSize: fontSize }}>{text}</Text>
    </TouchableOpacity>
    )
}