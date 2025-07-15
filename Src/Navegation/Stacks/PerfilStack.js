import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from '../../../Screen/Perfil/Perfil';


const  Stack = createNativeStackNavigator();

export default function PerfilStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Perfil"
                component={Perfil}
                options={{
                    title: "Perfil",
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