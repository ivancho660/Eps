import React, { useState, useEffect } from "react";
import {  View,  Text,  StyleSheet,  TouchableOpacity,  ScrollView, Switch, Alert} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

export default function Configuracion() {
  const navigation = useNavigation();
  const [permisoNotificaciones, setPermisoNotificaciones] = useState(false);
  const [Loading,setLoading] = useState(true);

// Estado para manejar los permisos de las notificaciones
  useEffect(() => {
    const chechPermisos = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      const preferencia = await AsyncStorage.getItem('notificaciones_activas');
      setPermisoNotificaciones(status === 'granted' && preferencia === 'true');
      setLoading(false);
    };
    chechPermisos();
  }, []);

  if (Loading) {
    return (
      <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <Text>Cargando configuración...</Text>
      </View>
    );
  }

  const toogleSwitch = async (valor) => {
    if(valor) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted'){
        await AsyncStorage.setItem('notificaciones_activas', 'true');
        setPermisoNotificaciones(true);
        Alert.alert("Notificaciones activadas", "Ahora recibirás notificaciones de citas.");
      }else{
        await AsyncStorage.setItem('notificaciones_activas', 'false');
        setPermisoNotificaciones(false);
        Alert.alert("Notificaciones desactivadas", "No recibirás notificaciones.");
      }
    }else{
      await AsyncStorage.setItem('notificaciones_activas', 'false');
      setPermisoNotificaciones(false);
      Alert.alert("Desactivado",
        "si quieres desactivar las notificaciones,hazlo desde la configuración ."
      );
    }

  };

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
          <Text style={styles.optionText}>
            Notificaciones: {permisoNotificaciones ? 'Activadas' : 'Desactivadas'}</Text>{/* se evalua si la variable esta activada o desactivada */}
          <Switch 
          value={permisoNotificaciones}
          onValueChange={toogleSwitch}
          />
        </TouchableOpacity>

        {/* Privacidad */}
        <TouchableOpacity style={styles.option}>
          <Feather name="lock" size={22} color="#1976D2" />
          <Text style={styles.optionText}>Privacidad</Text>
        </TouchableOpacity>

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
