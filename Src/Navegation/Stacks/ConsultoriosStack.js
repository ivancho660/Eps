import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorios from "../../../Screen/Consultorios/ListarConsultorios";
import DetalleConsultorios from "../../../Screen/Consultorios/DetalleConsultorios";
import NuevoConsultorios from "../../../Screen/Consultorios/NuevoConsultorios";

const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarConsultorios"
                component={ListarConsultorios}
                options={{ title: "Consultorios" }}
            />
             <Stack.Screen 
                name= "DetalleConsultorios"
                component={DetalleConsultorios}
                options={{ title: "Detalle Consultorios" }}
            />
             <Stack.Screen 
                name= "NuevoConsultorios"
                component={NuevoConsultorios}
                options={{ title: "Nuevo/Editar Consultorios" }}
            />
        </Stack.Navigator>
    );
}