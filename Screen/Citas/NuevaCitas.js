import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button,TouchableOpacity, Alert, ActivityIndicator } from "react-native";


export default function CrearCita() {
    const navigation = useNavigation();
    const route = useRoute();


    const citas = route.params?.citas;
    const [fecha, setFecha] = useState(citas?.fecha||"");
    const [hora, setHora] = useState(citas?.hora ||"");
    const [especialidad, setEspecialidad] = useState(citas?.especialidad ||"");
    const [doctor, setDoctor] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cita</Text>

            <TextInput
                style={styles.input}
                placeholder="Fecha (YYYY-MM-DD)"
                value={fecha}
                onChangeText={setFecha}
            />

            <TextInput
                style={styles.input}
                placeholder="Hora (HH:MM)"
                value={hora}
                onChangeText={setHora}
            />

            <TextInput
                style={styles.input}
                placeholder="Especialidad"
                value={especialidad}
                onChangeText={setEspecialidad}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre del Doctor"
                value={doctor}
                onChangeText={setDoctor}
            />

            <Button
                title="Guardar Cita"
                onPress={() => {
                    // Aquí puedes guardar los datos o enviarlos al backend
                    navigation.navigate("ListarCitas"); // o la pantalla que quieras
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
});
