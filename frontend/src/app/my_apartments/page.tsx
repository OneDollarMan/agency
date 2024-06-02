"use client"
import { Box, Button, Card, CardContent, IconButton, Link, Typography } from "@mui/joy";
import { useAuth } from "../../components/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, myApartments, loadMyApartments, sellApartment } = useAuth();

    loadMyApartments();
    const router = useRouter();
    
    return (
        <>
            <Box sx={{ p: 1, display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
                {myApartments && myApartments.map(apartment => (
                    <Card sx={{ width: '30%', mr: 1, mb: 1 }}>
                        <div>
                            <Typography level="title-lg"><Link onClick={() => router.push(`/apartments/${apartment.id}`)}>{apartment.rooms_count}-к. квартира, {apartment.area} м²</Link></Typography>
                            <Typography level="body-sm">Адрес: {apartment.address}</Typography>
                        </div>
                        <CardContent orientation="horizontal">
                            <div>
                                <Typography level="body-xs">Цена:</Typography>
                                <Typography fontSize="lg" fontWeight="lg">
                                    ${apartment.price}
                                </Typography>
                            </div>
                            <Button
                                variant="solid"
                                size="md"
                                color="danger"
                                aria-label="Explore Bahamas Islands"
                                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                onClick={() => sellApartment(apartment.id)}
                            >
                                Продать
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
}