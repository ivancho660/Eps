import { View, Text, StyleSheet } from "react-native";

export default function DetalleCitas({ route }) {
    const { cita } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle de la Cita</Text>
            <Text style={styles.label}>📅 Fecha:</Text>
            <Text style={styles.value}>{cita.fecha}</Text>

            <Text style={styles.label}>⏰ Hora:</Text>
            <Text style={styles.value}>{cita.hora}</Text>

            <Text style={styles.label}>🩺 Especialidad:</Text>
            <Text style={styles.value}>{cita.especialidad}</Text>

            <Text style={styles.label}>👨‍⚕️ Doctor:</Text>
            <Text style={styles.value}>{cita.doctor}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
});
