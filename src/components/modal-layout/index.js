import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import './style.css';
import { numberFormat } from "../../utils";

function ModalLayout({ children, onClose = () => { }, sum = 0 }) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('modal')}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('btn-close')} onClick={onClose}>Закрыть</button>
        </div>
        <div className={cn('main')}>
          {children}
        </div>
        <div className={cn('footer')}>
          <span>Итого</span>
          <span>{numberFormat(sum)}&nbsp;₽</span>
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  sum: PropTypes.number,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default React.memo(ModalLayout);
