import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({
    header: {
        height: Dimensions.get('screen').height*0.1,
        backgroundColor: defaultTheme.COLORS.blueMain
    },
    imageContainer: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "row",
    },
    goBackButton: {
        marginLeft: 10,
        marginTop: 10
    },
    image: {
        width: Dimensions.get('screen').width*0.4,
        height: Dimensions.get('screen').width*0.4,
        borderRadius: 100
    },
    iconCam: {
        backgroundColor: defaultTheme.COLORS.white,
        padding: 10,
        position: "absolute",
        right: 1,
        bottom: 1,
        borderRadius: 50
    },

    formPerfil:{
        marginTop: 28,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: Dimensions.get("window").height * 0.8,
        borderRadius: 5,
        gap: 20
    }
})