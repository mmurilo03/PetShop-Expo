import { Dimensions, StyleSheet } from "react-native"
import { defaultTheme } from "../../global/styles/themes"

export const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.COLORS.blueMain,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },

    form: {
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        backgroundColor: "#FFFFFF",
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").height * 0.6,
        borderRadius: 5
    }
})