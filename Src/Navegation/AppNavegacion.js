import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

// Importar los stacks de navegación
// Aquí puedes importar los stacks que has creado
export default function AppNavegacion() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);
// Crea una referencia para el estado de la aplicación
    // y una variable de estado para el token del usuario
    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (e) {
            console.error("Error al cargar el token desde AsyncStorage:", e);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadToken(); //Carga inicial del token
    }, []);
// Carga el token al iniciar la aplicación
    // y establece isLoading en false una vez que se ha cargado
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log("App ha vuelto a estar activa, verficando el token...");
                loadToken(); //Recarga el token al volver a la app
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const interval = setInterval(() => {
                if (AppState.currentState === 'active') {
                    loadToken(); //Recarga el token cada 2 minutos si la app está activa
                }
        }, 2000);
        return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <NavegacionPrincipal/> : <AuthNavegacion/>}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});