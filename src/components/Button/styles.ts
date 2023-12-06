import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width * 0.6,
        height: Dimensions.get("screen").height * 0.06,
        backgroundColor: "#1501A1",
        borderRadius: 5,
        marginTop: 20
    },
    
    buttonText: {
        fontSize: 16,
        color: "#FFFFFF"
    }
})