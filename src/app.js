import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalLayout from './components/modal-layout';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const items = store.getState().basket.items;
  const state = store.getState();

  const [showModal, setShowModal] = useState(false);

  const callbacks = {

    showModal: useCallback(() => {
      setShowModal(true)
    }, [setShowModal]),

    closeModal: useCallback(() => {
      setShowModal(false)
    }, [setShowModal]),

    addItemBasket: useCallback((item) => {
      store.addItemBasket(item)
    }, [store]),
    deleteItemBasket: useCallback((item) => {
      store.deleteItemBasket(item)
    }, [store]),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={callbacks.showModal} sum={state.basket.total} amount={state.basket.amount} />
        <List type={'Item'} list={list} onAddItemBasket={callbacks.addItemBasket} />
      </PageLayout>
      {showModal &&
        <ModalLayout onClose={callbacks.closeModal} sum={state.basket.total}>
          <List type={'ItemBasket'} list={items} onDeleteItem={callbacks.deleteItemBasket} />
        </ModalLayout>}
    </>
  );
}

export default App;
