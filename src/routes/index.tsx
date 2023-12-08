import { NavigationContainer } from "@react-navigation/native"
import { NavigationStack } from "./NavigationStack"
import { NavigationDrawer } from "./NavigationDrawer"


export const Routes = () => {
    return (
    <NavigationContainer >
    <NavigationDrawer/>
    </NavigationContainer>
    )
}