import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//componente de medicos para mostrar la información de un medico con sus respectivos datos 
export default function MedicosCard({ medico, onEdit, onDelete }) {
 
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.detalle}>
          <Text style={styles.label}>👨‍⚕️ Médico:</Text> {medico?.nombre || 'Sin nombre'}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🪪 Documento:</Text> {medico?.documento || 'Sin documento'}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🩺 Especialidad:</Text> {medico?.especialidad?.nombre || 'Sin especialidad'}
        </Text>
      </View>
{/*botones para editar y eliminar el medico*/}
      <View style={styles.actions}>
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
//
// Estilos para el componente MedicosCard
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
    gap: 10, // Si tu versión no lo soporta, reemplázalo con marginVertical
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
  editBtn: {
    backgroundColor: '#1976D2',
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
  },
});
