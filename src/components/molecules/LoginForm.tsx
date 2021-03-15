import React from 'react';
import PetiteLogo from 'components/atoms/PetiteLogo';
import SingleColumn from './SingleColumn';
import FormContainer from './Form/FormContainer';
import Spacing from 'components/atoms/shared/Spacing';
import FormInput from './Form/FormInput';
import AppButton from './AppButton';
import TextAlign from 'components/atoms/TextAlign/TextAlign';
import { AuthRequest } from 'api/Auth/declarations';

type LoginProps = {
  loading?: boolean;
  onSubmit: (values: AuthRequest) => void;
}

const LoginForm = ({ loading, onSubmit }: LoginProps) => (
  <>
    <SingleColumn>
      <PetiteLogo />
    </SingleColumn>
    <Spacing spacing={20} />
    <FormContainer onSubmit={onSubmit}>
      <SingleColumn>
        <FormInput
          formItemProps={{ name: 'email', label: 'Correo electrónico', rules: [{ required: true, message: 'Campo requerido' }] }}
          inputProps={{ type: 'text' }}
        />
      </SingleColumn>
      <SingleColumn>
        <FormInput
          formItemProps={{ name: 'password', label: 'Contraseña', rules: [{ required: true, message: 'Campo requerido' }] }}
          inputProps={{ type: 'password' }}
        />
      </SingleColumn>
      <SingleColumn>
        <TextAlign align='right'>
          <AppButton type='primary' htmlType='submit' loading={loading}>
            Iniciar sesión
        </AppButton>
        </TextAlign>
      </SingleColumn>
    </FormContainer>
  </>
)

export default LoginForm;