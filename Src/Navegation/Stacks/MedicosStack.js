import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedico";
import NuevoMedico from "../../../Screen/Medicos/NuevoMedico";

const Stack = createStackNavigator();
//componentes de la navegacion
//importar los componentes de la navegacion
export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarMedicos"
                component={ListarMedicos}
                options={{
                    title: "Médicos",
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
                name= "DetalleMedico"
                component={DetalleMedico}
                options={{
                    title: "Detalle Médico",
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
                name= "NuevoMedico"
                component={NuevoMedico}
                options={{
                    title: "Nuevo/Editar Médico",
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