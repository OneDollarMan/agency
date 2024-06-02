"use client"
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { useAuth } from "../../../components/AuthContext";
import { useEffect, useState } from "react";

export default function Page({
    children, params
}: {
    children: React.ReactNode,
    params: { id: number }
}) {
    const { user, getApartment, patchApartment } = useAuth();
    const [access, setAccess] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        address: "",
        area: 0,
        rooms_count: 0,
        price: 0,
    });

    var apartment = getApartment(params.id)

    useEffect(() => {
        if (apartment && user) {
            setFormData({
                id: apartment.id,
                address: apartment.address,
                area: apartment.area,
                rooms_count: apartment.rooms_count,
                price: apartment.price,
            });
            setAccess(apartment.owner_id == user.id || user.role.id == 1)
        }
    }, [apartment, user]);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        patchApartment(formData)
    }

    return (
        <>{formData && (
            <Card sx={{ m: 1, width: '40rem' }}>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Информация о квартире</Typography>
                    <Typography level="body-sm">
                        Просматривайте и изменяйте информацию о квартире
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
                            <FormLabel>Адрес</FormLabel>
                            <FormControl sx={{ gap: 2 }}>
                                <Input disabled={!access} required size="sm" placeholder="Адрес" defaultValue={apartment && apartment.address} onChange={(e) => handleChange("address", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>Площадь</FormLabel>
                            <FormControl sx={{ gap: 2 }}>
                                <Input disabled={!access} required type="number" size="sm" placeholder="Площадь" defaultValue={apartment && apartment.area} onChange={(e) => handleChange("area", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>Количество комнат</FormLabel>
                            <FormControl sx={{ gap: 2 }}>
                                <Input disabled={!access} required type="number" size="sm" placeholder="Количество комнат" defaultValue={apartment && apartment.rooms_count} onChange={(e) => handleChange("rooms_count", e.target.value)} />
                            </FormControl>
                        </Stack>
                        <Stack spacing={1}>
                            <FormLabel>Цена</FormLabel>
                            <FormControl sx={{ gap: 2 }}>
                                <Input disabled={!access} required type="number" size="sm" placeholder="Цена" defaultValue={apartment && apartment.price} onChange={(e) => handleChange("price", e.target.value)} />
                            </FormControl>
                        </Stack>
                    </Stack>
                </Stack>

                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        {access && (
                            <Button size="sm" variant="solid" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        )}

                    </CardActions>
                </CardOverflow>
            </Card>
        )}</>
    );
}