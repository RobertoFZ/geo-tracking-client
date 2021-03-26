import React, { useState } from 'react';
import GradiantBackground from 'components/atoms/GradientBackground/GradientBackground';
import COLORS from 'shared/constants/colors';
import LoginForm from 'components/molecules/LoginForm';
import CenterVerticallyContainer from 'components/molecules/CenterVerticallyContainer';
import { AuthRequest } from 'api/Auth/declarations';
import showMessage, { NoticeType } from 'utils/notifications';
import AuthService from 'api/Auth';
import useToken from 'hooks/useToken';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import routes from 'shared/constants/routes';
import withUser, { WithUserProps } from 'hooks/withUser';
import { User } from 'api/User/declarations';

const { WHITE } = COLORS;

const LoginPage: React.FC<RouteComponentProps & WithUserProps> = ({ history, setUser, clearUser }) => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();

  async function handleSubmit({ email, password }: AuthRequest) {
    try {
      setLoading(true);
      const response: User = await AuthService.login(email, password);
      const { token } = response;
      setUser(response);
      setToken(token);
      setTimeout(() => {
        history.push(routes.home);
        history.go(1);
      }, 1000);

      showMessage('Correcto', 'Has iniciado sesión correctamente.');
      setLoading(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
  }

  return (
    <>
      <GradiantBackground firstColor={WHITE} secondColor={WHITE}>
        <CenterVerticallyContainer>
          <LoginForm onSubmit={handleSubmit} loading={loading} />
        </CenterVerticallyContainer>
      </GradiantBackground>
    </>
  )
}

export default withRouter(withUser(LoginPage));