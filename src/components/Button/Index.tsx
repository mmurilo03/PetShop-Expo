import { Dimensions, Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"

interface Props {
    width: number,
    height: number,
    color: string,
    text: string,
    onPress: () => void
}

export const Button = ({ width, height, text, color, onPress}: Props) => {

    const buttonWidth = Dimensions.get("screen").width * width;
    const buttonHeight = Dimensions.get("screen").height * height;

    return (
    <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonHeight, backgroundColor: color}]} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
    )
}