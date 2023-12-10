import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Login } from "../../screens/Login";
import { Starting } from '../../screens/Starting';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStack(){

  return (
    <Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="Responsaveis" component={Home} />
      <Screen name="Pets" component={Home} />
    </Navigator>
  )
}