import React from 'react';
import { Menu } from 'antd';
import { MenuElement } from 'shared/constants/menuElements';
import SingleMenuItem from './SingleMenuItem';

const { SubMenu } = Menu;

type Props = {
  element: MenuElement;
}
const SubMenuItem = ({
  element
}: Props) => (
  <SubMenu key={element.key} icon={element.icon} title={element.text}>
    {element.options.map((subElement: MenuElement, index: number) => <SingleMenuItem key={index} element={subElement} />)}
  </SubMenu>
);

export default SubMenuItem;