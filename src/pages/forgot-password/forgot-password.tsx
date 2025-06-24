import { ForgotPasswordUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/authActions';
import { useDispatch } from '../../services/store';
import { ROUTES } from '../../utils/routes.enum';
export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);

    try {
      await dispatch(forgotPassword({ email })).unwrap();

      localStorage.setItem('resetPassword', 'true');
      navigate(ROUTES.RESET_PASSWORD, { replace: true });
    } catch (error) {
      setError('Invalid email');
    }
  };

  return (
    <ForgotPasswordUI
      errorText={error ? error : ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
