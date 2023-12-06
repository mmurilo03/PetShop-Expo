import { Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface Props {
    label: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    isPassword?: boolean
}

export const Input = ({label, placeholder, onChangeText, isPassword}: Props) => {
    return (
    <View style={styles.inputContainter}>
        <Text style={styles.label}>{label}</Text>
        <TextInput onChangeText={onChangeText} placeholder={placeholder} style={styles.input} secureTextEntry={isPassword} />
    </View>
    )
}