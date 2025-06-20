import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService"; // Asegúrate de que la ruta sea correcta

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ loading, setLoading ] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!",[
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo automaticamente...");
            },
          },
        ]);
      } else{
        Alert.alert(
          "Error de login",
          result.message || "Ocurrio un error al iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error inesperado en el login:", error);
      Alert.alert(
        "Error", 
        "Ocurrió un error inesperado al intentar iniciar sesión."
      );
    } finally{
      setLoading(false); //simepre desactiva el indecador de carga
    }
    };
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}

      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
      />
      
      <BottonComponent
        title="¿no tienes cuenta? Registrate"
        onPress={() => navigation.navigate("Registro")}
        style={{backgroundColor: "#43A047" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
