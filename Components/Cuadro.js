import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Cuadro({
    title,
    onPress,
    iconName,
    style,
    iconColor = "#1976D2",
    backgroundColor = "#ffffff",
}) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <MaterialIcons name={iconName} size={36} color={iconColor} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        height: 140,
        borderRadius: 16,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        margin: 10,
    },
    content: {
        alignItems: "center",
    },
    text: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
});
