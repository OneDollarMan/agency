"use client"
import { Box, Card, CardContent, Link, Typography } from "@mui/joy";
import { useAuth } from "../../components/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, soldApartments, loadSoldApartments } = useAuth();

    loadSoldApartments();
    const router = useRouter();

    return (
        <>
            <Box sx={{ p: 1, display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
                {soldApartments && soldApartments.map(apartment => (
                    <Card sx={{ width: '30%', mr: 1, mb: 1 }}>
                        <div>
                            <Typography level="title-lg"><Link onClick={() => router.push(`/apartments/${apartment.id}`)}>{apartment.rooms_count}-к. квартира, {apartment.area} м²</Link></Typography>
                            <Typography level="body-sm">Адрес: {apartment.address}</Typography>
                            <Typography level="body-sm">Владелец: {apartment.owner.first_name} {apartment.owner.last_name}</Typography>
                            <Typography level="body-sm">Паспорт: {apartment.owner.passport_number}</Typography>
                            <Typography level="body-sm">Выдан: {apartment.owner.passport_info}</Typography>
                            <Typography level="body-sm">Телефон: {apartment.owner.phone_number}</Typography>
                            <Typography level="body-sm">Email: {apartment.owner.email}</Typography>
                        </div>
                        <CardContent orientation="horizontal">
                            <div>
                                <Typography level="body-xs">Цена:</Typography>
                                <Typography fontSize="lg" fontWeight="lg">
                                    ${apartment.price}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
}