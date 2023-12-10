import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pets } from '../../screens/Pets';
import { GerenciarAtendimento } from '../../screens/GerenciarAtendimento';
import { GerenciarResponsaveis } from '../../screens/GerenciarResponsaveis';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStackGerenciar(){

  return (
    <Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      animation: 'none',
      }}>
      <Screen name="GerenciarAtendimento" component={GerenciarAtendimento} options={{
      }}/>
      <Screen name="GerenciarResponsaveis" component={GerenciarResponsaveis} />
      <Screen name="Pets" component={Pets} />
    </Navigator>
  )
}