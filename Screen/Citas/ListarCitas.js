import React from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const citas = [
  {
    id: '1',
    paciente: 'Juan Pérez',
    fecha: '2025-06-21',
    hora: '09:00',
    especialidad: 'Medicina General',
    doctor: 'Dr. Gómez',
  },
  {
    id: '2',
    paciente: 'Ana Gómez',
    fecha: '2025-06-22',
    hora: '10:30',
    especialidad: 'Pediatría',
    doctor: 'Dra. Ramírez',
  },
  {
    id: '3',
    paciente: 'Luis Torres',
    fecha: '2025-06-23',
    hora: '14:15',
    especialidad: 'Dermatología',
    doctor: 'Dr. Castaño',
  },
];

export default function ListarCitas({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalleCitas', { cita: item })}
    >
      <Text style={styles.nombre}>{item.paciente}</Text>
      <Text style={styles.detalle}>📅 {item.fecha}  ⏰ {item.hora}</Text>
      <Text style={styles.detalle}>🩺 {item.especialidad}</Text>
      <Text style={styles.detalle}>👨‍⚕️ {item.doctor}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.boton}>
        <Button
          title="Nueva Cita"
          onPress={() => navigation.navigate('NuevaCitas')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detalle: {
    fontSize: 14,
    color: "#555",
  },
  boton: {
    marginTop: 20,
  },
});
