import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import ConsultoriosCard from "../../Components/ConsultoriosCard";
import { useNavigation } from "@react-navigation/native";
import { listarConsultorios } from "../../Src/Servicios/ConsultoriosService";
import { eliminarConsultorios } from "../../Src/Servicios/ConsultoriosService";
import { Ionicons } from '@expo/vector-icons';




export default function ListarConsultorio() {
const [consultorios, setConsultorios] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();

  const handleConsultorios = async () => {
    setLoading(true);
    try {
      const result = await listarConsultorios();
      if (result.success) {
        setConsultorios(result.data);
      } else {
        Alert.alert("Error", result.message || "no se pudieron cargar los consultorios");
      }
    } catch (error) {
      Alert.alert("Error","no se pudieron cargar los consultorios");
    } finally{
      setLoading(false);
    }
  };

     useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', handleConsultorios);
    return unsubscribe;
   }, [navigation]);


     const handleEliminar = (id) => {
    Alert.alert (
      "Eliminar consultorio",
      "¿estas seguro que deseas elimina el consultorio?",
      [
        {text: "cancelar", style: "cancel"},
        {
          text: "Eliminar",
          style: "destructive",
          onPress:async () => {
            try {
              const result = await eliminarConsultorios(id);
              if(result.success){
                // setActividades(actividades.filter((a) => a.id !== id));
                handleConsultorios();
              }else{
                Alert.alert("Error",result.message || "no se pudo elimina el Consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "no se pudo elimianr el consultorio")
            }
          },
        }
      ]
    )
   }

   const handleEditar = (consultorios) =>{
    navigation.navigate("NuevoConsultorios",{ consultorios });
   }

      const handleCrear = () =>{
    navigation.navigate("NuevoConsultorios");
   }

    if (loading){
    <View>
      <ActivityIndicator size="large" color="#1976D2"/>
    </View>
   }


  return (
   <View style={{ flex: 1}}>

      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>(

        <ConsultoriosCard
        consultorios={item} //pasa el consultorio a la tarjeta
        onEdit={() => handleEditar(item)}  //accion editar
        onDelete={() => handleEliminar(item.id)} //accion eliminar 
        />
      )}
      ListEmptyComponent={<Text>No hay consultorios Registrados.</Text>}
        />
  
            <TouchableOpacity style={styles.boton} onPress={handleCrear} disabled={loading}>
                <View style={styles.botonContent}>
                    <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.botonIcon} />

                    <Text style={styles.textoBoton}>Nuevo paciente</Text>
                </View>

            </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    button: {
        backgroundColor: '#1976D2',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },

    botonCrear: {
        backgroundColor: '#1976D2',
        padding: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
    },
    
    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        // Alineación del contenido dentro del botón para el icono y el texto
        flexDirection: 'row', // Organiza el icono y el texto en fila
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center',   // Centra verticalmente
        width: "80%",
        marginTop: 20,
        // Agregando un poco de sombra para un efecto más bonito
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 8, // Espacio entre el icono y el texto
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

});
