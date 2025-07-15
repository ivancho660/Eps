import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidades/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import NuevaEspecialidad from "../../../Screen/Especialidades/NuevaEspecialidad";

const Stack = createStackNavigator();

export default function ActividadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarEspecialidad"
                component={ListarEspecialidad}
                options={{
                    title: "Especialidades",
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
                name="DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{
                    title: "Detalle Especialidad",
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
                name="NuevaEspecialidad"
                component={NuevaEspecialidad}
                options={{
                    title: "Nueva/Editar Especialidad",
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