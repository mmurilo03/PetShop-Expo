import 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { AuthComponent } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthComponent>
      <Routes/>
    </AuthComponent>
  );
}