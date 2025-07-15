import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import EspecialidadesCard from "../../Components/EspecialidadesCard";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidades } from "../../Src/Servicios/EspecialidadesService";
import { Ionicons } from "@expo/vector-icons";

export default function ListarPaciente() {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleEspecialidades = async () => {
    setLoading(true);
    try {
      const result = await listarEspecialidades();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleEspecialidades);
    return unsubscribe;
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar Especialidad",
      "¿Estás seguro que deseas eliminar esta especialidad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarEspecialidades(id);
              if (result.success) {
                handleEspecialidades();
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la especialidad");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (especialidades) => {
    navigation.navigate("NuevaEspecialidad", { especialidades });
  };

  const handleCrear = () => {
    navigation.navigate("NuevaEspecialidad");
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2A7F8C" />
        <Text style={styles.loadingText}>Cargando especialidades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Especialidades</Text>
        <View style={styles.headerLine} />
      </View>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EspecialidadesCard
            especialidades={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="medkit" size={50} color="#D1E7E9" />
            <Text style={styles.emptyText}>No hay especialidades registradas</Text>
          </View>
        }
        contentContainerStyle={especialidades.length === 0 && styles.centered}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <View style={styles.botonContent}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.botonIcon} />
          <Text style={styles.textoBoton}>Nueva especialidad</Text>
        </View>
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
    width: "40%",
    backgroundColor: "#1976D2",
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
    fontWeight: "500",
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
    textAlign: "center",
    fontWeight: "500",
  },
  boton: {
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
  botonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  botonIcon: {
    marginRight: 8,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
