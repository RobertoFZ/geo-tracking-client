import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ActivityCollapse from 'components/atoms/ActivityCollapse';
import { ActivityReportRecord } from 'api/Report/declarations';
import ReportList from './ReportList';

const { Panel } = Collapse;

interface IReportResultsCollapse {
  data: ActivityReportRecord[];
  loading?: boolean;
}

const ReportResultsCollapse = ({
  data,
  loading = false,
}: IReportResultsCollapse) => (
  <ActivityCollapse
    bordered={false}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
  >
    <Panel header="Reporte" key="1">
      <ReportList loading={loading} data={data} />
    </Panel>
  </ActivityCollapse>
)

export default ReportResultsCollapse;