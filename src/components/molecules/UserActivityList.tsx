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
  locale={{emptyText: 'Sin choferes'}}
    dataSource={users}
    renderItem={(user: UserActivity) => (
      <List.Item key={user.id}>
        <List.Item.Meta
          title={`${user.first_name} ${user.last_name}`}
        />
        <div>
          {user.activity} KM
        </div>
      </List.Item>
    )}
  />
);

export default UserActivityList;