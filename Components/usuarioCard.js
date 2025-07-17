import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserCard({ user, onEdit  }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nombre}>
          <Text style={styles.label}>🧍 Nombre: </Text>{user?.name}
        </Text>
        <Text style={styles.detalle}>
          <Text style={styles.label}>🪪 email: </Text>{user?.email}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={[styles.iconBtn, styles.editBtn]}>
             <Text style={styles.label}>🪪 email: </Text>{user?.email}
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
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0D47A1',
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
    gap: 10, // si usas RN >0.71
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
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
