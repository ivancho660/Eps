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
      <Text style={styles.title}>👨‍⚕️ Detalle del Médico</Text>

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
    padding: 20,
    backgroundColor: "#F5F5F5",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  boton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1976D2",
    padding: 12,
    borderRadius: 8,
    alignSelf: "center",
    width: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
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
