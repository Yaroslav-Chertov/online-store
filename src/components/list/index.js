import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import ItemBasket from "../item-basket";

function List({ list, onDeleteItem, onAddItemBasket, type }) {

  switch (type) {
    case 'Item':
      return list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onAddItemBasket={onAddItemBasket} />
        </div>
      ))
    case 'ItemBasket':
      return list.map(item => (
        <div key={item.code} className="List-item">
          <ItemBasket item={item} onDelete={onDeleteItem} />
        </div>
      ))
    default:
      return <></>
  }
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

export default React.memo(List);
