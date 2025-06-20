import { createStackNavigator } from "@react-navigation/stack";
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientes";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import NuevoPaciente from "../../../Screen/Pacientes/NuevoPaciente";

const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarPacientes"
                component={ListarPacientes}
                options={{ title: "Pacientes" }}
            />
            <Stack.Screen 
                name= "DetallePaciente"
                component={DetallePaciente}
                options={{ title: "Detalle Pacientes" }}
            />
            <Stack.Screen 
                name= "NuevoPaciente"
                component={NuevoPaciente}
                options={{ title: "Nuevo/Editar Pacientes" }}
            />
        </Stack.Navigator>
    );
}