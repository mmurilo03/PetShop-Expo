import { StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes"

export const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: defaultTheme.COLORS.blueMain,
        borderRadius: 7
    }
})