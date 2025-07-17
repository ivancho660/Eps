import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

//componete que muestra una tarjeta de consultorios con la información detallada
export default function ConsultoriosCard({ consultorios, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <View style={styles.titleRow}>
                    <MaterialCommunityIcons name="hospital-building" size={22} color="#0D47A1" style={styles.iconLeft} />
                    <Text style={styles.titulo}>Consultorio #{consultorios.numero}</Text>
                </View>
                <Text style={styles.detalle}><Text style={styles.label}>🏢 Piso:</Text> {consultorios.piso}</Text>
            </View>
               {/* Botónes de acciones para editar eliminar consultorios */}

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

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
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
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconLeft: {
        marginRight: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
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
        marginLeft: 12,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    editBtn: {
        backgroundColor: "#1976D2",
    },
    deleteBtn: {
        backgroundColor: "#D32F2F",
    },
});
