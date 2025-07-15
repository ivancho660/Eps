import React, { useEffect, useState } from "react";
import {  View,  Text,  FlatList,  StyleSheet,  Alert,  ActivityIndicator,  TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ConsultoriosCard from "../../Components/ConsultoriosCard";
import { listarConsultorios, eliminarConsultorios } from "../../Src/Servicios/ConsultoriosService";

export default function ListarConsultorio() {
  // Estados para manejar los consultorios y el estado de carga
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
// Función para obtener la lista de consultorios
  const handleConsultorios = async () => {
    setLoading(true);
    try {
      const result = await listarConsultorios();
      if (result.success) {
        setConsultorios(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los consultorios");
    } finally {
      setLoading(false);
    }
  };
// carga de los consultorios al montar el componente y al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleConsultorios);
    return unsubscribe;
  }, [navigation]);
// Funciones para manejar las acciones de editar, crear y eliminar consultorios
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Consultorio",
      "¿Estás seguro de eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorios(id);
              if (result.success) {
                handleConsultorios();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el consultorio");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (consultorio) => {
    navigation.navigate("NuevoConsultorios", { consultorios: consultorio });
  };

  const handleCrear = () => {
    navigation.navigate("NuevoConsultorios");
  };
// Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2A7F8C" />
        <Text style={styles.loadingText}>Cargando consultorios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Consultorios</Text>
        <View style={styles.headerLine} />
      </View>

      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultoriosCard
            consultorios={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medical" size={50} color="#D1E7E9" />
            <Text style={styles.emptyText}>No hay consultorios registrados</Text>
          </View>
        }
        contentContainerStyle={consultorios.length === 0 && styles.centered}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.nuevoBoton} onPress={handleCrear}>
  <Ionicons name="medkit" size={20} color="white" style={{ marginRight: 8 }} />
  <Text style={styles.botonTexto}>Nuevo Consultorio</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Fondo azul claro como base
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
    color: "#0D47A1", // Azul fuerte
    backgroundColor: "#BBDEFB", // Azul intermedio
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#1976D2",
    fontWeight: '500',
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
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1976D2', // Azul del botón
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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

});
