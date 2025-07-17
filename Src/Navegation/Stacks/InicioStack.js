import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../../../Screen/Inicio/Inicio';
import CitasStack from './CitasStack';
import ConsultoriosStack from './ConsultoriosStack';
import EspecialidadesStack from './EspecialidadesStack';
import MedicosStack from './MedicosStack';
import PacientesStack from './PacientesStack';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
//componentes de la navegacion
//importar los componentes de la navegacion
export default function InicioStack() {

    return (
        <Stack.Navigator initialRouteName='Inicio' screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="citasStack" component={CitasStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="consultoriosStack" component={ConsultoriosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="especialidadesStack" component={EspecialidadesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="medicosStack" component={MedicosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="pacientesStack" component={PacientesStack}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}