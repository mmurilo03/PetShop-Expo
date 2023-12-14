import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../global/styles/themes";


export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },

    header: {
        height: Dimensions.get('screen').height*0.1,
        backgroundColor: defaultTheme.COLORS.blueMain
    },
    
    imageContainer: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection: "row"
    },

    goBackButton: {
        marginLeft: 10,
        marginTop: 10
    },

    image: {
        marginTop: 5,
        resizeMode: "contain",
        width: Dimensions.get('screen').width*0.9,
        height: Dimensions.get('screen').height*0.3
    },

    mapContainer: {
        width: Dimensions.get('screen').width*0.95,
        height: Dimensions.get('screen').width*0.85,
    },

    formPerfil:{
        marginTop: 28,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        borderRadius: 5,
        gap: 20,
        paddingBottom: 50
    },
})