import { Form, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment-timezone';
import { LocationZone } from 'api/LocationZone/declarations';
import locale from 'antd/es/date-picker/locale/es_ES';
import 'moment/locale/es-mx';

moment.locale('es');

const Item = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export interface IDateRangeValues {
  zone: number;
  range: [Moment, Moment];
}

interface IDateRangeSelector {
  loading?: boolean;
  zones?: LocationZone[];
  onFinish: (values: IDateRangeValues) => void;
  onPrint: () => void;
  disablePrint?: boolean;
}

const sharedStyles = {
  display: 'inline-flex',
  margin: '0 5px',
};
const DateRangeSelector = ({
  loading = false,
  zones = [],
  onFinish,
  disablePrint = true,
  onPrint
}: IDateRangeSelector) => (
  <Form onFinish={onFinish}>
    <Item
      name='zone'
      rules={[{ required: true, message: '' }]}
      style={sharedStyles}>
      <Select style={{ width: 170 }} placeholder='Zona'>
        {
          zones.map((zone: LocationZone) => <Option key={zone.id} value={zone.id!}>{zone.name}</Option>)
        }
      </Select>
    </Item>
    <Item
      name='range'
      rules={[{ required: true, message: '' }]}
      style={sharedStyles}>
      <RangePicker locale={locale} />
    </Item>
    <Item style={sharedStyles}>
      <Button type='primary' shape='circle' htmlType='submit' loading={loading}>
        {
          !loading && <SearchOutlined />
        }
      </Button>
    </Item>
    <Item style={sharedStyles}>
      <Button type='primary' htmlType='button' loading={loading} onClick={onPrint} disabled={disablePrint}>
        {
          !loading && <PrinterOutlined />
        }
      </Button>
    </Item>
  </Form>
);

export default DateRangeSelector;