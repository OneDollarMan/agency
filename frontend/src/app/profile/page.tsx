"use client"
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { useAuth } from "../../components/AuthContext";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useEffect, useState } from "react";

export default function Page() {
    const { user, patchUser } = useAuth();

    const [formData, setFormData] = useState({
        first_name: user && user.first_name,
        last_name: user && user.last_name,
        passport_number: user && user.passport_number,
        passport_info: user && user.passport_info,
        phone_number: user && user.phone_number
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                passport_number: user.passport_number,
                passport_info: user.passport_info,
                phone_number: user.phone_number
            });
        }
    }, [user]);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        patchUser(formData)
    }

    return (
        <>{user && (
            <Card sx={{ m: 1, width: '40rem' }}>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Личная информация</Typography>
                    <Typography level="body-sm">
                        Просматривайте и изменяйте информацию о себе здесь
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                            <FormLabel>ФИО</FormLabel>
                            <FormControl
                                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                            >
                                <Input size="sm" sx={{width: '50%'}} placeholder="Имя" value={formData.first_name} onChange={(e) => handleChange("first_name", e.target.value)} />
                                <Input size="sm" sx={{width: '50%'}} placeholder="Фамилия" value={formData.last_name} onChange={(e) => handleChange("last_name", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>Паспортные данные</FormLabel>
                            <FormControl
                                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                            >
                                <Input size="sm" sx={{width: '50%'}} placeholder="Номер" value={formData.passport_number} onChange={(e) => handleChange("passport_number", e.target.value)} />
                                <Input size="sm" sx={{width: '50%'}} placeholder="Кем выдан" value={formData.passport_info} onChange={(e) => handleChange("passport_info", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>Номер телефона</FormLabel>
                            <FormControl
                                sx={{ display: 'flex', gap: 2 }}
                            >
                                <Input size="sm" placeholder="Номер телефона" value={formData.phone_number} onChange={(e) => handleChange("phone_number", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <FormControl>
                                <FormLabel>Роль</FormLabel>
                                <Input size="sm" disabled defaultValue={user && user.role.name} />
                            </FormControl>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    disabled
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRoundedIcon />}
                                    placeholder="email"
                                    defaultValue={user && user.email}
                                    sx={{ flexGrow: 1 }}
                                />
                            </FormControl>
                        </Stack>
                    </Stack>
                </Stack>

                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="solid" onClick={handleSubmit}>
                            Сохранить
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        )}</>
    );
}