import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import { numberFormat } from "../../utils";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item);
    },
  };

  return (
    <div className={cn()}    >
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{numberFormat(props.item.price)}&nbsp;₽</div>
      <div className={cn('amount')}>{props.item.amount}&nbsp;шт</div>
      <div className={cn('action')}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(ItemBasket);
