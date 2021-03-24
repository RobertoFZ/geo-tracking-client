import { List, Avatar } from 'antd';
import { ActivityReportRecord } from 'api/Report/declarations';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Moment } from 'moment-timezone';

interface IReportList {
  data: ActivityReportRecord[];
  loading?: boolean;
  padding?: string;
  dateRange?: Moment[];
}

const TIME_FORMAT = 'YYYY-MM-DD';

const ReportList = ({
  data,
  loading = false,
  padding,
  dateRange = [],
}: IReportList) => (
  <List
    locale={{ emptyText: 'Sin datos' }}
    loading={loading}
    dataSource={data}
    style={{ padding: padding ?? '' }}
    renderItem={(record: ActivityReportRecord) => (
      <List.Item key={record.user.id}>
        <List.Item.Meta
          avatar={<Avatar style={{ backgroundColor: record.color ?? '#212121' }} icon={<EnvironmentOutlined />} />}
          title={`${record.user.first_name} ${record.user.last_name}`}
        />
        <div style={{ textAlign: 'right' }}>
          {dateRange.length > 1 ? `${dateRange[0].format(TIME_FORMAT)} a ${dateRange[1].format(TIME_FORMAT)}` : ''} <br />
         Tiempo activo: {(Math.round((record.time / 60) * 100) / 100)} hrs - {(Math.round((record.distance) * 100) / 100)} KM
        </div>
      </List.Item>
    )}
  />
);

export default ReportList;