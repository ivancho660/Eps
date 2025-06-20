import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from '../../../Screen/Perfil/Perfil';


const  Stack = createNativeStackNavigator();

export default function PerfilStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Perfil"
                component={Perfil}
                options={{ title: "Perfil" }}
            />
        </Stack.Navigator>
    );
}