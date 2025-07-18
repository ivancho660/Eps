import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CitasCard from "../../Components/CitasCard";
import { useNavigation } from "@react-navigation/native";
import { listarCitas, eliminarCitas } from "../../Src/Servicios/CitasService";
// funcion que me lista las citas 
export default function ListarCitas() {
  // Estados para manejar las citas y el estado de carga
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  // Función para obtener la lista de citas
  const handleCitas = async () => {
    setLoading(true);
    try {
      const result = await listarCitas();
      if (result.success) {
        setCitas(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron obtener los médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);
    }
  };
  // Efecto para cargar las citas al montar el componente y al enfocar la pantalla
  //useEfect me ayuda a a ejecutar la funcion de handleCitas para que me recargue los datos 
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCitas);
    return unsubscribe;
  }, [navigation]);
  // Funciones para manejar las acciones de editar, crear, ver y eliminar citas
  const handleEditar = (citas) => {
    navigation.navigate("NuevaCitas", { citas });
  };

  const handleCrear = () => {
    navigation.navigate("NuevaCitas");
  };

  const handleView = (citas) => {
    navigation.navigate("DetalleCitas", { citas });
  };
  // Función para manejar la eliminación de citas
  const handleEliminar = (id) => {
    Alert.alert("Eliminar Citas", "¿Estás seguro de eliminar esta cita?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarCitas(id);
            if (result.success) {
              handleCitas();
            } else {
              Alert.alert("Error", result.message || "No se pudo eliminar el médico");
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el médico");
          }
        },
      },
    ]);
  };
  // Mostrar un indicador de carga mientras se obtienen las citas
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando citas...</Text>
      </View>
    );
  }

  //retorno los datos y utiliza el componente CitasCard para renderizar cada cita
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Citas</Text>

      {citas.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            // Aquí se renderiza cada tarjeta de cita
            <CitasCard
              citas={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
              onView={() => handleView(item)} // Esto es clave
            />

          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay citas registradas</Text>
        </View>
      )}
      {/* Botón para crear una nueva cita */}
      <TouchableOpacity style={styles.nuevoBoton} onPress={handleCrear}>
        <Ionicons name="medkit" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.botonTexto}>Nueva Cita</Text>
      </TouchableOpacity>
    </View>
  );
}
// Estilos para el componente ListarCitas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Fondo suave azulado
    padding: 15,
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
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  nuevoBoton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  botonTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "500",
  },

});
