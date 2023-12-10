import { TouchableOpacity } from "react-native"
import { styles } from "./styles"
import Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    iconName: string,
    iconColor: string,
    size: number,
    background?: string,
    height?: number,
    width? : number,
    border? : { topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number}
    onPress: () => void
}

export const ButtonIcon = ({ iconName, iconColor, size, background, height, border, width, onPress}: Props) => {

    const backgroundColor = background ? background : "";
    const heightIcon = height ? height : size;
    const widthIcon = width ? width : size;
    const borderTopLeft = border?.topLeft ? border.topLeft : 0
    const borderTopRight = border?.topRight ? border.topRight : 0
    const borderBottomLeft = border?.bottomLeft ? border.bottomLeft : 0
    const borderBottomRight = border?.bottomRight ? border.bottomRight : 0
    
    const optionalStyle = {
        backgroundColor: backgroundColor,
        height: heightIcon,
        width: widthIcon,
        borderTopLeftRadius: borderTopLeft,
        borderTopRightRadius: borderTopRight,
        borderBottomLeftRadius: borderBottomLeft,
        borderBottomRightRadius: borderBottomRight,
    }

    return (
    <TouchableOpacity 
    style={[styles.button, optionalStyle]} onPress={onPress}>
        <Icon name={iconName} color={iconColor} size={size}></Icon>
    </TouchableOpacity>
    )
}