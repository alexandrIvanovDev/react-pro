import { useAuth } from 'app/providers/authProvider/useAuth';
import { loginThunk } from 'features/auth/model/authSlice';
import { LoginForm } from 'features/auth/ui/login/LoginForm';
import type { LoginFormType } from 'features/auth/ui/login/validation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  const handleSubmit = (data: LoginFormType) => {
    dispatch(loginThunk(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/profile');
      return;
    }
  }, [isAuth, navigate]);

  return (
    <div style={{ paddingTop: '50px' }}>
      <LoginForm submit={handleSubmit} />
    </div>
  );
};
