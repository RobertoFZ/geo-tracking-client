import { Button, List } from 'antd';
import { LocationActivity } from 'api/Location/declarations';
import ZonesSidebarContainer from 'components/atoms/ZonesSidebar/ZonesSidebar';
import { EnvironmentOutlined } from '@ant-design/icons';
import { UserActivity } from 'api/User/declarations';

interface IZonesSidebar {
  loading: boolean;
  locationActivity: LocationActivity[];
  selectedZones: LocationActivity[];
  onSelectedZone: (location_activity: LocationActivity) => void;
}

const ZonesSidebar = ({
  loading = false,
  locationActivity,
  selectedZones,
  onSelectedZone,
}: IZonesSidebar) => {
  const isSelectedZone = (item: LocationActivity) => {
    return selectedZones.find(
      (zone: LocationActivity) =>
        zone.location_zone.id === item.location_zone.id) !== undefined;
  }
  console.log(locationActivity)
  return (
    <ZonesSidebarContainer>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={locationActivity}
        renderItem={(item: LocationActivity) => {
          const setSelectedZone = () => onSelectedZone(item);
          return (
            <List.Item
              actions={[
                <Button
                  type={isSelectedZone(item) ? 'primary' : 'default'}
                  shape="circle"
                  icon={<EnvironmentOutlined />}
                  size={'middle'}
                  onClick={setSelectedZone} />
              ]}>
              <List.Item.Meta
                title={item.location_zone.name}
                description={`${item.users.filter((user: UserActivity) => user.on_route).length} usuarios`}
              />
            </List.Item>
          )
        }}
      />
    </ZonesSidebarContainer>
  )
}

export default ZonesSidebar;