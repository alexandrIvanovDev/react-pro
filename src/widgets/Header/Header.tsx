import { useAuth } from 'app/providers/authProvider/useAuth';
import { Link } from 'react-router';

import cl from './Header.module.css';
import { useEffect } from 'react';
import { setToken } from 'features/auth/model/authSlice';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(setToken(localStorage.getItem('token')));
    }
  }, [isAuth, dispatch]);

  return (
    <nav className={cl.wrapper}>
      <Link to='/'>Главная</Link>
      <Link to='/public'>Публичная</Link>
      <Link to='/portal'>Портал</Link>
      {isAuth ? <Link to='/profile'>Профиль</Link> : <Link to='/login'>Войти</Link>}
    </nav>
  );
};
