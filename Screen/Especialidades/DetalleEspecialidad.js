import { View, Text, StyleSheet } from "react-native";

export default function DetalleEspecialidad() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalle de Especialidad</Text>
        <Text style={styles.subtext}>Aquí se mostrará la información detallada de la especialidad seleccionada.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 12,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
