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
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Typography } from '@mui/joy';

export default function AuthForm() {
    const {loginUser} = useAuth();
    
    const [open, setOpen] = React.useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                Вход
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog style={{overflow: "hidden", overflowY: "scroll"}}>
                    <DialogTitle>Авторизация</DialogTitle>
                    <DialogContent>Введите почту и пароль</DialogContent>
                    <form
                        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            if(await loginUser(formData)) {
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
                                    value={formData.username}
                                    onChange={(e) => handleChange("username", e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Input
                                    type="password"
                                    required
                                    placeholder='Пароль'
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit">Войти</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
