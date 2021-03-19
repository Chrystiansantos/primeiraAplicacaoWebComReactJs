import Modal from 'react-modal';
import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

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
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Cadastrar transacao</h2>
      </Modal>
    </>
  );
}
