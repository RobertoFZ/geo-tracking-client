import React from 'react';
import { Row, Col } from 'antd';

const SingleColumn: React.FC = ({ children }) => <Row >
  <Col span={24}>
    {children}
  </Col>
</Row>

export default SingleColumn;
