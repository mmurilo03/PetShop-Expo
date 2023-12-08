import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationStack } from '../NavigationStack';
import { CustomMenu } from '../../components/CustomMenu';
import { Dimensions } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const {Navigator, Screen} = createDrawerNavigator();

export function NavigationDrawer(){

  // const { showHeader } = useContext(AuthContext);

  return (
    <Navigator drawerContent={ props => <CustomMenu {...props} />}
    screenOptions={({
      drawerStyle: {
        marginTop: 100,
        height:Dimensions.get('screen').height*0.5
      },
      // headerShown: showHeader
    })}
    >
      <Screen
      name=" "
      component={NavigationStack} 
      options={{ 
        drawerIcon: () => <Icon name='home' color={"black"} size={20} />,
        }}/>
    </Navigator>
  )
}