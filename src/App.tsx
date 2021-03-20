import Modal from 'react-modal';
import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionContext } from './context/TransactionContext';

Modal.setAppElement('#root');

export function App() {
  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen,
  ] = useState<boolean>(false);

  const handleOpenNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);
  return (
    <TransactionContext.Provider value={[]}>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionContext.Provider>
  );
}
