import { NavigationContainer } from "@react-navigation/native"
import { NavigationDrawer } from "./NavigationDrawer"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Starting } from "../screens/Starting"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Login"

const {Navigator, Screen} = createNativeStackNavigator();


export const Routes = () => {

    const { loading, validToken } = useContext(AuthContext);
    
    if (loading) {
        return <Starting />
    }

    return (
    <NavigationContainer >
        <Navigator>
            { validToken ? 
            <Screen name="NavigationDrawer" component={NavigationDrawer} options={{headerShown: false}}/>
            :
            <Screen name="Login" component={Login} options={{headerShown: false}}/>
            }
        </Navigator>
    </NavigationContainer>
    )
}