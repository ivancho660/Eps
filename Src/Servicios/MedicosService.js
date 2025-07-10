import api from "./Conexion";

export const listarMedicos = async () => {
    try {
        const response = await api.get(`/listarMedicos`);
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar Medicos:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};

export const eliminarMedicos= async (id) =>{
try {
    await api.delete(`/eliminarMedicos/${id}`);
    return {success: true};
} catch (error) {
    console.error("Error al eliminar el Medico:", error.response ? error.response.data : error.message);
    return {
        success: false,
        message: error.response ?  error.response.data.message: "Error de conexión"
    };
}
};

export const crearMedicos = async (data) => {
    try {
        const response = await api.post('/crearMedicos', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear Medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarMedicos = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar Medico:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

