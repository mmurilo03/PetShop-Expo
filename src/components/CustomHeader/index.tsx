import { View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { styles } from "./style"

interface Props {
    toggleDrawer: () => void
    search: () => void
}

export const CustomHeader = ({toggleDrawer, search}: Props) => {

    return(
        <>
            <View style={styles.container}>
                <Icon style={styles.icon} name="bars" size={30} onPress={toggleDrawer}/>
                <Icon style={styles.icon} name="search" size={30} onPress={search}/>
            </View>
        </>
    )
}