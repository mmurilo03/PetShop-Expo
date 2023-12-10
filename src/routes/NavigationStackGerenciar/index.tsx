import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Login } from "../../screens/Login";
import { Starting } from '../../screens/Starting';
import { Responsaveis } from '../../screens/Responsaveis';
import { Pets } from '../../screens/Pets';
import { GerenciarAtendimento } from '../../screens/GerenciarAtendimento';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStackGerenciar(){

  return (
    <Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      animation: 'none',
      }}>
      <Screen name="GerenciarAtendimento" component={GerenciarAtendimento} options={{
      }}/>
      <Screen name="Responsaveis" component={Responsaveis} />
      <Screen name="Pets" component={Pets} />
    </Navigator>
  )
}