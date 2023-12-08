import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        height:Dimensions.get('screen').height*0.5
    },
    content: {
        height:Dimensions.get('screen').height*0.5
    },
    buttonContainer: {
        justifyContent:"center",
        alignItems:"center"
    }
})