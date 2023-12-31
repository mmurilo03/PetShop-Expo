import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    pageTitle: {
        flexDirection: "row",
        gap: 11,
        marginTop: "5%",
        marginLeft: "20%",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    pageTitleText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    titleButtons: {
        flexDirection: "row"
    },
    horizontalButtons: {
        flexDirection: "row",
        gap: 10,
        paddingTop: 14,
        paddingLeft: "10%",
        paddingRight: "10%",
        marginBottom: 20,
        height: Dimensions.get("screen").height * 0.06
    },
    mainButton: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    scrollStyle: {
        paddingBottom: 200
    },
})