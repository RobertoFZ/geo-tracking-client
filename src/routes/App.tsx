import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { GlobalStyle } from 'components/layouts/GlobalStyle';
import Login from 'pages/Login';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrivateRoute from "components/molecules/PrivateRoute";
import { WithUserProps } from "hooks/withUser";
import routes from "shared/constants/routes";
import PanelPage from "pages/Panel";
import LocalizePage from "pages/Localize";
import ReportPage from "pages/Report";
import ReportPrintPage from "pages/ReportPrint/ReportPrint";
import UsersPage from "pages/Users/Users";

type Props = {
  userState?: WithUserProps;
}

const App = ({
  userState,
  ...rest
}: Props) => {
  const { login, home, panel, locate, report, print, users } = routes;
  return (
    <Router>
      <GlobalStyle />
      <PrivateRoute path={home} exact component={() => <Redirect to={panel} />} {...userState!} />
      <PrivateRoute path={panel} exact component={PanelPage} {...userState!} {...rest} />
      <PrivateRoute path={locate} exact component={LocalizePage} {...userState!} {...rest} />
      <PrivateRoute path={report} exact component={ReportPage} {...userState!} {...rest} />
      <PrivateRoute path={print} exact component={ReportPrintPage} {...userState!} {...rest} />
      <PrivateRoute path={users} exact component={UsersPage} {...userState!} {...rest} />
      <Route path={login} exact component={Login} />
    </Router>
  )
}


export default App;
