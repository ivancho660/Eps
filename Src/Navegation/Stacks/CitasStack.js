import { createStackNavigator } from "@react-navigation/stack";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import NuevaCitas from "../../../Screen/Citas/NuevaCitas";
import ListarCitas from "../../../Screen/Citas/ListarCitas";

const Stack = createStackNavigator();

export default function ActividadesStack() {
  return (
    // Citas Stack Navigator
    <Stack.Navigator>
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{
          title: "Citas",
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
        name="DetalleCitas"
        component={DetalleCitas}
        options={{
          title: "Detalle de Cita",
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
        name="NuevaCitas"
        component={NuevaCitas}
        options={{
          title: "Nuevo/Editar Cita",
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