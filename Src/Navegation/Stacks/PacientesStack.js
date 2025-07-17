import { createStackNavigator } from "@react-navigation/stack";
import ListarPacientes from "../../../Screen/Pacientes/ListarPacientes";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import NuevoPaciente from "../../../Screen/Pacientes/NuevoPaciente";

//componentes de la navegacion
//importar los componentes de la navegacion
const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarPacientes"
                component={ListarPacientes}
                options={{
                    title: "Pacientes",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 22,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
            <Stack.Screen 
                name= "DetallePaciente"
                component={DetallePaciente}
                options={{
                    title: "Detalle Paciente",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 22,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
            <Stack.Screen 
                name= "NuevoPaciente"
                component={NuevoPaciente}
                options={{
                    title: "Nuevo/Editar Paciente",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 22,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
        </Stack.Navigator>
    );
}