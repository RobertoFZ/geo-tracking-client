import React from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import { EMenuKeys } from 'shared/constants/menuElements';

const CalendarPage: React.FC<WithUserProps & RouteComponentProps> = (props) => (
  <MainLayout {...props} active={EMenuKeys.PANEL}>
    <h1>Panel</h1>
  </MainLayout>
)

export default CalendarPage;