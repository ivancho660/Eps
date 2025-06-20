import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../../../Screen/Inicio/Inicio';
import CitasStack from './CitasStack';
import ConsultoriosStack from './ConsultoriosStack';
import EspecialidadesStack from './EspecialidadesStack';
import MedicosStack from './MedicosStack';
import PacientesStack from './PacientesStack';
import {Entypo,AntDesign,Feather} from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

export default function InicioStack() {

    return (
        <Stack.Navigator initialRouteName='Inicio' ScreenOptions={{
            headerShown: false,  }}>
            <Stack.Screen
                name="Inicio"
                component={Inicio}
            />
            <Stack.Screen
                name="citasStack" component={CitasStack}
            />
            <Stack.Screen
                name="consultoriosStack" component={ConsultoriosStack}
            />
            <Stack.Screen
                name="especialidadesStack" component={EspecialidadesStack}
            />
            <Stack.Screen
                name="medicosStack" component={MedicosStack}
            />
            <Stack.Screen
                name="pacientesStack" component={PacientesStack}
            />

        </Stack.Navigator>
    );
}