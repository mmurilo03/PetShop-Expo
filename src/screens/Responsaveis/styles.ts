import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    button: {
        width: 70,
        height: 30,
        backgroundColor: "blue"
    },
    scrollStyle: {
        gap: 20,
        paddingTop: 30,
        paddingBottom: 70
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
    horizontalButtons: {
        height: Dimensions.get("screen").height * 0.07,
        flexDirection: "row",
        gap: 10,
        paddingTop: 14,
        padding: "10%"
    }
})