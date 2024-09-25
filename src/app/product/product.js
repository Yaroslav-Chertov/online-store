import React, { useCallback, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductCard from "../../components/product-card";
import PageLayout from "../../components/page-layout";

function Product() {
  const store = useStore()
  const params = useParams()

  useEffect(() => {
    store.actions.product.load(params.id)
  }, [params.id])

  const select = useSelector(state => ({
    info: state.product.info,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAddBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  };

  return (
    <PageLayout>
      <Head title={select.info.title}></Head>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductCard productInfo={select.info} onAddBasket={callbacks.onAddBasket} />
    </PageLayout>
  )
}

export default Product
