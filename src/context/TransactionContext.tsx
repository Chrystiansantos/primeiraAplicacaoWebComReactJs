import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface ITransactionContextData {
  transactions: ITrasanctionTable[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData,
);
interface ITrasanctionTable {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

// interface ITransactionInput {
//   title: string;
//   value: number;
//   category: string;
//   type: string;
// }

type ITransactionInput = Omit<ITrasanctionTable, 'id' | 'createdAt'>;
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

  const createTransaction = useCallback(
    async (transactionInput: ITransactionInput) => {
      try {
        const { data } = await api.post('transactions', {
          ...transactionInput,
          createdAt: new Date(),
        });
        const { transaction } = data;

        setTransactions([...transactions, transaction]);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
