import { Collapse, Pagination } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ActivityCollapse from 'components/atoms/ActivityCollapse';
import { ActivityReportRecord } from 'api/Report/declarations';
import ReportList from './ReportList';
import { PaginationData } from 'api/BaseService/declarations';
import TextAlign from 'components/atoms/TextAlign/TextAlign';
import { Moment } from 'moment-timezone';

const { Panel } = Collapse;

interface IReportResultsCollapse {
  paginationData: PaginationData<ActivityReportRecord>;
  loading?: boolean;
  onPageChange: (page: number, pageSize?: number) => void;
  dateRange?: Moment[];
}

const ReportResultsCollapse = ({
  paginationData,
  loading = false,
  onPageChange,
  dateRange = []
}: IReportResultsCollapse) => (
  <ActivityCollapse
    bordered={false}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
  >
    <Panel header="Reporte" key="1">
      <ReportList loading={loading} data={paginationData.data} dateRange={dateRange} />
      <TextAlign align='right'>
        <Pagination
          current={paginationData.page}
          total={paginationData.count}
          pageSize={paginationData.limit}
          onChange={onPageChange} />
      </TextAlign>
    </Panel>
  </ActivityCollapse>
)

export default ReportResultsCollapse;