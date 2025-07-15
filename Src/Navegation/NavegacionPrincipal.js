import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#757575',
                tabBarStyle: { backgroundColor: '#0D47A1' },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false, // 👈 Esto oculta el encabezado del Tab
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Configuracion"
                component={ConfiguracionStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
