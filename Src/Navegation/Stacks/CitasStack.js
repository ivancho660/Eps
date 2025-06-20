import { createStackNavigator } from "@react-navigation/stack";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import NuevaCitas from "../../../Screen/Citas/NuevaCitas";
import ListarCitas from "../../../Screen/Citas/ListarCitas";

const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarCitas"
                component={ListarCitas}
                options={{ title: "Citas" }}
            />
             <Stack.Screen 
                name= "DetalleCitas"
                component={DetalleCitas}
                options={{ title: "Detalle Cita" }}
            />
             <Stack.Screen 
                name= "NuevaCitas"
                component={NuevaCitas}
                options={{ title: "Nuevo/Editar Cita" }}
            />
        </Stack.Navigator>
    );
}