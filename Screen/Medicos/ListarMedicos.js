import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import MedicosCard from "../../Components/MedicosCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedicos } from "../../Src/Servicios/MedicosService";

export default function ListarMedicos() {
  const [medico, setMedico] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleMedicos);
    return unsubscribe;
  }, [navigation]);

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
              Alert.alert("Error", result.message || "No se pudo eliminar el médico");
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el médico");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Médicos</Text>

      {medico.length > 0 ? (
        <FlatList
          style={styles.listContainer}
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
          <Text>No hay médicos registrados</Text>
        </View>
      )}

      <TouchableOpacity style={styles.nuevoBoton} onPress={handleCrear}>
        <Ionicons name="medkit" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.botonTexto}>Nuevo Médico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  nuevoBoton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
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
});
