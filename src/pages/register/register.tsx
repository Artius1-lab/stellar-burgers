import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { registerUser } from '../../services/actions/authActions';
import { setAuth, setTokens, setUser } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      email,
      name: userName,
      password
    };

    try {
      const response = await dispatch(registerUser(data)).unwrap();

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
      }
    } catch (error) {
      setErrorText('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
