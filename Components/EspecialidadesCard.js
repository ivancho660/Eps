import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//componente para mostrar una tarjeta de especialidades
export default function EspecialidadesCard({ especialidades, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.leftIcon}>
        {/* <MaterialCommunityIcons name="stethoscope" size={32} color="#1976D2" /> */}
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre}>👨‍⚕️ {especialidades.nombre} 🩺</Text>
      </View>
{/*botones de editar y eliminar*/}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={24} color="#1976D2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={24} color="#D32F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
// Estilos para el componente EspecialidadesCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  leftIcon: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 12,
  },
});
