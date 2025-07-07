import { View, ScrollView } from "react-native"
import {Entypo,AntDesign,Feather} from '@expo/vector-icons';
import Cuadro from "../../Components/Cuadro";


export default function Inicio({ navigation }) {

    return (
        <ScrollView>
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
            }}>
                <Cuadro
                    title="Citas"
                    iconName="event"
                    onPress={() => navigation.navigate("citasStack")}
                />
                <Cuadro
                    title="Consultorios"
                    iconName="local-hospital"
                    onPress={() => navigation.navigate("consultoriosStack")}
                    
                />
                <Cuadro
                    title="Especialidades"
                    iconName="payment"
                    onPress={() => navigation.navigate("especialidadesStack")}
                />
                <Cuadro
                    title="Medicos"
                    iconName="person"
                    onPress={() => navigation.navigate("medicosStack")}
                />
                <Cuadro
                    title="Pacientes"
                    iconName="attach-money"
                    onPress={() => navigation.navigate("pacientesStack")}
                />
            </View>
        </ScrollView>
    );
}