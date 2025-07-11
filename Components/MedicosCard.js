import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MedicosCard({ medico, onEdit, onDelete, onView }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onView} onLongPress={onDelete}>
      <View style={styles.info}>
        <Text style={styles.nombre}>👨‍⚕️ {medico.nombre}</Text>
        <Text style={styles.detalle}>🆔 Documento: {medico.documento}</Text>
        <Text style={styles.detalle}>
          🩺 Especialidad: {medico.especialidad?.nombre || 'Sin especialidad'}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={24} color="#1976D2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={24} color="#D32F2F" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 10,
  },
});
