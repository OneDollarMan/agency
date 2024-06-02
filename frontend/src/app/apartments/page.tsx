"use client"
import { Box, Button, Card, CardContent, IconButton, Link, Typography } from "@mui/joy";
import ApartmentForm from "../../components/ApartmentForm";
import { useAuth } from "../../components/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, apartments, loadFreeApartments, deleteApartment, buyApartment } = useAuth();

    loadFreeApartments();
    const router = useRouter();
    return (
        <>
            {user && user.role && user.role.id == 1 && (
                <Box sx={{ mt: 1, ml: 1 }}>
                    <ApartmentForm />
                </Box>
            )}
            <Box sx={{ p: 1, display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
                {apartments && apartments.map(apartment => (
                    <Card sx={{ width: '30%', mr: 1, mb: 1 }}>
                        <div>
                            <Typography level="title-lg"><Link onClick={() => router.push(`/apartments/${apartment.id}`)}>{apartment.rooms_count}-к. квартира, {apartment.area} м²</Link></Typography>
                            <Typography level="body-sm">Адрес: {apartment.address}</Typography>
                            {user && user.role && user.role.id == 1 && (
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    size="sm"
                                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                                    onClick={() => deleteApartment(apartment.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
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
                                color="primary"
                                aria-label="Explore Bahamas Islands"
                                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                onClick={() => buyApartment(apartment.id)}
                            >
                                Купить
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
}