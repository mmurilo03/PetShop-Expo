import { Image, View } from "react-native"
import { styles } from "./styles"

export const Starting = () => {

    return <>
        <View style={styles.container}>
            <Image source={require("../../images/Logo.png")}/>
        </View>
    </>
}