import { TouchableOpacity, Text, StyleSheet } from "react-native";

//comonente botón uqe se puede reutilizar en diferentes pantallas
// permite personalizar el estilo y la funcionalidad del botón
export default function CustomButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
// Estilos del botón
const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 16,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});
