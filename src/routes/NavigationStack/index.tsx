import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Login } from "../../screens/Login";
import { Starting } from '../../screens/Starting';
import { Responsaveis } from '../../screens/Responsaveis';
import { Pets } from '../../screens/Pets';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStack(){

  return (
    <Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      animation: 'none',
      }}>
      <Screen name="Home" component={Home} options={{
      }}/>
      <Screen name="Responsaveis" component={Responsaveis} />
      <Screen name="Pets" component={Pets} />
    </Navigator>
  )
}