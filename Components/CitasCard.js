import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitasCard({ citas, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.fecha}>{citas.fecha}</Text>
                <Text style={styles.detalle}><Text style={styles.label}>🕒 Hora:</Text> {citas.hora}</Text>
                <Text style={styles.detalle}><Text style={styles.label}>🧍 Paciente:</Text> {citas.paciente?.nombre || 'Sin nombre'}</Text>
                <Text style={styles.detalle}><Text style={styles.label}>👨‍⚕️ Médico:</Text> {citas.medico?.nombre || 'Sin nombre'}</Text>
                <Text style={styles.detalle}><Text style={styles.label}>🏥 Consultorio:</Text> {citas.consultorio?.numero || 'Sin consultorio'}</Text>
            </View>

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
        flexDirection: 'row',
        marginTop: 8,
    },
    iconBtn: {
        marginLeft: 10,
    },
});
