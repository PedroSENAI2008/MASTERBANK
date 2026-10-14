import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text>Banco Master</Text>
      <Link href="/" style={styles.button}>Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",

    backgroundColor: "#2a2a2e",

  },
  button: {
    backgroundColor: "#303841",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
