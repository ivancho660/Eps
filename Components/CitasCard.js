import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitasCard({ citas, onEdit, onDelete, onView }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.fecha}>📅 Fecha:{citas.fecha}</Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🕒 Hora:</Text> {citas.hora}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🧍 Paciente:</Text> {citas.paciente?.nombre || 'Sin nombre'}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>👨‍⚕️ Médico:</Text> {citas.medico?.nombre || 'Sin nombre'}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🏥 Consultorio:</Text> {citas.consultorio?.numero || 'Sin consultorio'}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onView} style={[styles.iconBtn, styles.viewBtn]}>
          <Ionicons name="eye-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={[styles.iconBtn, styles.editBtn]}>
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={[styles.iconBtn, styles.deleteBtn]}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  info: {
    flex: 1,
  },
  fecha: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  detalle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  viewBtn: {
    backgroundColor: '#0288D1',
  },
  editBtn: {
    backgroundColor: '#1976D2',
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
  },
});
