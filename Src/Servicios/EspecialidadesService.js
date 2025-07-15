import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

// Funciones para manejar las especialidades: listar, crear, editar y eliminar
export const listarEspecialidades = async () => {
    try {
        const response = await api.get(`/listarEspecialidad`);
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar Especialidades:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};

export const eliminarEspecialidades= async (id) =>{
try {
    await api.delete(`/eliminarEspecialidad/${id}`);
    return {success: true};
} catch (error) {
    console.error("Error al eliminar el Especialidades:", error.response ? error.response.data : error.message);
    return {
        success: false,
        message: error.response ?  error.response.data.message: "Error de conexión"
    };
}
};

export const crearEspecialidades = async (data) => {
    try {
        const response = await api.post('/crearEspecialidad', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear Especialidades:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarEspecialidades = async (id, data) => {
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar Especialidades:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

