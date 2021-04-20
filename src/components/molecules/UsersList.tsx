import React from 'react';
import { Avatar, Button, List, Popconfirm, Select, Skeleton } from 'antd';
import { User } from 'api/User/declarations';
import { LocationZone } from 'api/LocationZone/declarations';
import { PaginationData } from 'api/BaseService/declarations';

interface IUsersList {
  users?: User[];
  location_zones?: LocationZone[];
  loading?: boolean;
  onZoneChange: (user: User, zone_id: number) => void;
  paginationData: PaginationData<User>;
  onPageChange: (page: number) => void;
  onPasswordReset: (email: string) => void;
  onDeleteUser: (user: User) => void;
  onSizeChange: (current: number, size: number) => void;
}

const UsersList = ({
  users = [],
  location_zones = [],
  loading = false,
  onZoneChange,
  paginationData,
  onPageChange,
  onPasswordReset,
  onDeleteUser,
  onSizeChange
}: IUsersList) => (
  <List
    loading={loading}
    itemLayout="horizontal"
    dataSource={users}
    pagination={{
      total: paginationData.count,
      pageSize: paginationData.limit,
      current: paginationData.page,
      onChange: onPageChange,
      onShowSizeChange: onSizeChange,
    }}
    renderItem={(item: User) => (
      <List.Item
        actions={[
          <Popconfirm
            title={'¿Seguro que desea eliminar al usuario?'}
            okText='Sí'
            cancelText='Cancelar'
            onConfirm={() => onDeleteUser(item)}>
            <Button type='primary' danger>Eliminar</Button>
          </Popconfirm>,
          <Popconfirm
            title={'¿Seguro que deseas asignar una nueva contraseña al usuario?'}
            okText='Sí'
            cancelText='Cancelar'
            onConfirm={() => onPasswordReset(item.email)}>
            <Button type='primary'>Reestablecer contraseña</Button>
          </Popconfirm>,
          <Select
            onChange={(value: number) => onZoneChange(item, value)}
            value={item.assignation?.location_zone_id}
            style={{ width: 250 }}>
            {
              location_zones.map((locationZone: LocationZone) =>
                <Select.Option key={locationZone.id} value={locationZone.id!}>{locationZone.name}</Select.Option>
              )
            }
          </Select>
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar>{`${item.first_name[0]}${item.last_name[0]}`}</Avatar>
          }
          title={`${item.first_name} ${item.last_name} (${item.on_route ? 'Activo' : 'Inactivo'})`}
        />
      </List.Item>
    )}
  />
)

export default UsersList;