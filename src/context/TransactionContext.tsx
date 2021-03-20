import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

export const TransactionContext = createContext<ITrasanctionTable[]>([]);

interface ITrasanctionTable {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

interface ITransactionProviderProps {
  children: ReactNode;
}

export function TransactionProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITrasanctionTable[]>([]);

  useEffect(() => {
    async function getTransaction() {
      const { data } = await api.get('transactions');
      setTransactions(data.transactions);
    }
    getTransaction();
  }, []);

  return (
    <TransactionContext.Provider value={transactions}>
      {children}
    </TransactionContext.Provider>
  );
}
