import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({

    container: {
        width: Dimensions.get("screen").width * 0.8,
        minHeight: Dimensions.get("screen").height * 0.4,
        gap: 9
    },
    
    imgContainer: {
        width: Dimensions.get("screen").width * 0.8,
        height: Dimensions.get("screen").height * 0.3
    },

    atendimentoImg: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },

    atendimentoName: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    atendimentoNameContent: {
        alignItems: "center",
        flexDirection: "row",
        gap:5
    },
    
    atendimentoType: {
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 10
    },

    atendimentoTypeText: {
        fontSize: 16,
        padding: 6,
        backgroundColor: defaultTheme.COLORS.gray,
        borderRadius: 5,
        fontWeight: "bold"
    },

    cardText: {
        fontSize: 16
    }
})