import React from 'react';
import { Row, Col, Menu as AntMenu} from 'antd';
import { User } from 'api/User/declarations';
import CenterVertically from 'components/atoms/CenterVertically/CenterVertically';
import Header from 'components/atoms/Header';
import { NavbarLogo } from 'components/atoms/NavbarLogo';
import TextAlign from 'components/atoms/TextAlign/TextAlign';
import UserDropdown from './UserDropdown';
import { Link } from 'react-router-dom';
import menuElements, { EMenuKeys, MenuElement } from 'shared/constants/menuElements';
import Menu from 'components/atoms/Menu';
import MenuItem from 'components/atoms/MenuItem';

type Props = {
  user?: User;
  active: EMenuKeys;
  onLogout?: () => void;
}

const AppHeader = ({
  active,
  user,
  onLogout = () => true,
}: Props) => (
  <Header>
    <Row>
      <Col xs={4}>
        <CenterVertically minHeight={'64px'} justifyContent='initial'>
          <NavbarLogo />
        </CenterVertically>
      </Col>
      <Col xs={16}>
        <Menu
          mode="horizontal"
          selectedKeys={[active]}
        >
          {
            menuElements.map((menuElement: MenuElement) => (
              <MenuItem key={menuElement.key}>
                <Link to={menuElement.route}>{menuElement.text}</Link>
              </MenuItem>
            ))
          }
        </Menu>
      </Col>
      <Col xs={4}>
        <CenterVertically minHeight={'64px'} justifyContent='initial'>
          <TextAlign align='right'>
            <UserDropdown user={user} onLogout={onLogout} />
          </TextAlign>
        </CenterVertically>
      </Col>
    </Row>
  </Header>
)

export default AppHeader;