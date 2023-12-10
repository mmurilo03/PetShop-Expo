import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GerenciarAtendimento } from '../../screens/GerenciarAtendimento';
import { GerenciarResponsaveis } from '../../screens/GerenciarResponsaveis';
import { GerenciarPets } from '../../screens/GerenciarPets';

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
      <Screen name="GerenciarPets" component={GerenciarPets} />
    </Navigator>
  )
}