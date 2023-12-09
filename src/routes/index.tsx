import { NavigationContainer } from "@react-navigation/native"
import { NavigationStack } from "./NavigationStack"
import { NavigationDrawer } from "./NavigationDrawer"
import { NavigationStackLogin } from "./NavigationStackLogin"


export const Routes = () => {
    return (
    <NavigationContainer >
    <NavigationStackLogin/>
    </NavigationContainer>
    )
}