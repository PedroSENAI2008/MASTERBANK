import { StyleSheet, Text, View } from "react-native";

interface CardSaldoProps {
    titulo: string;
    valor: string | number;
    corfundo: string;
}

export default function CardSaldo({ titulo, valor, corfundo }: CardSaldoProps) {
    return (
        <View style={[styles.card, { backgroundColor: corfundo }]}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.valor}>{valor}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        minHeight: 100,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    titulo: {
        fontSize: 16,
        color: "#fff",
    },
    valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
});