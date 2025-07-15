import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalleMedico() {
  const route = useRoute();
  const navigation = useNavigation();
  const { medico } = route.params || {};

  if (!medico) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontraron datos del médico.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👨‍⚕️ Detalle del Médico</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🆔 Documento:</Text>
        <Text style={styles.value}>{medico.documento}</Text>

        <Text style={styles.label}>🧑‍⚕️ Nombre:</Text>
        <Text style={styles.value}>{medico.nombre}</Text>

        <Text style={styles.label}>🩺 Especialidad:</Text>
        <Text style={styles.value}>
          {medico.especialidad?.nombre || "Sin especialidad"}
        </Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#fff" style={styles.botonIcon} />
        <Text style={styles.textoBoton}>Volver</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
    color: "#0D47A1",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  boton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
