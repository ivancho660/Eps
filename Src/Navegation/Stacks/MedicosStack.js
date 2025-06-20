import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedico";
import NuevoMedico from "../../../Screen/Medicos/NuevoMedico";

const Stack = createStackNavigator();

export default function ActividadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarMedicos"
                component={ListarMedicos}
                options={{ title: "Medicos" }}
            />
             <Stack.Screen 
                name= "DetalleMedico"
                component={DetalleMedico}
                options={{ title: "Detalle Medicos" }}
            />
             <Stack.Screen 
                name= "NuevoMedico"
                component={NuevoMedico}
                options={{ title: "Nuevo/Editar Medicos" }}
            />
        </Stack.Navigator>
    );
}