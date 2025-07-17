import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BottonComponent";
import api from "../../Src/Servicios/Conexion";
import { LogoutUser } from "../../Src/Servicios/AuthService";
import { editar } from "../../Src/Servicios/AuthService";
import { useNavigation } from '@react-navigation/native';




// Componente para mostrar el perfil del usuario
//  Este componente muestra la información del usuario, incluyendo su imagen de perfil, nombre, email, teléfono y dirección. También permite editar el perfil y cerrar sesión.

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
// URL base de la API
  // Puedes cambiar esta URL según tu configuración de backend
  const BASE_URL = "http://172.30.5.127:8000";

  // Cargar el perfil del usuario al montar el componente


   const cargarPerfil = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No se encontró el token, redirigiendo al login...");
        return;
      }

      const response = await api.get("/traerDatos");
      setUsuario(response.data);
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      Alert.alert("Error", "Ocurrió un error al cargar el perfil.");
    } finally {
      setLoading(false);
    }
  };
//usamos useEffect para cargar el perfil cuando el componente se monta
  // y también para recargarlo cuando la pantalla se enfoca
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarPerfil();
    });

    return unsubscribe;
  }, [navigation]);
//función para manejar la edición del perfil
//funciioon de cargar el perfil del usuario
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }
  // Si no hay usuario, mostrar un mensaje de error
  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.errorText}>No se pudo cargar el perfil del usuario.</Text>
        </View>
      </View>
    );
  }

// Función para manejar la edición del perfil
  const handleEditar = (user) => {
    navigation.navigate("EditarPerfil", { user: user });
  };

// Renderizado del perfil del usuario
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.card}>

        {/* Imagen de perfil circular */}
        <View style={styles.avatarContainer}>
          <Image
                    source={{
                      uri: `${BASE_URL}/storage/usuarios/imagenes/${usuario.user.imagen}`,
                    }}
                    style={styles.avatar}
                  />
        </View>


        <Text style={styles.profileText}>
          <Text style={styles.input}>👤 Nombre:</Text> {usuario.user.name || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>📧 Email:</Text> {usuario.user.email || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>📧 Telefono:</Text> {usuario.user.telefono || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>📧 Dirección:</Text> {usuario.user.direccion || "No disponible"}
        </Text>

        <View style={styles.buttons}>


          <BottonComponent
            title="Editar Perfil"
            onPress={() => handleEditar(usuario.user)} // ✅ así pasas los datos
            style={styles.editBtn}
          />


          <BottonComponent
            title="Cerrar Sesión"
            onPress={async () => {
              await LogoutUser();
            }}
            style={styles.logoutBtn}
          />
        </View>
      </View>
    </View>
  );
}




// Estilos para el componente Perfil
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0D47A1",
    backgroundColor: "#BBDEFB",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    textAlign: "center",
    elevation: 4,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1976D2",
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  label: {
    fontWeight: "bold",
    color: "#1976D2",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
  buttons: {
    marginTop: 20,
    width: "100%",
    gap: 12,
  },
  editBtn: {
    backgroundColor: "#1976D2",
  },
  logoutBtn: {
    backgroundColor: "#D32F2F",
  },
});
