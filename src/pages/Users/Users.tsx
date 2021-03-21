import React, { useEffect, useState } from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import showMessage, { NoticeType } from 'utils/notifications';
import UserService from 'api/User';
import { PaginationData } from 'api/BaseService/declarations';
import { User } from 'api/User/declarations';
import UsersList from 'components/molecules/UsersList';
import LocationZoneService from 'api/LocationZone';
import { LocationZone } from 'api/LocationZone/declarations';
import MainLayout from 'components/layouts/MainLayout';
import { EMenuKeys } from 'shared/constants/menuElements';
import Container from 'components/atoms/Container/Container';
import { Card } from 'antd';
import LocationAssignationService from 'api/LocationAssignation';
import { LocationAssignation } from 'api/LocationAssignation/declarations';

const UsersPage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [locationZones, setLocationZones] = useState<LocationZone[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData<User>>({
    data: [],
    count: 0,
    limit: 10,
    offset: 0,
    page: 1
  });

  const getUsers = async () => {
    try {
      setLoading(true);
      const { results, count } = await UserService.find(paginationData);
      paginationData.data = results;
      paginationData.count = count;
      setPaginationData(paginationData);
      setLoading(false);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }
  }

  const getLocationZones = async () => {
    try {
      const response = await LocationZoneService.all();
      setLocationZones(response);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }
  }

  const assignZone = async (user: User, zone_id: number) => {
    try {
      const request: LocationAssignation = {
        user_id: user.id,
        user: user,
        location_zone_id: zone_id,
      }
      await LocationAssignationService.create(request);
      showMessage('Correcto', 'Usuario asignado correctamente', NoticeType.SUCCESS);
      getUsers();
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }

  }

  const onPageChange = (page: number) => {
    paginationData.page = page;
    setPaginationData(paginationData);
    getUsers();
  }

  useEffect(() => {
    getLocationZones();
    getUsers();
  }, []);

  return (
    <MainLayout {...props} active={EMenuKeys.USERS}>
      <Container>
        <br /><br />
        <Card title='Lista de usuarios'>
          <UsersList
            users={paginationData.data}
            location_zones={locationZones}
            loading={loading}
            onZoneChange={assignZone}
            paginationData={paginationData}
            onPageChange={onPageChange} />
        </Card>
      </Container>
    </MainLayout>
  )
};

export default UsersPage;