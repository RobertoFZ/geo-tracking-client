import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ActivityCollapse from 'components/atoms/ActivityCollapse';
import ZonesSlider from './ZonesSlider';
import { LocationActivity } from 'api/Location/declarations';

const { Panel } = Collapse;

interface IActivityCollapseContainer {
  activity: LocationActivity[];
}

const ActivityCollapseContainer = ({
  activity
}: IActivityCollapseContainer) => (
  <ActivityCollapse
    bordered={false}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    className="site-collapse-custom-collapse"
  >
    <Panel header="Actividad de choferes" key="1">
      <ZonesSlider activity={activity} />
    </Panel>
  </ActivityCollapse>
)

export default ActivityCollapseContainer;