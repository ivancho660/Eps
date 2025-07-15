import { View, Text, StyleSheet } from "react-native";

export default function DetalleCitas({ route }) {
  const { citas } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗓️ Detalle de la Cita</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Fecha:</Text>
        <Text style={styles.value}>{citas.fecha}</Text>

        <Text style={styles.label}>⏰ Hora:</Text>
        <Text style={styles.value}>{citas.hora}</Text>

        <Text style={styles.label}>👨‍⚕️ Médico:</Text>
        <Text style={styles.value}>{citas.medico?.nombre || 'Sin nombre'}</Text>

        <Text style={styles.label}> 🏥 Consultorio:</Text>
        <Text style={styles.value}>{citas.consultorio?.numero || 'Sin consultorio'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Fondo azul claro
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 24,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});
