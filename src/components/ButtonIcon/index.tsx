import { TouchableOpacity } from "react-native"
import { styles } from "./styles"
import Icon from "react-native-vector-icons/FontAwesome5"

interface Props {
    iconName: string,
    iconColor: string,
    size: number,
    onPress: () => void
}

export const ButtonIcon = ({ iconName, iconColor, size, onPress}: Props) => {

    return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={iconName} color={iconColor} size={size}></Icon>
    </TouchableOpacity>
    )
}