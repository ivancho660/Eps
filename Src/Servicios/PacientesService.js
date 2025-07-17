import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

// Funciones para manejar los pacientes: listar, crear, editar y eliminar
export const listarPacientes = async () => {
    try {
        const response = await api.get(`/listarPacientes`);
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar pacientes:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};
// Función para eliminar un paciente
export const eliminarPacientes= async (id) =>{
try {
    await api.delete(`/eliminarPacientes/${id}`);
    return {success: true};
} catch (error) {
    console.error("Error al eliminar el paciente:", error.response ? error.response.data : error.message);
    return {
        success: false,
        message: error.response ?  error.response.data.message: "Error de conexión"
    };
}
};
// Función para crear un nuevo paciente
export const crearPacientes = async (data) => {
    try {
        const response = await api.post('/crearPacientes', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear paciente:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};
// Función para editar un paciente
export const editarPacientes = async (id, data) => {
    try {
        const response = await api.put(`/editarPacientes/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar paciente:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

