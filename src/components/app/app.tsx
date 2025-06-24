import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../index.css';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { RootState, useDispatch } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) =>
    state.auth.accessToken ? true : false
  );
  const [hasFetched, setHasFetched] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.ingredients.items);
  useEffect(() => {
    if (!hasFetched && items.length === 0) {
      dispatch(fetchIngredients());
      setHasFetched(true);
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path={ROUTES.HOME} element={<ConstructorPage />} />
        <Route path={ROUTES.FEED} element={<Feed />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound404 />} />

        {/* Доступ к заказам */}
        <Route
          path={ROUTES.FEED + '/:number'}
          element={
            <Modal title='Детали заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path={ROUTES.INGREDIENTS}
          element={
            <Modal title='Ингредиенты' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />

        {/* Страницы, доступные только авторизованным пользователям */}
        <Route
          path={ROUTES.PROFILE_ORDERS_NUMBER}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.HOME}>
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.LOGIN}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE_ORDERS}
          element={
            <ProtectedRoute isAuth={isAuth} redirectTo={ROUTES.LOGIN}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Страницы, доступные только неавторизованным пользователям */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.HOME}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute isAuth={!isAuth} redirectTo={ROUTES.LOGIN}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
