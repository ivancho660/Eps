import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editarEspecialidades, crearEspecialidades } from "../../Src/Servicios/EspecialidadesService";


export default function NuevoEspecialidad (){

    const navigation = useNavigation();
    const route = useRoute();


    const especialidades= route.params?.especialidades;
    const [nombre, setNombre] = useState(especialidades?.nombre || '');
    const [loading,setLoading] = useState(false);

    const esEdicion = !!especialidades;

    const handleGuardar = async () => {
        if (!nombre) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarEspecialidades(especialidades.id, { nombre});
            } else {
                result = await crearEspecialidades({ nombre});
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "especialidad actualizado correctamente" : "especialidad creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar la especialidad");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la especialidad. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
<View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar especialidad" : "Nueva especialidad"}</Text>
            <TextInput
                style={styles.input}
                placeholder="nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear especialidad"}</Text>
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