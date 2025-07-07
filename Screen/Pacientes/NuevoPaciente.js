import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editarPacientes, crearPacientes } from "../../Src/Servicios/PacientesService";


export default function NuevoPaciente (){

    const navigation = useNavigation();
    const route = useRoute();


    const pacientes= route.params?.pacientes;
    console.log("Paciente recibido:", pacientes);
    const [nombre, setNombre] = useState(pacientes?.nombre || '');
    const [documento, setDocumento] = useState(pacientes?.documento?.toString() || '');
    const [telefono, setTelefono] = useState(pacientes?.telefono || '');
    const [loading,setLoading] = useState(false);

    const esEdicion = !!pacientes;

    const handleGuardar = async () => {
        if (!nombre || !documento || !telefono ) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarPacientes(pacientes.id, { nombre, documento, telefono});
            } else {
                result = await crearPacientes({ nombre, documento, telefono});
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "paciente actualizado correctamente" : "paciente creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el paciente");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el paciente. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
<View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar paciente" : "Nueva paciente"}</Text>
            <TextInput
                style={styles.input}
                placeholder="nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="documento"
                value={documento}
                onChangeText={setDocumento}
            />
            <TextInput
                style={styles.input}
                placeholder="telefono"
                value={telefono}
                onChangeText={setTelefono}
            />
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear paciente"}</Text>
                )}
            </TouchableOpacity>      
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});