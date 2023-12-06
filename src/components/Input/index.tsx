import { Text, TextInput, View } from "react-native"
import { styles } from "./styles"

interface Props {
    label: string,
    placeholder: string,
}

export const Input = ({label, placeholder}: Props) => {
    return (
    <View style={styles.inputContainter}>
        <Text style={styles.label}>{label}</Text>
        <TextInput placeholder={placeholder} style={styles.input} />
    </View>
    )
}