import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketStatus from "../basket-status";

function Controls({ onAdd = () => { }, sum, amount }) {
  return (
    <div className="Controls">
      <BasketStatus sum={sum} amount={amount} />
      <button className='Controls-button' onClick={() => onAdd()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
