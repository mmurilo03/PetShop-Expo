import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './src/screens/Login';
import { Routes } from './src/routes';
import { AuthComponent } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthComponent>
      <Routes/>
    </AuthComponent>
  );
}