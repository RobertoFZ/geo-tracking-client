import styled from 'styled-components';
import { Collapse } from 'antd';
import colors from 'shared/constants/colors';

const ActivityCollapse = styled(Collapse)`
  .ant-collapse-header {
    color: ${colors.BLUE_DARKNESS}!important;
    font-weight: 600;
    text-align: center;
    font-size: 18px;
  }
`;

export default ActivityCollapse;