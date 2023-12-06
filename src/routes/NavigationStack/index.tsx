import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Login } from "../../screens/Login";
import { Starting } from '../../screens/Starting';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStack(){

  return (
    <Navigator initialRouteName="Starting" screenOptions={{headerShown: false}}>
      <Screen name="Starting" component={Starting}/>
      <Screen name="Home" component={Home}/>
      <Screen name="Login" component={Login}/>
    </Navigator>
  )
}