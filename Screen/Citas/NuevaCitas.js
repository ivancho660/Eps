import React, { useState, useEffect } from "react";
import {  View,  Text,  StyleSheet,  TouchableOpacity,  Alert,  ActivityIndicator,  Platform,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { listarMedicos } from "../../Src/Servicios/MedicosService";
import { listarPacientes } from "../../Src/Servicios/PacientesService";
import { listarConsultorios } from "../../Src/Servicios/ConsultoriosService";
import { crearCitas, editarCitas } from "../../Src/Servicios/CitasService";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CrearCita() {
  // Navegación y parámetros
  const navigation = useNavigation();
  const route = useRoute();
  const citas = route.params?.citas;
// Verificar si estamos en modo edición
  const esEdicion = !!citas;
// Estados para manejar los campos de entrada
  const [fecha, setFecha] = useState(citas?.fecha || "");
const [hora, setHora] = useState(() => {
  if (!citas?.hora) return "";
  
  // Si el formato es HH:MM:SS, devuelvo solo HH:MM
  if (citas.hora.includes(":")) {
    return citas.hora.slice(0, 5); // "14:30:00" => "14:30"
  }

  return citas.hora;
});// Estados para manejar los selectores
  const [idPacientes, setIdPacientes] = useState(citas?.idPacientes?.toString() || "");
  const [idMedicos, setIdMedicos] = useState(citas?.idMedicos?.toString() || "");
  const [idConsultorio, setIdConsultorio] = useState(citas?.idConsultorio?.toString() || "");

  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  const [mostrarPickerHora, setMostrarPickerHora] = useState(false);
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);

  // Cargar datos
  useEffect(() => {
    const cargarDatos = async () => {
      const resPacientes = await listarPacientes();
      if (resPacientes.success) setPacientes(resPacientes.data);

      const resMedicos = await listarMedicos();
      if (resMedicos.success) setMedicos(resMedicos.data);

      const resConsultorios = await listarConsultorios();
      if (resConsultorios.success) setConsultorios(resConsultorios.data);
    };
    cargarDatos();
  }, []);

  // Si estamos en modo edición, establecer los valores iniciales
  useEffect(() => {
    if (esEdicion) {
      setIdPacientes(citas.idPacientes.toString());
      setIdMedicos(citas.idMedicos.toString());
      setIdConsultorio(citas.idConsultorio.toString());
    }
  }, [pacientes, medicos, consultorios]);
// Función para manejar el guardado de la cita
  const handleGuardar = async () => {
    if (!fecha || !hora || !idPacientes || !idMedicos || !idConsultorio) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
// Validar que la fecha y hora sean válidas
    setLoading(true);

    try {
      let result;
      const payload = {
        fecha,
        hora,
        idPacientes: parseInt(idPacientes),
        idMedicos: parseInt(idMedicos),
        idConsultorio: parseInt(idConsultorio),
      };
// Si estamos en edición, usamos editarCitas, de lo contrario crearCitas
      result = esEdicion ? await editarCitas(citas.id, payload) : await crearCitas(payload);
// Manejo de la respuesta
      if (result?.success) {
        Alert.alert("Éxito", `Cita ${esEdicion ? "Actualizada" : "creada"} correctamente`);
        navigation.goBack();
      } else {
        const errorMsg = typeof result.message === "object"
          ? Object.entries(result.message).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n")
          : result.message || "No se pudo guardar la cita";

        Alert.alert("Error", errorMsg);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar la cita.");
    } finally {
      setLoading(false);
    }
  };

  // Mostrar el selector Fecha 
  const mostrarSelectorFecha = () => setMostrarPickerFecha(true);
  const cambiarFecha = (event, selectedDate) => {
    setMostrarPickerFecha(false);
    if (selectedDate) {
      setFecha(selectedDate.toISOString().split("T")[0]);
    }
  };
// Mostrar el selector de hora
  const mostrarSelectorHora = () => setMostrarPickerHora(true);
  const cambiarHora = (event, selectedTime) => {
    setMostrarPickerHora(false);
    if (selectedTime) {
      const horas = selectedTime.getHours().toString().padStart(2, "0");
      const minutos = selectedTime.getMinutes().toString().padStart(2, "0");
      setHora(`${horas}:${minutos}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

      {/* Pacientes */}
      <Picker selectedValue={idPacientes} onValueChange={setIdPacientes} style={styles.input}>
        <Picker.Item label="Seleccione un paciente" value="" />
        {pacientes.map((p) => (
          <Picker.Item key={p.id} label={`Paciente: ${p.nombre}`} value={p.id.toString()} />
        ))}
      </Picker>

      {/* Médicos */}
      <Picker selectedValue={idMedicos} onValueChange={setIdMedicos} style={styles.input}>
        <Picker.Item label="Seleccione un médico" value="" />
        {medicos.map((m) => (
          <Picker.Item key={m.id} label={`Médico: ${m.nombre}`} value={m.id.toString()} />
        ))}
      </Picker>

      {/* Consultorios */}
      <Picker selectedValue={idConsultorio} onValueChange={setIdConsultorio} style={styles.input}>
        <Picker.Item label="Seleccione un consultorio" value="" />
        {consultorios.map((c) => (
          <Picker.Item key={c.id} label={`Consultorio: ${c.numero}`} value={c.id.toString()} />
        ))}
      </Picker>

      {/* Fecha */}
      <TouchableOpacity onPress={mostrarSelectorFecha} style={styles.input}>
        <Text>{fecha || "Selecciona una fecha"}</Text>
      </TouchableOpacity>
      {mostrarPickerFecha && (
        <DateTimePicker
          value={fecha ? new Date(fecha) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={cambiarFecha}
        />
      )}

      {/* Hora */}
      <TouchableOpacity onPress={mostrarSelectorHora} style={styles.input}>
        <Text>{hora || "Selecciona una hora"}</Text>
      </TouchableOpacity>
      {mostrarPickerHora && (
        <DateTimePicker
          value={hora ? new Date(`1970-01-01T${hora}:00`) : new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={cambiarHora}
          is24Hour={true}
        />
      )}

      {/* Botón */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Cita"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD", // fondo azulado suave
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 24,
    textAlign: "center",
    backgroundColor: "#BBDEFB",
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    elevation: 1,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

