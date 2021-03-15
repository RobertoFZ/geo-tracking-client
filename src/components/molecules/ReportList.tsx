import { List, Avatar } from 'antd';
import { ActivityReportRecord } from 'api/Report/declarations';
import { EnvironmentOutlined } from '@ant-design/icons';

interface IReportList {
  data: ActivityReportRecord[];
  loading?: boolean;
}

const ReportList = ({
  data,
  loading = false
}: IReportList) => (
  <List
    locale={{ emptyText: 'Sin datos' }}
    loading={loading}
    dataSource={data}
    renderItem={(record: ActivityReportRecord) => (
      <List.Item key={record.user.id}>
        <List.Item.Meta
          avatar={<Avatar style={{ backgroundColor: record.color ?? '#212121' }} icon={<EnvironmentOutlined />} />}
          title={`${record.user.first_name} ${record.user.last_name}`}
        />
        <div>
          Tiempo activo: {(Math.round((record.time / 60) * 100) / 100)} hrs
        </div>
      </List.Item>
    )}
  />
);

export default ReportList;