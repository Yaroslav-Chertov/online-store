import React, { useEffect } from 'react';
import useSelector from "../../hooks/use-selector";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../page-layout";
import PropTypes from "prop-types";


function PrivateRoute({ children, redirect }) {

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    waiting: state.auth.waiting,
  }));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (!select.isAuth && !select.waiting) {
      navigate(redirect, { state: { back: location.pathname } })
    }
  }, [select.isAuth, select.waiting])

  return (
    <PageLayout>
      {!select.isAuth || select.waiting ? <p>Loading...</p> : children}
    </PageLayout>
  )
}
PrivateRoute.propTypes = {
  redirect: PropTypes.string,
  children: PropTypes.node,
};

export default PrivateRoute
