import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { numberFormat } from "../../utils";

function Item(props) {
  // Счётчик выделений

  const callbacks = {
    onAddItem: e => {
      e.stopPropagation();
      props.onAddItemBasket(props.item);
    },
  };

  return (
    <div className={'Item'} >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{numberFormat(props.item.price)}&nbsp;₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddItem}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func
};

export default React.memo(Item);
