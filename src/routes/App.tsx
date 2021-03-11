import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { GlobalStyle } from 'components/layouts/GlobalStyle';
import Login from 'pages/Login';
import 'antd/dist/antd.css';
import PrivateRoute from "components/molecules/PrivateRoute";
import { WithUserProps } from "hooks/withUser";
import routes from "shared/constants/routes";
import PanelPage from "pages/Panel";

type Props = {
  userState?: WithUserProps;
}

const App = ({
  userState,
  ...rest
}: Props) => {
  const { login, home, panel } = routes;
  return (
    <Router>
      <GlobalStyle />
      <PrivateRoute path={home} exact component={() => <Redirect to={panel} />} {...userState!} />
      <PrivateRoute path={panel} exact component={PanelPage} {...userState!} {...rest} />
      <Route path={login} exact component={Login} />
    </Router>
  )
}


export default App;
