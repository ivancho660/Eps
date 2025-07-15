import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Configuracion() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Configuración</Text>

      <View style={styles.section}>
        {/* Perfil */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Perfil")}
        >
          <AntDesign name="user" size={22} color="#1976D2" />
          <Text style={styles.optionText}>Perfil</Text>
        </TouchableOpacity>

        {/* Notificaciones */}
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="notifications-none" size={22} color="#1976D2" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>

        {/* Privacidad */}
        <TouchableOpacity style={styles.option}>
          <Feather name="lock" size={22} color="#1976D2" />
          <Text style={styles.optionText}>Privacidad</Text>
        </TouchableOpacity>

        {/* Modo oscuro desactivado visualmente */}
   
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0D47A1",
    textAlign: "center",
    backgroundColor: "#BBDEFB",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  section: {
    width: "100%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    fontWeight: "600",
  },
});
