import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({

    container: {
        width: Dimensions.get("screen").width * 0.9,
        height: Dimensions.get("screen").height * 0.1,
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "flex-start",
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: defaultTheme.COLORS.blueMain
    },
    
    imgContainer: {
        aspectRatio: 1,
        height: "100%",
    },

    entityImg: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    entityName: {
        width: "46%",
        height: "100%",
    },

    entityTitle: {
        alignItems: "center",
        justifyContent: "center",
    },

    entityContent: {
        alignItems: "center",
        justifyContent: "space-around",
        // flexDirection: "row",
    },
    
    cardText: {
        textAlign: "center",
        minWidth: "100%",
        color: defaultTheme.COLORS.white,
        fontSize: 20,
        padding: 5,
        borderTopRightRadius: 5,
        marginBottom: 8
    },

    actionIcons:{
        borderTopRightRadius: 5
    }
})