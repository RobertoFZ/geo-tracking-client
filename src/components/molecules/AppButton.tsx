import React from 'react';
import { ButtonProps } from 'antd';
import { PetiteButton } from 'components/atoms/PetiteButton/PetiteButton';

const AppButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <PetiteButton {...rest}>
    {children}
  </PetiteButton>
)

export default AppButton;