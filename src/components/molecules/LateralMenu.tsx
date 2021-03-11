import React from 'react';
import { Menu } from 'antd';
import menuElements, { EMenuKeys, MenuElement } from 'shared/constants/menuElements';
import { SideMenu } from 'components/atoms/SideMenu';
import { Link } from 'react-router-dom';

const { Item } = Menu;

type Props = {
  active?: EMenuKeys;
}
const LateralMenu = ({
  active = EMenuKeys.PANEL,
}: Props) => (
  <SideMenu>
    <Menu
      mode="inline"
      selectedKeys={[active]}
      style={{ height: '100%', borderRight: 0 }}
    >
      {
        menuElements.map((menuElement: MenuElement) => (
          <Item key={menuElement.key}>
            <Link to={menuElement.route}>{menuElement.text}</Link>
          </Item>
        ))
      }
    </Menu>
  </SideMenu>
)

export default LateralMenu;