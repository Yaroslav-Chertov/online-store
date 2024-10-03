import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "../components/privateRoute";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  useInit(async () => {
    await store.actions.auth.getSession();
  });

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={
          <PrivateRoute redirect={'/login'}>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
};

export default App;
