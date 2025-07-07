import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native"    
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { editarConsultorios, crearConsultorios } from "../../Src/Servicios/ConsultoriosService";

export default function NuevoConsultorio (){

    const navigation = useNavigation();
    const route = useRoute();

    const consultorios= route.params?.consultorios;
    const [numero, setNumero] = useState(consultorios?.numero?.toString() || '');
    const [piso, setPiso] = useState(consultorios?.piso?.toString() || '');
    const [loading,setLoading] = useState(false);

    const esEdicion = !!consultorios;

    const handleGuardar = async () => {
        if (!numero || !piso ) {
            Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            let result;
            if (esEdicion) {
                result = await editarConsultorios(consultorios.id, { numero, piso});
            } else {
                result = await crearConsultorios({ numero, piso});
            }
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Ocurrió un error al guardar el Consultorio");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el Consultorio. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    }
    return (
         <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nueva Consultorio"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Numero"
                value={numero}
                onChangeText={setNumero}
            />
            <TextInput
                style={styles.input}
                placeholder="piso"
                value={piso}
                onChangeText={setPiso}
            />
            <TouchableOpacity
                style={styles.boton} onPress={handleGuardar} disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Consultorio"}</Text>
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