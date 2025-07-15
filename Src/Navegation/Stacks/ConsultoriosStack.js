import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorios from "../../../Screen/Consultorios/ListarConsultorios";
import DetalleConsultorios from "../../../Screen/Consultorios/DetalleConsultorios";
import NuevoConsultorios from "../../../Screen/Consultorios/NuevoConsultorios";

const Stack = createStackNavigator();

export default function ActividadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarConsultorios"
                component={ListarConsultorios}
                options={{
                    title: "Consultorios",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
            <Stack.Screen
                name="DetalleConsultorios"
                component={DetalleConsultorios}
                options={{
                    title: "Detalle Consultorio",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
            <Stack.Screen
                name="NuevoConsultorios"
                component={NuevoConsultorios}
                options={{
                    title: "Nuevo/Editar Consultorio",
                    headerStyle: {
                        backgroundColor: "#0D47A1",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                    },
                    headerTitleAlign: "center", // 👈 centra el título
                }}
            />
        </Stack.Navigator>
    );
}