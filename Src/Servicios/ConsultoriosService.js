import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";


export const listarConsultorios = async () => {
    try {
        const response = await api.get(`/listarConsultorios`);
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};

export const eliminarConsultorios= async (id) =>{
try {
    await api.delete(`/eliminarConsultorios/${id}`);
    return {success: true};
} catch (error) {
    console.error("Error al eliminar el consultorio:", error.response ? error.response.data : error.message);
    return {
        success: false,
        message: error.response ?  error.response.data.message: "Error de conexión"
    };
}
};

export const crearConsultorios = async (data) => {
    try {
        const response = await api.post('/crearConsultorios', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear consultorio:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarConsultorios = async (id, data) => {
    try {
        const response = await api.put(`/editarConsultorios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar consultorio:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

