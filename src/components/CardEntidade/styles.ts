import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({

    container: {
        width: Dimensions.get("screen").width * 0.9,
        minHeight: Dimensions.get("screen").height * 0.15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderBottom: 0.5,
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        borderRight: 1,
        borderRightWidth: 1,
    },
    
    imgContainer: {
        aspectRatio: 1,
        height: Dimensions.get("screen").height * 0.15,
    },

    entityImg: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    entityName: {
        width: "62%",
        height: "100%",
    },

    entityContentTitle: {
        alignItems: "flex-start",
        justifyContent: "center"
    },

    entityContent: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: 5,
        marginBottom: 5
    },
    
    cardText: {
        backgroundColor: defaultTheme.COLORS.blueMain,
        minWidth: "101%",
        color: defaultTheme.COLORS.white,
        fontSize: 16,
        padding: 5,
        paddingLeft: 16,
        borderTopRightRadius: 5,
        marginBottom: 21
    }
})