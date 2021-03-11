import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { User } from 'api/User/declarations';
import { NavbarDropdownItem } from 'components/atoms/NavbarDropdownItem';

type Props = {
  user?: User;
  onLogout?: () => void;
}

const UserDropdown = ({ user, onLogout }: Props) => {
  const menu = (
    <Menu>
      <Menu.Item key='logout'>
        <Button type='link' onClick={onLogout}><LogoutOutlined /> Cerrar sesión</Button>
      </Menu.Item>
    </Menu>
  );

  return (user ? <Dropdown overlay={menu} trigger={['click']}>
    <NavbarDropdownItem>
      {user.first_name} <DownOutlined />
    </NavbarDropdownItem>
  </Dropdown> : null);
}

export default UserDropdown;