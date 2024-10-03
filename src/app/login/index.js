import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthInfo from "../../components/auth-info";
import useStore from "../../hooks/use-store";
import { useLocation, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import FormLogin from "../../components/form-login";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslate();
  const store = useStore();

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const select = useSelector(state => ({
    errors: state.auth.error,
    isAuth: state.auth.isAuth,
  }))

  const callbacks = {
    onChangeLogin: useCallback((login) => setLogin(login), []),
    onChangePassword: useCallback((password) => setPassword(password), []),

    onSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.auth.logIn({ login, password })
    }, [login, password])

  };

  useEffect(() => {
    if (select.isAuth) {
      if (location.state?.back && location.state?.back !== location.pathname) {
        navigate(location.state?.back)
      } else {
        navigate('/')
      }
    }
  }, [select.isAuth])

  return (
    <PageLayout>
      <AuthInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <FormLogin
        onSubmit={callbacks.onSubmit}
        login={login}
        password={password}
        errors={select.errors}
        onChangeLogin={callbacks.onChangeLogin}
        onChangePassword={callbacks.onChangePassword}
      />
    </PageLayout>
  )
};

export default Login
