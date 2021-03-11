import { EUserRoles } from 'api/User/declarations';
import withUser, { WithUserProps } from 'hooks/withUser';
import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import routes from 'shared/constants/routes';

type Props = RouteProps & WithUserProps & {
  component: React.ComponentType<RouteComponentProps & WithUserProps>,
}

const PrivateRoute = ({ component: Component, user, setUser, clearUser, rememberMe, ...rest }: Props) => {
  const { login } = routes;
  return (<Route {...rest} render={(props) => (
    user ?
      user.role === EUserRoles.ADMIN ?
        <Component
          setUser={setUser}
          clearUser={clearUser}
          user={user}
          rememberMe={rememberMe}
          {...props}
        /> : <Redirect to={login} />
      : <Redirect to={login} />
  )} />);
}

export default withUser(PrivateRoute);
