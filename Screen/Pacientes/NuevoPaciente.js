import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editarPacientes, crearPacientes } from "../../Src/Servicios/PacientesService";

export default function NuevoPaciente() {
  const navigation = useNavigation();
  const route = useRoute();
// Navegación y parámetros
  const pacientes = route.params?.pacientes;
  const [nombre, setNombre] = useState(pacientes?.nombre || "");
  const [documento, setDocumento] = useState(pacientes?.documento?.toString() || "");
  const [telefono, setTelefono] = useState(pacientes?.telefono || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!pacientes;
// Función que verifica si estamos en modo edición y función para guardar los datos
  const handleGuardar = async () => {
    if (!nombre || !documento || !telefono) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
      return;
    }
    // Validación de campos
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarPacientes(pacientes.id, { nombre, documento, telefono });
      } else {
        result = await crearPacientes({ nombre, documento, telefono });
      }
      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Ocurrió un error al guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el paciente. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esEdicion ? "Editar Paciente" : "Nuevo Paciente"}</Text>
      <View style={styles.headerLine} />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBoton}>
            {esEdicion ? "Guardar Cambios" : "Crear Paciente"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    backgroundColor: "#BBDEFB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    textAlign: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  headerLine: {
    height: 3,
    width: "40%",
    backgroundColor: "#1976D2",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#90CAF9",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#1976D2",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    elevation: 6,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
