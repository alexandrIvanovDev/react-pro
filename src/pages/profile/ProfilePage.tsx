import type { RootState } from 'app/providers/store';
import { logout } from 'features/auth/model/authSlice';
import { useMeQuery } from 'features/user/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.accessToken);

  const { data, isLoading } = useMeQuery(token, {
    skip: !token,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.name) return;

  return (
    <>
      <div>Имя пользователя: {data.name}</div>
      <button onClick={handleLogout}>Выйти</button>
    </>
  );
};
