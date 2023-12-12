import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GerenciarAtendimento } from '../../screens/GerenciarAtendimento';
import { GerenciarResponsaveis } from '../../screens/GerenciarResponsaveis';
import { GerenciarPets } from '../../screens/GerenciarPets';
import { CadastrarResponsavel } from '../../screens/CadastrarResponsavel';
import { CadastrarAtendimento } from '../../screens/CadastrarAtendimento';
import { EditAtendimento } from '../../screens/EditAtendimento';
import { CadastrarPet } from '../../screens/CadastrarPet';

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
      <Screen name="CadastrarResponsavel" component={CadastrarResponsavel} />
      <Screen name="CadastrarAtendimento" component={CadastrarAtendimento} />
      <Screen name="EditAtendimento" component={EditAtendimento} />
      <Screen name="CadastrarPet" component={CadastrarPet} />
    </Navigator>
  )
}