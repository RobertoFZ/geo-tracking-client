import React, { useEffect } from 'react'
import { Breadcrumb, Layout, notification } from 'antd'
import LateralMenu from 'components/molecules/LateralMenu';
import AppHeader from 'components/molecules/AppHeader';
import { EMenuKeys } from 'shared/constants/menuElements';
import { WithUserProps } from 'hooks/withUser';
import AuthService from 'api/Auth';
import { RouteComponentProps } from 'react-router-dom';
import routes from 'shared/constants/routes';
import AppContent from 'components/atoms/AppContent';

const { Content, Footer } = Layout;

type Props = WithUserProps & RouteComponentProps & {
  active?: EMenuKeys;
}

const MainLayout: React.FC<Props> = ({
  children,
  active = EMenuKeys.PANEL,
  user,
  history,
}) => {
  useEffect(() => {
    scrollToTop()
  }, [])

  const scrollToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // Chrome - Firefox
  }

  async function doLogout() {
    try {
      await AuthService.logout();
      history.push(routes.login);
    } catch (error) {
      notification.error({ message: 'Error', description: error.message });
    }
  }

  return (
    <>
      <AppHeader user={user} onLogout={doLogout} active={active} />
      <Layout>
        {false && <LateralMenu active={active} />}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <AppContent>
            {children}
          </AppContent>
          <Footer style={{ textAlign: 'center' }}>Franzet ©{new Date().getFullYear()} Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MainLayout
