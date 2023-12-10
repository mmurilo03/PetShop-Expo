import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('screen').height*0.13,
        backgroundColor: defaultTheme.COLORS.blueMain,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 20
    },
    icon: {
        color: defaultTheme.COLORS.white
    }
})