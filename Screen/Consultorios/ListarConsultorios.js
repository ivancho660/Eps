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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ConsultoriosCard from "../../Components/ConsultoriosCard";
import { listarConsultorios, eliminarConsultorios } from "../../Src/Servicios/ConsultoriosService";

export default function ListarConsultorio() {
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleConsultorios);
    return unsubscribe;
  }, [navigation]);

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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Consultorios</Text>

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
        ListEmptyComponent={<Text style={styles.emptyText}>No hay consultorios registrados.</Text>}
        contentContainerStyle={consultorios.length === 0 && styles.centered}
      />

      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <View style={styles.botonContent}>
          <Ionicons
            name="add-circle-outline"
            size={20}
            color="#fff"
            style={styles.botonIcon}
          />
          <Text style={styles.textoBoton}>Nuevo Consultorio</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
  boton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
