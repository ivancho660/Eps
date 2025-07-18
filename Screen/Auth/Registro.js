import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useState } from "react";
import { registerUser } from "../../Src/Servicios/AuthService";
import { Picker } from "@react-native-picker/picker";
import BottonComponent from "../../Components/BottonComponent";

export default function RegistroScreen({ navigation }) {
  // Estados para manejar los campos de entrada y el estado de carga
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para manejar el registro del usuario
  const handleRegister = async () => {
    if (!name || !email || !rol || !password || !confirmarPassword|| !telefono || !direccion) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios.");
      return;
    }
    // Validación de formato de correo electrónico
    if (password !== confirmarPassword) {
      Alert.alert("Contraseña", "Las contraseñas no coinciden.");
      return;
    }
    // Validación de contraseña
    setLoading(true);
    try {// Llama al servicio de autenticación para registrar al usuario
      const result = await registerUser(name, email, rol,telefono,direccion, password, confirmarPassword);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          { text: "OK", onPress: () => console.log("Usuario registrado") },
        ]);
      } else {
        Alert.alert("Error", result.message || "Ocurrió un error al registrarse.");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      Alert.alert("Error", "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };
// Retorno del componente con sus respectivos inputs y botones y adicional un picker para seleccionar el rol
  // donde usamos las variables de estado
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        autoCapitalize="none"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder=" Dirección"
        autoCapitalize="none"
        value={direccion}
        onChangeText={setDireccion}
      />
      <Picker
        selectedValue={rol}
        onValueChange={(itemValue) => setRol(itemValue)}
      >
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Usuario" value="user" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />

      <View style={styles.buttonContainer}>
        <BottonComponent
          title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"}
          onPress={handleRegister}
          disabled={loading}
          style={styles.botonAzul}
        />
        <BottonComponent
          title="Iniciar Sesión"
          onPress={() => navigation.navigate("Login")}
          style={styles.botonVerde}
        />
      </View>
    </ScrollView>
  );
}
// Estilos para el componente RegistroScreen
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E3F2FD",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0D47A1",
    backgroundColor: "#BBDEFB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  botonAzul: {
    backgroundColor: "#1976D2",
    marginBottom: 12,
  },
  botonVerde: {
    backgroundColor: "#43A047",
  },
});
