import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/actions/authActions';
import { setAuth, setTokens, setUser } from '../../services/slices/authSlice';
import { useDispatch } from '../../services/store';
import { setCookie } from '../../utils/cookie';
import { ROUTES } from '../../utils/routes.enum';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await dispatch(loginUser(data)).unwrap();

      if (response?.success) {
        const { accessToken, refreshToken } = response;

        dispatch(
          setUser({ name: response.user.name, email: response.user.email })
        );
        dispatch(setAuth(true));
        dispatch(setTokens({ accessToken, refreshToken }));

        setCookie('accessToken', accessToken, { expires: 3600 });
        setCookie('refreshToken', refreshToken, { expires: 3600 });

        setErrorText('');

        navigate(ROUTES.HOME);
      }
    } catch (error) {
      setErrorText('Ошибка при входе. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
