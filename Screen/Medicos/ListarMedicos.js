import React, { useEffect, useState } from "react";
import {  View,  Text,  TouchableOpacity,  StyleSheet,  Alert,  ActivityIndicator,  FlatList,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MedicosCard from "../../Components/MedicosCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedicos } from "../../Src/Servicios/MedicosService";

export default function ListarMedicos() {
  const [medico, setMedico] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
// Función para obtener la lista de médicos
  const handleMedicos = async () => {
    setLoading(true);
    try {
      const result = await listarMedicos();
      if (result.success) {
        setMedico(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron obtener los médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los médicos");
    } finally {
      setLoading(false);
    }
  };
// Carga de los médicos al montar el componente 
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleMedicos);
    return unsubscribe;
  }, [navigation]);
// Funciones para manejar las acciones de editar, crear, ver y eliminar médicos
  const handleEditar = (medico) => {
    navigation.navigate("NuevoMedico", { medico });
  };

  const handleCrear = () => {
    navigation.navigate("NuevoMedico");
  };

  const handleView = (medico) => {
    navigation.navigate("DetalleMedico", { medico });
  };

  const handleEliminar = (id) => {
    Alert.alert("Eliminar Médico", "¿Estás seguro de eliminar este médico?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarMedicos(id);
            if (result.success) {
              handleMedicos();
            } else {
              let mensaje = "No se pudo eliminar el médico.";

              if (typeof result.message === "string") {
                if (result.message.includes("citas asignadas")) {
                  mensaje = "No se puede eliminar el médico porque ya tiene citas asignadas.";
                } else {
                  mensaje = result.message;
                }
              } else if (typeof result.message === "object") {
                const errores = Object.values(result.message).flat();
                mensaje = errores.join("\n");
              }

              Alert.alert("No se puede eliminar", mensaje);
            }
          } catch (error) {
            let mensaje = "No se pudo eliminar el médico. Intenta nuevamente.";

            if (
              error.response &&
              error.response.data &&
              typeof error.response.data.message === "string"
            ) {
              const backendMessage = error.response.data.message;

              if (backendMessage.includes("citas asignadas")) {
                mensaje = "No se puede eliminar el médico porque ya tiene citas asignadas.";
              } else {
                mensaje = backendMessage;
              }
            }

            Alert.alert("No se puede eliminar", mensaje);
          }
        },
      },
    ]);
  };
// Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando médicos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Médicos</Text>
        <View style={styles.headerLine} />
      </View>

      {medico.length > 0 ? (
        <FlatList
          data={medico}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MedicosCard
              medico={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
              onView={() => handleView(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="medkit" size={50} color="#D1E7E9" />
          <Text style={styles.emptyText}>No hay médicos registrados</Text>
        </View>
      )}

      <TouchableOpacity style={styles.nuevoBoton} onPress={handleCrear}>
        <Ionicons name="person-add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.botonTexto}>Nuevo Médico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
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
  },
  headerLine: {
    height: 3,
    width: '40%',
    backgroundColor: '#1976D2',
    borderRadius: 5,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    color: "#0D47A1",
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  nuevoBoton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    marginTop: 20,
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
