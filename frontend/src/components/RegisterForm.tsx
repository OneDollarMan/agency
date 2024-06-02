import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { Typography } from '@mui/joy';
import { useAuth } from './AuthContext';

export default function RegisterForm() {
  const { registerUser } = useAuth();
  const [open, setOpen] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    passport_number: "",
    passport_info: "",
    phone_number: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  return (
    <React.Fragment>
      <Button
        variant="solid"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Регистрация
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog style={{overflow: "hidden", overflowY: "scroll"}}>
          <DialogTitle>Регистрация</DialogTitle>
          <DialogContent>Введите свои данные в форму</DialogContent>
          <form
            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if(await registerUser(formData)) {
                setOpen(false);
            }
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Почта</FormLabel>
                <Input
                  required
                  placeholder='Почта'
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input
                  required
                  placeholder='Имя'
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  required
                  placeholder='Фамилия'
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Номер паспорта</FormLabel>
                <Input
                  required
                  placeholder='Номер паспорта'
                  value={formData.passport_number}
                  onChange={(e) => handleChange("passport_number", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Кем выдан</FormLabel>
                <Input
                  required
                  placeholder='Кем выдан'
                  value={formData.passport_info}
                  onChange={(e) => handleChange("passport_info", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Номер телефона</FormLabel>
                <Input
                  required
                  placeholder='Номер телефона'
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input
                  required
                  placeholder='Пароль'
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </FormControl>
              <Button type="submit">Зарегистрироваться</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
