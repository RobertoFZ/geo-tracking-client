import React from 'react';
import { Form } from 'antd';

export type Values = any; // This is because forms haven't same values

type FormContainerProps = {
  onSubmit: (values: Values) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
}) => (
  <Form onFinish={onSubmit}>
    {children}
  </Form>
)

export default FormContainer;