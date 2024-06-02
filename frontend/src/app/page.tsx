import { AspectRatio, Box, Typography } from "@mui/joy";

export default function Page() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%', height: '90vh' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'center',
                flexShrink: 999,
            }}>
                <Typography color="primary" fontSize="lg" fontWeight="lg">
                    В поисках квартиры мечты
                </Typography>
                <Typography
                    level="h1"
                    fontWeight="xl"
                    fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
                >
                    Мы самое крупное агентство недвижимости в мире
                </Typography>
                <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                    Да-да, не удивляйтесь
                </Typography>
            </Box>
            <Box sx={{ width: "50%", display: 'flex', justifyContent: 'center' }}>
                <AspectRatio
                    variant="outlined"
                    ratio="1/1"
                    sx={{
                        width: 500,
                        bgcolor: 'background.level2',
                        borderRadius: 'sm',
                    }}
                >
                    <img src="https://alterainvest.ru/upload/iblock/d4b/d4b36669b4ab2f4a46f548683b009893.jpg"></img>
                </AspectRatio>

            </Box>
        </Box>
    );
}