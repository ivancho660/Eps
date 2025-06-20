import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from "react-native";

const consultorios = [
  { id: '1', numero: '101', piso: '1' },
  { id: '2', numero: '202', piso: '2' },
  { id: '3', numero: '303', piso: '3' },
];

export default function ListarConsultorio({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.numero}>Consultorio N° {item.numero}</Text>
      <Text style={styles.piso}>Piso: {item.piso}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consultorios</Text>

      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.boton}>
        <Button
          title="Nuevo Consultorio"
          onPress={() => navigation.navigate('NuevoConsultorios')}
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
    backgroundColor: "#e8f0fe",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  numero: {
    fontSize: 16,
    fontWeight: "bold",
  },
  piso: {
    fontSize: 14,
    color: "#555",
  },
  boton: {
    marginTop: 20,
  },
});
