"use client"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { useAuth } from './AuthContext';
import { useState } from 'react';

export default function ApartmentForm() {
  const { addApartment } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    address: "",
    area: "",
    rooms_count: "",
    price: ""
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <Button
        variant="solid"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Добавить
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog style={{ overflow: "hidden", overflowY: "scroll" }}>
          <DialogTitle>Добавление квартиры</DialogTitle>
          <DialogContent>Введите данные</DialogContent>
          <form
            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (await addApartment(formData)) {
                setOpen(false);
              }
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Адрес</FormLabel>
                <Input
                  required
                  placeholder='Адрес'
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Площадь</FormLabel>
                <Input
                  type="number"
                  required
                  placeholder='Площадь'
                  value={formData.area}
                  onChange={(e) => handleChange("area", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Количество комнат</FormLabel>
                <Input
                  type="number"
                  required
                  placeholder='Количество комнат'
                  value={formData.rooms_count}
                  onChange={(e) => handleChange("rooms_count", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Цена</FormLabel>
                <Input
                  type="number"
                  required
                  placeholder='Цена'
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </FormControl>
              <Button type="submit">Добавить</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
