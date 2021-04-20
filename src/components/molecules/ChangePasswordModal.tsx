import { Input, Modal } from "antd";
import React, { useState } from "react";
import showMessage, { NoticeType } from "utils/notifications";

export interface IChangePasswordModal {
  visible: boolean;
  onOk: (password: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ChangePasswordModal = ({ visible, loading, onOk, onCancel }: IChangePasswordModal) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onInputChange = (event: any) => setPassword(event.target.value);
  const onConfirmInputChange = (event: any) => setConfirmPassword(event.target.value);

  const handleModalOk = () => {
    if (
      (!password || password.trim() === '') ||
      !confirmPassword || confirmPassword.trim() === ''
    ) {
      showMessage('Espera', 'Debes escribir una contraseña y confirmarla', NoticeType.WARNING);
      return;
    }

    if (password !== confirmPassword) {
      showMessage('Espera', 'Las contraseñas no coinciden', NoticeType.WARNING);
      return;
    }
    onOk(password);
  }

  return <Modal
    title='Cambio de contraseña'
    visible={visible}
    onOk={handleModalOk}
    confirmLoading={loading}
    onCancel={onCancel}
  >
    <p>Nueva contraseña</p>
    <Input onChange={onInputChange} type='password' />
    <p>Confirmar contraseña</p>
    <Input onChange={onConfirmInputChange} type='password' />
  </Modal>
}

export default ChangePasswordModal;
