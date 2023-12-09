import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../../screens/Home"; 
import { Login } from "../../screens/Login";
import { Starting } from '../../screens/Starting';
import { NavigationDrawer } from '../NavigationDrawer';

const {Navigator, Screen} = createNativeStackNavigator();

export function NavigationStackLogin(){

  return (
    <Navigator initialRouteName="Starting" screenOptions={{headerShown: false}}>
      <Screen name="Starting" component={Starting}/>
      <Screen name="NavigationDrawer" component={NavigationDrawer}/>
      <Screen name="Login" component={Login}/>
    </Navigator>
  )
}