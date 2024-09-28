import React from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css'
import PropTypes from "prop-types";
import useSelector from "../../store/use-selector";
import Loader from "../loader/loader";
import { numberFormat } from "../../utils";

function ProductCard({
  productInfo, onAddBasket = () => {
  }
}) {
  const cn = bem('ProductCard')

  const select = useSelector(state => ({
    isLoading: state.product.isLoading,
  }));

  return (
    <div className={cn()}>
      {select.isLoading && <Loader />}
      {!select.isLoading && (
        <>
          <div className={cn('line')}>{productInfo.description}</div>
          <div className={cn('line')}>
            Страна производитель: <span>{productInfo.madeIn?.title} ({productInfo.madeIn?.code})</span></div>
          <div className={cn('line')}>Категория: <span>{productInfo.category?.title}</span></div>
          <div className={cn('line')}>Год выпуска: <span>{productInfo.edition}</span></div>
          <div className={cn('price')}>Цена: {numberFormat(productInfo.price)} ₽</div>
          <button className={cn('btn')} onClick={() => {
            onAddBasket(productInfo._id)
          }}>Добавить
          </button>
        </>
      )}
    </div>
  )
};

ProductCard.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard
