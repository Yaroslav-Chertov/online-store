import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal-layout";
import Item from "./components/item";
import ItemBasket from "./components/item-basket";
import BasketTool from "./components/basket-tool";
import BasketTotal from "./components/basket-total";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [modal, setModal] = useState(null);

  const state = store.getState();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(code => store.addToBasket(code), [store]),
    // Удаление из корзины
    removeFromBasket: useCallback(code => store.removeFromBasket(code), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => setModal('basket'), [setModal]),
    // Закрытие любой модалки
    closeModal: useCallback(() => setModal(null), [setModal]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),

    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={state.basket.amount} sum={state.basket.sum}/>
        <List list={state.list} renderItem={renders.item}/>
      </PageLayout>
      {modal === 'basket' && (
        <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
          <List list={state.basket.list} renderItem={renders.itemBasket}/>
          <BasketTotal sum={state.basket.sum}/>
        </ModalLayout>
      )}
    </>
  );
}

export default App;