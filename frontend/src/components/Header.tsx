"use client"
import { Avatar, Button, Dropdown, IconButton, ListDivider, Menu, MenuButton, MenuItem, Stack, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthContext';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';

export default function Header() {
    const router = useRouter();
    const { user, loadUser, logout } = useAuth();

    loadUser()


    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'space-between',
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
                <IconButton
                    size="md"
                    variant="outlined"
                    color="neutral"
                    sx={{
                        display: { xs: 'none', sm: 'inline-flex' },
                        borderRadius: '50%',
                    }}
                    onClick={() => router.push('/')}
                >
                    <LanguageRoundedIcon />
                </IconButton>
                {user && (
                    <>
                        <Button
                            variant="plain"
                            color="neutral"
                            component="a"
                            onClick={() => router.push('/apartments')}
                            size="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Квартиры
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            component="a"
                            onClick={() => router.push('/my_apartments')}
                            size="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Купленные
                        </Button>
                    </>
                )}
                {user && user.role.id == 1 && (
                    <>
                        <Button
                            variant="plain"
                            color="neutral"
                            component="a"
                            onClick={() => router.push('/sold_apartments')}
                            size="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Проданные
                        </Button>
                    </>
                )}
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1.5,
                    alignItems: 'center',
                }}
            >
                {user ? (
                    <Dropdown>
                        <MenuButton
                            variant="plain"
                            size="sm"
                            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
                        >
                            <Avatar />
                        </MenuButton>
                        <Menu
                            placement="bottom-end"
                            size="sm"
                            sx={{
                                zIndex: '99999',
                                p: 1,
                                gap: 1,
                                '--ListItem-radius': 'var(--joy-radius-sm)',
                            }}
                        >
                            <MenuItem>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => router.push('/profile')}
                                >
                                    <Avatar
                                        sx={{ borderRadius: '50%' }}
                                    />
                                    <Box sx={{ ml: 1.5 }}>
                                        <Typography level="title-sm" textColor="text.primary">
                                            {user?.first_name} {user?.last_name}
                                        </Typography>
                                        <Typography level="body-xs" textColor="text.tertiary">
                                            {user?.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </MenuItem>
                            <ListDivider />
                            <MenuItem onClick={() => logout()}>
                                <LogoutRoundedIcon />
                                Выйти
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                ) : (
                    <>
                        <AuthForm />
                        <RegisterForm />
                    </>
                )}
            </Box>
        </Box>
    );
}