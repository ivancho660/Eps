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
  const [idEspecialidad, setIdEspecialidad] = useState(
    medico?.idEspecialidad?.toString() || ""
  );

  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      const result = await listarEspecialidades();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar las especialidades"
        );
      }
    };
    cargarEspecialidades();
  }, []);

  const esEdicion = !!medico;

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
        Alert.alert(
          "Éxito",
          `Doctor ${esEdicion ? "editado" : "creado"} correctamente`
        );
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
      Alert.alert(
        "Error",
        "Ocurrió un error al guardar el doctor. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Doctor" : "Nuevo Doctor"}
      </Text>

      <Picker
        selectedValue={idEspecialidad}
        onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione una especialidad" value="" />
        {especialidades.map((especialidad) => (
          <Picker.Item
            key={especialidad.id}
            label={especialidad.nombre}
            value={especialidad.id.toString()}
          />
        ))}
      </Picker>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        style={styles.input}
        keyboardType="numeric"
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
            {esEdicion ? "Guardar Cambios" : "Registrar Doctor"}
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
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
