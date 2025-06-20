import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidades/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import NuevaEspecialidad from "../../../Screen/Especialidades/NuevaEspecialidad";

const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarEspecialidad"
                component={ListarEspecialidad}
                options={{ title: "Especialidad" }}
            />
             <Stack.Screen 
                name= "DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Detalle Especialidad" }}
            />
             <Stack.Screen 
                name= "NuevaEspecialidad"
                component={NuevaEspecialidad}
                options={{ title: "Nuevo/Editar Especialidad" }}
            />
        </Stack.Navigator>
    );
}