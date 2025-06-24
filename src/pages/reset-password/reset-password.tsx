import { ResetPasswordUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/actions/authActions';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [tokenState, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { loading, error: reduxError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    if (!tokenState) {
      setError('Токен не найден в URL');
      return;
    }

    dispatch(resetPassword({ password, token: tokenState }))
      .unwrap()
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate(ROUTES.LOGIN);
      })
      .catch((err) => setError(err.message || 'Incorrect reset token'));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate(ROUTES.FORGOT_PASSWORD, { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error || reduxError || ''}
      password={password}
      setPassword={setPassword}
      token={tokenState}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
