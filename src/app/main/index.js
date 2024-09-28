import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from "../../components/pagination";
import { LIMIT } from '../../api';
import Loader from "../../components/loader/loader";
import Layout from "../../components/layout";
import Menu from "../../components/menu";

function Main() {
  const store = useStore();

  const { page } = useParams();
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.totalCount,
    activePage: state.catalog.activePage,
    isLoading: state.catalog.isLoading,
  }));

  useEffect(() => {
    store.actions.catalog.load(currentPage);
    navigate(`/page/${currentPage}`);

  }, [currentPage, page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    setActivePage: useCallback((page) => {
      store.actions.catalog.load(page)
      setCurrentPage(page)
    }, [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} link={`/product/${item._id}`} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Layout>
        <Menu />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </Layout>
      {select.isLoading && <Loader />}
      {!select.isLoading && (
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination totalCount={select.total} limit={LIMIT} activePage={select.activePage}
            setActivePage={callbacks.setActivePage} />
        </>
      )}
    </PageLayout>
  );
};

export default memo(Main);
