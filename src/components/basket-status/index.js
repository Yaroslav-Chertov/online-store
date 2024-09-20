import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketStatus({ sum = 0, amount = 0 }) {
  const cn = bem('BasketStatus');

  return (
    <div className={cn()}>
      <span className={cn('title')}>В корзине:</span>
      <span className={cn('data')}>
        {amount
          ? `${amount} ${plural(amount, { one: "товар", few: "товара", many: "товаров" })} / ${numberFormat(sum)} ₽`
          : "пусто"
        }
      </span>
    </div>
  );
}

BasketStatus.propTypes = {
  sum: PropTypes.number,
  amount: PropTypes.number
};

export default React.memo(BasketStatus);
