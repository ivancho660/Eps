import React, { useEffect, useState } from "react";
import {  View,  Text,  FlatList,  StyleSheet,  Alert,  ActivityIndicator,  TouchableOpacity,} from "react-native";
import PacientesCard from "../../Components/PacientesCard";
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPacientes } from "../../Src/Servicios/PacientesService";
import { Ionicons } from "@expo/vector-icons";
//componente  de listar pacientes con sus respectivos estados y funciones
// Este componente muestra una lista de pacientes y permite crear, editar y eliminar pacientes
export default function ListarPaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
// Función para obtener la lista de pacientes
  const handlePacientes = async () => {
    setLoading(true);
    try {
      const result = await listarPacientes();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los Pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los Pacientes");
    } finally {
      setLoading(false);
    }
  };
// Carga de los pacientes al montar el componente 
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handlePacientes);
    return unsubscribe;
  }, [navigation]);
// Funciones para manejar las acciones de editar, crear y eliminar pacientes
  const handleEliminar = (id) => {
    Alert.alert("Eliminar Paciente", "¿Estás seguro que deseas eliminar este paciente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarPacientes(id);
            if (result.success) {
              handlePacientes();
            } else {
              Alert.alert("Error", result.message || "No se pudo eliminar el Paciente");
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el Paciente");
          }
        },
      },
    ]);
  };
//función para manejar la edición de un paciente
  const handleEditar = (paciente) => {
    navigation.navigate("NuevoPaciente", { pacientes: paciente });
  };
// Función para manejar la creación de un nuevo paciente
  const handleCrear = () => {
    navigation.navigate("NuevoPaciente");
  };
// Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Cargando pacientes...</Text>
      </View>
    );
  }
//retorna la vista principal del componente con la lista de pacientes utilizamos un flatlist para mostrar los pacientes
// y un botón para crear un nuevo paciente
//y el componente PacientesCard para mostrar cada paciente
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Pacientes</Text>
        <View style={styles.headerLine} />
      </View>

      {pacientes.length > 0 ? (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PacientesCard
              pacientes={item}
              onEdit={() => handleEditar(item)}
              onDelete={() => handleEliminar(item.id)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={50} color="#D1E7E9" />
          <Text style={styles.emptyText}>No hay pacientes registrados</Text>
        </View>
      )}

      <TouchableOpacity style={styles.nuevoBoton} onPress={handleCrear} disabled={loading}>
        <Ionicons name="person-add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.botonTexto}>Nuevo Paciente</Text>
      </TouchableOpacity>
    </View>
  );
}
// estilos del componente
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
