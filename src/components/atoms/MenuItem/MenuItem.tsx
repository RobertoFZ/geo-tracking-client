import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import COLORS from 'shared/constants/colors';

const { Item } = AntMenu;

const MenuItem = styled(Item)`

  &.ant-menu-item-selected {
    background: ${COLORS.WHITE};
    a {
      color: ${COLORS.BLUE_DARKNESS} !important;
    }
  }
  a {
    color: ${COLORS.WHITE} !important;
    font-weight: 600;
    padding: 0 10px;
  }
`;

export default MenuItem;