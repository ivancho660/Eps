import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadesService";
import { crearMedicos, editarMedicos } from "../../Src/Servicios/MedicosService";

export default function NuevoMedico() {
  const navigation = useNavigation();
  const route = useRoute();
  const medico = route.params?.medico;

  const [nombre, setNombre] = useState(medico?.nombre || "");
  const [documento, setDocumento] = useState(medico?.documento?.toString() || "");
  const [idEspecialidad, setIdEspecialidad] = useState(medico?.idEspecialidad?.toString() || "");
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);

  const esEdicion = !!medico;

  useEffect(() => {
    const cargarEspecialidades = async () => {
      const result = await listarEspecialidades();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    };
    cargarEspecialidades();
  }, []);

  const handleGuardar = async () => {
    if (!nombre || !documento || !idEspecialidad) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarMedicos(medico.id, {
          nombre,
          documento,
          idEspecialidad: parseInt(idEspecialidad),
        });
      } else {
        result = await crearMedicos({
          nombre,
          documento,
          idEspecialidad: parseInt(idEspecialidad),
        });
      }

      if (result?.success) {
        Alert.alert("Éxito", `Doctor ${esEdicion ? "editado" : "creado"} correctamente`);
        navigation.goBack();
      } else {
        let errorMsg = "No se pudo guardar el doctor";
        if (typeof result.message === "object") {
          errorMsg = Object.entries(result.message)
            .map(([key, val]) => `${key}: ${val.join(", ")}`)
            .join("\n");
        } else if (typeof result.message === "string") {
          errorMsg = result.message;
        }
        Alert.alert("Error", errorMsg);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el doctor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Médico" : "Registrar Médico"}
      </Text>

      <Picker
        selectedValue={idEspecialidad}
        onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
        style={styles.input}
        dropdownIconColor="#0D47A1"
      >
        <Picker.Item label="Seleccione una especialidad" value="" />
        {especialidades.map((esp) => (
          <Picker.Item key={esp.id} label={esp.nombre} value={esp.id.toString()} />
        ))}
      </Picker>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Médico"}
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
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    textAlign: "center",
    backgroundColor: "#BBDEFB",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
