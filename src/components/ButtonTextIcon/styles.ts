import { StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes"

export const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: defaultTheme.COLORS.blueMain,
        borderRadius: 7,
        gap: 9
    }
})