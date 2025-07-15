import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo...");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Error de login",
          result.message || "Ocurrió un error al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en el login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
        placeholderTextColor="#90A4AE"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        placeholderTextColor="#90A4AE"
      />

      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={loading}
        style={styles.loginButton}
        textStyle={styles.buttonText}
      />

      <BottonComponent
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={styles.registerButton}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderColor: "#BBDEFB",
    borderWidth: 1,
    marginBottom: 16,
    color: "#0D47A1",
  },
  loginButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerButton: {
    backgroundColor: "#43A047",
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
