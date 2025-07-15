import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";


export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return {success: true, data: response.data};
    }catch (error){
        console.error("error al listar citas:", error.response ? error.response.data : error.message);
        return {
            sucess: false,
            message: error.response ? error.response.data : "error de conexión"
        };
    }
};

export const eliminarCitas = async (id) => {
  try {
    await api.delete(`/eliminarCitas/${id}`);
    return { success: true };
  } catch (error) {
    let message = "Error al eliminar la cita.";

    if (error.response && error.response.data) {
      const data = error.response.data;

      if (typeof data.message === "string") {
        // Detecta si el backend envía un error por relación de integridad
        if (data.message.includes("citas asignadas") || data.message.includes("23000")) {
          message = "No se puede eliminar la cita porque ya está relacionada con otro registro.";
        } else {
          message = data.message;
        }
      } else if (typeof data.message === "object") {
        const errores = Object.values(data.message).flat();
        message = errores.join("\n");
      }
    }

    return {
      success: false,
      message,
    };
  }
};


export const crearCitas = async (data) => {
    try {
        const response = await api.post('/crearCitas', data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al crear cita:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

export const editarCitas = async (id, data) => {
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar cita:", error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data.message : "Error de conexión",
        };
    }
};

