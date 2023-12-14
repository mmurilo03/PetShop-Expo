import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Responsaveis } from '../../screens/Responsaveis';
import { Pets } from '../../screens/Pets';
import { DetalhesPet } from '../../screens/DetalhesPet';
import { DetalhesAtendimento } from '../../screens/DetalhesAtendimento';

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
      <Screen name="DetalhesPet" component={DetalhesPet} />
      <Screen name="DetalhesAtendimento" component={DetalhesAtendimento} />
    </Navigator>
  )
}