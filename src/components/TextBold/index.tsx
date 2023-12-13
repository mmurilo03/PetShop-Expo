import { Text } from "react-native"
import { styles } from "./styles"

interface Props {
    text: string
}

export const TextBold = ({text}: Props) => {
    return <Text style={styles.textBold}>{text}</Text>
}