import { Layout } from 'antd';
import styled from 'styled-components';
const { Sider } = Layout;

export const NAVBAR_HEIGHT = '64px';

export const SideMenu = styled(Sider)`
  height: calc(100vh - ${NAVBAR_HEIGHT});
  width: 200px;
`;