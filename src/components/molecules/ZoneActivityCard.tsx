import React from 'react';
import { Card } from 'antd';
import { LocationActivity } from 'api/Location/declarations';
import UserActivityList from './UserActivityList';

interface IZoneActivityCard {
  activity: LocationActivity;
}

const ZoneActivityCard = ({
  activity
}: IZoneActivityCard) => (
  <Card
    style={{ margin: '0 10px', maxHeight: '230px', overflowY: 'scroll' }}
    title={activity.location_zone.name}
    size="small">
    <UserActivityList users={activity.users} />
  </Card>
)

export default ZoneActivityCard;