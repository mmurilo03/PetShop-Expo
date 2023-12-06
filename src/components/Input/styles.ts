import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({

    input: {
        width: Dimensions.get("screen").width * 0.6,
        borderColor: "#000000",
        borderWidth: 0.5,
        padding: 5,
        paddingLeft: 5
    },

    label: {
        width: Dimensions.get("screen").width * 0.6,
        textAlign: "left"
    },

    inputContainter: {
        gap: 8
    }
    
})