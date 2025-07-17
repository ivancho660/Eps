import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
// Servicios de autenticación para manejar el inicio de sesión, registro y cierre de sesión
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token }
    } catch (error) {
        console.error(
            "Error login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};
// Función para cerrar sesión y eliminar el token del almacenamiento
// Esta función se puede usar para cerrar sesión del usuario
export const LogoutUser = async () => {
try {
    await api.post('/cerrar');
    await AsyncStorage.removeItem('userToken');
    return { success: true };
} catch (error) {
    console.error(
        "Error al cerrar sesión:",
        error.response ? error.response.data : error.message
    );
    return{
        success: false,
        message: error.response
            ? error.response.data.message
            : "Error al cerrar sesión",
    };
}
};
// Función para registrar un nuevo usuario
// Esta función se puede usar para registrar un nuevo usuario en la aplicación
export const registerUser = async (name, email, rol, telefono, direccion, password) => {
    try {
        const response = await api.post('/registrar', {
            name,
            email,
            rol,
            telefono,
            direccion,
            password
        });
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al registrar usuario:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};
// Función para obtener el perfil del usuario
// Esta función se puede usar para obtener los datos del perfil del usuario autenticado
    export const actualizarPerfil = async (data) => {
    try {
        const response = await api.put('/actualizarPerfil', data);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error al actualizar perfil:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al conectar con el servidor",
        };
    }
};