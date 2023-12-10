import { Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface Props {
    label: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean,
    size?: number,
    value: string
}

export const Input = ({label, placeholder, onChangeText, size, value, isPassword}: Props) => {
    return (
    <View style={styles.inputContainter}>
        <Text style={[styles.label, {fontSize: size ? size : 14}]}>{label}</Text>
        <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} style={[styles.input, {fontSize: size ? size : 14}]} secureTextEntry={isPassword} />
    </View>
    )
}