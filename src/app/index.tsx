import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Banco Master</Text>
      <Link href="/sobre" style={styles.button}>Sobre</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2a2a2e",
    color: "#fff",
    fontSize: 20,

  },
  button: {
    backgroundColor: "#303841",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },

  
  CardDashboard: {
   backgroundColor: "#090931",
   padding: 20,
   borderRadius: 10,

  },

  CardSaldo:{
    backgroundColor: "#090931",
    padding: 20,
    borderRadius: 10,
  }
});
