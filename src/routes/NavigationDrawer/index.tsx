import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationStack } from '../NavigationStack';
import { CustomMenu } from '../../components/CustomMenu';
import { Dimensions } from 'react-native';
import { NavigationStackGerenciar } from '../NavigationStackGerenciar';

const {Navigator, Screen} = createDrawerNavigator();

export function NavigationDrawer(){

  return (
    <Navigator drawerContent={ props => <CustomMenu {...props} />}
    screenOptions={({
      drawerStyle: {
        marginTop: Dimensions.get('screen').height*0.13,
        height:Dimensions.get('screen').height*0.55,
        borderRadius: 5
      },
      headerTitle: "",
      headerShown: false
    })}
    >
      <Screen
      name="Página inicial"
      component={NavigationStack} 
      options={{ 
        drawerIcon: () => <Icon name='home' color={"black"} size={20} />,
        }}/>
      <Screen
      name="Gerenciar"
      component={NavigationStackGerenciar} 
      options={{ 
        drawerIcon: () => <Ionicons style={{ transform: [{rotate: "-90deg"}]}} name='options-outline' color={"black"} size={25} />,
        }}/>
      <Screen
      name="Configurações"
      component={NavigationStack} 
      options={{ 
        drawerIcon: () => <Icon name='cog' color={"black"} size={20} />,
        }}/>
    </Navigator>
  )
}