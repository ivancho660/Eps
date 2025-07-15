import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { editarEspecialidades, crearEspecialidades } from "../../Src/Servicios/EspecialidadesService";

export default function NuevoEspecialidad() {
  const navigation = useNavigation();
  const route = useRoute();

  const especialidades = route.params?.especialidades;
  const [nombre, setNombre] = useState(especialidades?.nombre || '');
  const [loading, setLoading] = useState(false);

  const esEdicion = !!especialidades;

  const handleGuardar = async () => {
    if (!nombre) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (esEdicion) {
        result = await editarEspecialidades(especialidades.id, { nombre });
      } else {
        result = await crearEspecialidades({ nombre });
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Especialidad actualizada correctamente" : "Especialidad creada correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Ocurrió un error al guardar la especialidad");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la especialidad. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Guardando especialidad...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la especialidad"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
      >
        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.saveButtonText}>
          {esEdicion ? "Guardar Cambios" : "Crear Especialidad"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 30,
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
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "500",
  },
});
