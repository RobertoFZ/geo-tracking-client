import React from 'react';
import { FormItemProps, InputProps } from 'antd';
import { AppInput } from 'components/atoms/Form/AppInput';
import { AppInputPassword } from 'components/atoms/Form/AppInputPassword';
import { AppFormItem } from 'components/atoms/Form/AppFormItem';

export enum InputTypes {
  PASSWORD = 'password',
  TEXT = 'text',
}
export type FormInputProps = {
  type?: InputTypes;
  formItemProps?: FormItemProps;
  inputProps?: InputProps;
}

const FormInput: React.FC<FormInputProps> = ({ formItemProps, inputProps, type }) => {
  function getInputType() {
    switch (type) {
      case InputTypes.PASSWORD:
        return <AppInputPassword {...inputProps} />
      default:
        return <AppInput {...inputProps} />
    }
  }

  return <AppFormItem labelAlign={'left'} {...formItemProps}>
    {getInputType()}
  </AppFormItem>

}

export default FormInput;