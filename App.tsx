import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { AuthComponent } from './src/context/AuthContext';
import { StatusBar } from 'react-native';
import { defaultTheme } from './src/global/styles/themes';

export default function App() {
  return (
    <AuthComponent>
      <StatusBar translucent backgroundColor={defaultTheme.COLORS.blueMain}/>
      <Routes/>
    </AuthComponent>
  );
}