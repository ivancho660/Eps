import {  View,  Text,  TextInput,  StyleSheet,  TouchableOpacity,  Alert,  ActivityIndicator,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editar} from "../../Src/Servicios/AuthService";

export default function EditarPerfil() {
  const navigation = useNavigation();
  const route = useRoute();
// Navegación y parámetros
  const user = route.params?.user;
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email?.toString() || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!user;
// Función que verifica si estamos en modo edición y función para guardar los datos
  const handleGuardar = async () => {
    if (!name || !email ) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
      return;
    }
    // Validación de campos
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editar(user.id, { name, email });
      } else {
        Alert.alert("Error", "No se puede editar el usuario desde aquí");
      }
      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "usuario actualizado correctamente": ""
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Ocurrió un error al guardar el usuario");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando citas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esEdicion ? "Editar usuario" : "Nuevo usuario"}</Text>
      <View style={styles.headerLine} />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      /> 
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        // keyboardType="numeric"
      />
 

      <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBoton}>
            {esEdicion ? "Guardar Cambios" : "Crear usuario"}
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
