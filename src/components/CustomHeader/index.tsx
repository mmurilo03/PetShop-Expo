import { TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { styles } from "./style"
import { useState } from "react"

interface Props {
    toggleDrawer: () => void
    onChangeText: (text: string) => void
}

export const CustomHeader = ({toggleDrawer, onChangeText}: Props) => {

    const [showInput, setShowInput] = useState(false);

    return(
        <>
            <View style={styles.container}>
                <Icon style={styles.icon} name="bars" size={30} onPress={toggleDrawer}/>
                {showInput && 
                    <TextInput onChangeText={onChangeText} style={styles.input}/>
                }
                <Icon style={styles.icon} name="search" size={30} onPress={() => setShowInput(!showInput)}/>
            </View>
        </>
    )
}