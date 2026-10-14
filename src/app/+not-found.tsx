import { Text, View, StyleSheet } from "react-native";
import { Link , Stack} from "expo-router";


export default function NotFoundScreen() {
  return (
    <Stack.Screen options={{ title: "Página não encontrada" }}>

    <View style={styles.container}>
    
      <Text>Página não encontrada</Text>
      <Link href="/" style={styles.button}>Retornar ao Início</Link>
    </View>  
    </Stack.Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#0c0c0c",
    color: "#fff",
    fontSize: 20,

  },
  button: {
    backgroundColor: "#303841",
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});