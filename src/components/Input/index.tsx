import { Dimensions, Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface Props {
    label: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean,
    size?: number,
    width?: number,
    value: string
}

export const Input = ({label, placeholder, onChangeText, size, value, isPassword, width}: Props) => {
    return (
    <View style={styles.inputContainter}>
        <Text style={[styles.label, {fontSize: size ? size : 14}]}>{label}</Text>
        <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} style={[styles.input, {fontSize: size ? size : 14, width: width ? Dimensions.get("screen").width * width : Dimensions.get("screen").width * 0.6}]} secureTextEntry={isPassword} />
    </View>
    )
}