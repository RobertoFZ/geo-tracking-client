import routes from "./routes";

const {
  home,
  locate,
  report,
  users
} = routes;

export type MenuElement = {
  icon?: React.ComponentType;
  key: string;
  route: string;
  text: string;
  options: MenuElement[];
}

export enum EMenuKeys {
  PANEL = 'panel',
  LOCATE = 'locate',
  REPORT = 'report',
  USERS = 'users',
}

export default [
  {
    key: EMenuKeys.PANEL,
    options: [],
    text: 'Panel',
    route: home,
  },
  {
    key: EMenuKeys.LOCATE,
    options: [],
    text: 'Localizar',
    route: locate,
  },
  {
    key: EMenuKeys.REPORT,
    options: [],
    text: 'Reporte',
    route: report,
  },
  {
    key: EMenuKeys.USERS,
    options: [],
    text: 'Usuarios',
    route: users,
  },
];