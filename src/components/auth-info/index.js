import React, { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import './style.css'


function AuthInfo() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
  }));

  const callbacks = {
    onSignIn: useCallback(() => navigate('/login', { state: { back: location.pathname } }), []),
    onSignOut: useCallback(() => store.actions.auth.logOut(), []),
  };

  return (
    <div className={'AuthInfo'}>
      {select.isAuth && <Link to={"/profile"}>{select.userName}</Link>}
      {select.isAuth
        ? <button onClick={callbacks.onSignOut}>Выход</button>
        : <button onClick={callbacks.onSignIn}>Вход</button>
      }
    </div>
  );
};

export default AuthInfo
