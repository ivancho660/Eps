import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  useColorScheme
} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";

export default function Configuracion() {
  const systemTheme = useColorScheme(); // "light" o "dark"
  const [isDarkMode, setIsDarkMode] = React.useState(systemTheme === "dark");

  const colors = {
    background: isDarkMode ? "#121212" : "#f9f9f9",
    card: isDarkMode ? "#1e1e1e" : "#fff",
    text: isDarkMode ? "#ffffff" : "#333333",
    border: isDarkMode ? "#444" : "#ddd",
    icon: "#007bff",
    logout: "#ff4d4f",
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Configuración</Text>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]}>
          <AntDesign name="user" size={24} color={colors.icon} />
          <Text style={[styles.optionText, { color: colors.text }]}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]}>
          <MaterialIcons name="notifications-none" size={24} color={colors.icon} />
          <Text style={[styles.optionText, { color: colors.text }]}>Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]}>
          <Feather name="lock" size={24} color={colors.icon} />
          <Text style={[styles.optionText, { color: colors.text }]}>Privacidad</Text>
        </TouchableOpacity>

        <View style={[styles.option, { backgroundColor: colors.card, justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="moon" size={24} color={colors.icon} />
            <Text style={[styles.optionText, { color: colors.text }]}>Modo oscuro</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            thumbColor={isDarkMode ? "#007bff" : "#ccc"}
            trackColor={{ false: "#999", true: "#007bff" }}
          />
        </View>

        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    width: "100%",
  },
  option: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
