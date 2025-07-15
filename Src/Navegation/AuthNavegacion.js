import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator>
      <Stack.Screen
  name="Login"
  component={PantallaLogin}
  options={{ headerShown: false }}
/>

      <Stack.Screen
        name="Registro"
        component={PantallaRegistro}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
