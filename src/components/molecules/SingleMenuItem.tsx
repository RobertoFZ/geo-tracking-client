import { Menu } from 'antd';
import { MenuElement } from 'shared/constants/menuElements';
const { Item } = Menu;

type Props = {
  element: MenuElement;
}
const SingleMenuItem = ({
  element
}: Props) => (
  <Item key={element.key}>{element.text}</Item>
)

export default SingleMenuItem;