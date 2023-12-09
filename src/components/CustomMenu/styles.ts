import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('screen').height*0.5
    },
    content: {
        height:Dimensions.get('screen').height*0.5
    },
    buttonContainer: {
        justifyContent:"center",
        alignItems:"center"
    },
    imageContainer: {
        justifyContent:"center",
        alignItems:"center"
    },
    image: {
        width: Dimensions.get('screen').width*0.4,
        height: Dimensions.get('screen').width*0.4,
        borderRadius: 100
    }
})