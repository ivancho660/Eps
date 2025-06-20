import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Configuracion from '../../../Screen/Configuracion/Configuraciones';


const  Stack = createNativeStackNavigator();

export default function ConfiguracionStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Configuracion"
                component={Configuracion}
                options={{ title: "Configuracion" }}
            />
        </Stack.Navigator>
    );
}