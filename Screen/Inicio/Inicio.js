import { View, ScrollView, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Cuadro from "../../Components/Cuadro";
//funcion Inicio que representa la pantalla de inicio de la aplicación
// se importa el componenete de cuadro que se utiliza para crear los cuadros de navegación y poder vijar a 
// las diferentes pantallas de la aplicación
export default function Inicio({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            {/* Encabezado llamativo */}
            <View style={styles.header}>
                <MaterialIcons name="local-hospital" size={40} color="#ee0606ff" />
                <Text style={styles.headerText}>Centro Médico General</Text>
            </View>

            {/* Cuadros de navegación */}
            <View style={styles.grid}>
                <Cuadro
                    title="Citas"
                    iconName="event"
                    iconColor="#C2185B"
                    backgroundColor="#E3F2FD"
                    onPress={() => navigation.navigate("citasStack")}
                />
                <Cuadro
                    title="Consultorios"
                    iconName="local-hospital"
                    iconColor="#ee0606ff"
                    backgroundColor="#E3F2FD"
                    onPress={() => navigation.navigate("consultoriosStack")}
                />
                <Cuadro
                    title="Especialidades"
                    iconName="category"
                    iconColor="#388E3C"
                    backgroundColor="#E3F2FD"
                    onPress={() => navigation.navigate("especialidadesStack")}
                />
                <Cuadro
                    title="Médicos"
                    iconName="medical-services"
                    iconColor="#F57C00"
                    backgroundColor="#E3F2FD"
                    onPress={() => navigation.navigate("medicosStack")}
                />
                <Cuadro
                    title="Pacientes"
                    iconName="groups"
                    iconColor="#0D47A1"
                    backgroundColor="#E3F2FD"
                    onPress={() => navigation.navigate("pacientesStack")}
                />
            </View>
        </ScrollView>
    );
}
//EStilos para la pantalla de inicio

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#BBDEFB",
    },
    header: {
        backgroundColor: "#0D47A1", // Azul fuerte y profesional
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 20,
    },
    headerText: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingBottom: 30,
        gap: 10,
    },
});
