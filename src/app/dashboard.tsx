import CardSaldo from '@/app/components/CardSaldo';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface Transacao {
  id: number;
  description: string;
  amount: number | string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export default function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [saldo, setSaldo] = useState<number>(0);
  const [receitas, setReceitas] = useState<number>(0);
  const [despesas, setDespesas] = useState<number>(0);

    const API_URL = "http://10.141.249.35:8000/api/transactions";

  function calcularTotais(dados: Transacao[]): void {
    let totalReceita = 0;
    let totalDespesa = 0;
    dados.forEach((item) => {
      const valorNumerico = typeof item.amount === 'number' ? item.amount : parseFloat(item.amount);
      if (item.type === 'income') {
        totalReceita += valorNumerico;
      } else {
        totalDespesa += valorNumerico;
      }
    });
    setReceitas(totalReceita);
    setDespesas(totalDespesa);
    setSaldo(totalReceita - totalDespesa);
  }

  async function carregarTransacoes(): Promise<void> {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      const dados: Transacao[] = await resposta.json();
      setTransacoes(dados);
      calcularTotais(dados);
    } catch (erro) {
      console.error("Erro ao carregar lançamentos:", erro);

    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTransacoes();
  }, []);

  return (
    <View style={styles.container}>
      {/* Cards com Totais Dinâmicos */}
      <View style={styles.cardSaldo}>
        <Text style={styles.labelSaldo}>Saldo Total</Text>
        <Text style={styles.valorSaldo}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <CardSaldo titulo="Receitas" valor={`R$ ${receitas.toFixed(2)}`} corfundo="#1B5E20" />
        <CardSaldo titulo="Despesas" valor={`R$ ${despesas.toFixed(2)}`} corfundo="#B71C1C" /> 
      </View>

      <Text style={styles.tituloExtrato}>Extrato Financeiro</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#BB72FF" />
      ) : (
        <FlatList
          data={transacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View>
                <Text style={styles.descricao}>{item.description}</Text>
                <Text style={styles.categoria}>{item.category} - {item.date}</Text>
              </View>
              <Text style={item.type === 'income' ? styles.valorReceita : styles.valorDespesa}>
                {item.type === 'income' ? '+' : '-'} R$ {(typeof item.amount === 'number' ? item.amount : parseFloat(item.amount)).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021123', padding: 20, paddingTop: 50 },
  cardSaldo: { backgroundColor: '#144800', padding: 20, borderRadius: 12, marginBottom: 15 },
  labelSaldo: { color: '#FFFFFF', fontSize: 16 },
  valorSaldo: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  tituloExtrato: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemCard: { backgroundColor: '#0B2545', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  descricao: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  categoria: { color: '#A0A0A0', fontSize: 12, marginTop: 4 },
  valorReceita: { color: '#2ECC71', fontSize: 16, fontWeight: 'bold' },
  valorDespesa: { color: '#E74C3C', fontSize: 16, fontWeight: 'bold' }
});