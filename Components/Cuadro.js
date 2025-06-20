import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // O cualquier otra librería de íconos que uses

export default function Cuadro({ title, onPress, iconName, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.content}>
                <MaterialIcons name={iconName} size={32} color="#007bff" />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    button: {
        width: 140,         // Cuadrado (ancho fijo)
        height: 140,        // Cuadrado (alto fijo)
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    content: {
        alignItems: "center",
    },
    text: {
        marginTop: 8,
        color: "#000",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
});
