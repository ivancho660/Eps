import { View, Text, StyleSheet } from "react-native";

export default function DetallePaciente() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Paciente</Text>
      <View style={styles.headerLine} />
      <View style={styles.content}>
        <Text style={styles.infoText}>Aquí puedes mostrar los detalles del paciente.</Text>
        {/* Más adelante puedes insertar datos dinámicos aquí */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
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
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#0D47A1",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
