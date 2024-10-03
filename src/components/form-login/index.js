import React from "react";
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function FormLogin({ onSubmit, login, password, errors, onChangeLogin, onChangePassword }) {
  const cn = bem('FormLogin');
  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2>Вход</h2>
      <label htmlFor={'login'}>Логин</label>
      <input className={cn('input')} id={'login'} value={login} onChange={(e) => onChangeLogin(e.target.value)} />
      <label htmlFor={'password'}>Пароль</label>
      <input className={cn('input')} id={'password'} value={password}
        type={'password'}
        onChange={(e) => onChangePassword(e.target.value)} />
      <div className={cn({ errors: !!errors.length })}>{errors}</div>
      <button className={cn('btn')} type={'submit'}>Войти</button>
    </form>
  )
};

FormLogin.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
};

export default FormLogin
