import { useEffect, useMemo, useState } from 'react';
import { Container } from './styles';
import { api } from '../../services/api';

interface ITrasanctionTable {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITrasanctionTable[]>([]);

  useEffect(() => {
    async function getTransaction() {
      const { data } = await api.get('transactions');
      setTransactions(data.transactions);
    }
    getTransaction();
  }, []);

  // const transactionFormmated = useMemo(() => {}, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
