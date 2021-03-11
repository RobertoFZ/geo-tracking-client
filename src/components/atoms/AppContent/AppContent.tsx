import styled from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

const SPACING = '212px'

const AppContent = styled(Content)`
  padding: 24px;
  margin: 0;
  min-height: calc(100vh - ${SPACING});
`;

export default AppContent;