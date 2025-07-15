import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editarConsultorios, crearConsultorios } from "../../Src/Servicios/ConsultoriosService";

export default function NuevoConsultorio() {
// Navegación y parámetros
    const navigation = useNavigation();
    const route = useRoute();

    const consultorios = route.params?.consultorios;
    const [numero, setNumero] = useState(consultorios?.numero?.toString() || '');
    const [piso, setPiso] = useState(consultorios?.piso?.toString() || '');
    const [loading, setLoading] = useState(false);

    const esEdicion = !!consultorios;
// Verificar si estamos en modo edición
    const handleGuardar = async () => {
        if (!numero || !piso) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }// Validación de campos
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarConsultorios(consultorios.id, { numero, piso });
            } else {
                result = await crearConsultorios({ numero, piso });
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el Consultorio");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el Consultorio. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nueva Consultorio"}</Text>
            <Text style={styles.label}>Numero de consultorio</Text>
            <TextInput
                style={styles.input}
                placeholder="Numero de consultorio"
                value={numero}
                onChangeText={setNumero}
            />
            <Text style={styles.label}>Piso del consultorio</Text>

            <TextInput

                style={styles.input}
                placeholder="Piso del consultorio"
                value={piso}
                onChangeText={setPiso}
            />
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Consultorio"}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD", // Fondo azul claro, igual a Citas
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 20,
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  boton: {
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
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
