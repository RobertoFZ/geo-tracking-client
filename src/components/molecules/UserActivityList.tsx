import { List } from 'antd';
import { UserActivity } from 'api/User/declarations';
import React from 'react';

interface IUserActivityList {
  users: UserActivity[];
}

const UserActivityList = ({
  users
}: IUserActivityList) => (
  <List
    locale={{ emptyText: 'Sin choferes' }}
    dataSource={users}
    renderItem={(user: UserActivity) => (
      <List.Item key={user.id}>
        <List.Item.Meta
          title={`${user.first_name} ${user.last_name}`}
        />
        <div>
        Tiempo activo: {(Math.round((user.time / 60) * 100) / 100)} hrs - {(Math.round((user.activity) * 100) / 100)} KM
        </div>
      </List.Item>
    )}
  />
);

export default UserActivityList;