import React, { useEffect, useState } from 'react';
import GradiantBackground from 'components/atoms/GradientBackground/GradientBackground';
import COLORS from 'shared/constants/colors';
import LoginForm from 'components/molecules/LoginForm';
import CenterVerticallyContainer from 'components/molecules/CenterVerticallyContainer';
import StaticImage from 'components/atoms/StaticImage/StaticImage';
import Element from 'assets/element.png';
import { AuthRequest, AuthResponse } from 'api/Auth/declarations';
import showMessage, { NoticeType } from 'utils/notifications';
import AuthService from 'api/Auth';
import useToken from 'hooks/useToken';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import routes from 'shared/constants/routes';
import withUser, { WithUserProps } from 'hooks/withUser';
import { User } from 'api/User/declarations';

const { BOX_SHADOW } = COLORS;

const IMAGE_SPACING = 40;

const LoginPage: React.FC<RouteComponentProps & WithUserProps> = ({ history, setUser, clearUser }) => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();

  async function handleSubmit({ email, password }: AuthRequest) {
    try {
      setLoading(true);
      const response: User = await AuthService.login(email, password);
      const { token } = response;
      console.log(response)
      showMessage('Correcto', 'Has iniciado sesión correctamente.');
      setLoading(false);
      setToken(token);
      setUser(response);
      setTimeout(() => {
        history.push(routes.home);
      }, 1000);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
      setLoading(false);
    }
  }

  return (
    <>
      <StaticImage src={Element} bottom={IMAGE_SPACING} left={IMAGE_SPACING} maxWidthSM={200} />
      <GradiantBackground firstColor={BOX_SHADOW} secondColor={BOX_SHADOW}>
        <CenterVerticallyContainer>
          <LoginForm onSubmit={handleSubmit} loading={loading} />
        </CenterVerticallyContainer>
      </GradiantBackground>
    </>
  )
}

export default withRouter(withUser(LoginPage));