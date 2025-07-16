import { useEffect } from "react";
import AppNavegacion from "./Src/Navegation/AppNavegacion";
import * as Notifications from 'expo-notifications';
import {View, StyleSheet, Button } from "react-native";

export default function App() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para recibir notificaciones');
      }
    };
    getPermissions();
  }, []);

  const enviarNotificacionLocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola Iván",
        body: "¿Nos vamos a tomar una pola hoy?",
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={styles.container}>
  <AppNavegacion />

  <View style={styles.botonContainer}>
    <Button
      title="Probar notificación local"
      onPress={enviarNotificacionLocal}
      color="#1976D2"
    />
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  botonContainer: {
    marginBottom: 40,
    width: 260,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    // Quita cualquier sombra o fondo que genere borde visual
    backgroundColor: 'transparent',
    borderRadius: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
});

