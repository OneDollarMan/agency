"use client"
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import qs from "qs";

interface Role {
    id: number,
    alias: string,
    name: string
};

interface User {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    passport_number: string,
    passport_info: string,
    phone_number: string,
    role: Role,
};

interface Apartment {
    id: number,
    address: string,
    area: number,
    rooms_count: number,
    price: number,
    owner_id: string,
};

interface ApartmentOwner extends Apartment {
    owner: User,
}

interface AuthContextProps {
    roles: Array<Role>;
    user: User;
    apartments: Array<Apartment>;
    myApartments: Array<Apartment>;
    soldApartments: Array<ApartmentOwner>;
    error: string;
    loginUser: (formData) => Promise<boolean>;
    registerUser: (formData) => Promise<boolean>;
    loadUser: () => void;
    patchUser: (formData) => void;
    logout: () => void;

    addApartment: (data: any) => boolean;
    getApartment: (id: number) => Apartment;
    patchApartment: (data: any) => Apartment;
    deleteApartment: (id: number) => boolean;
    buyApartment: (id: number) => boolean;
    sellApartment: (id: number) => boolean;
    loadFreeApartments: () => void;
    loadSoldApartments: () => void;
    loadMyApartments: () => void;
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const url = "http://127.0.0.1"
    const router = useRouter()
    const [error, setError] = useState<string>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [roles, setRoles] = useState<Array<Role>>([]);
    const [user, setUser] = useState<User>(null);
    const [apartments, setApartments] = useState<Array<Apartment>>([]);
    const [myApartments, setMyApartments] = useState<Array<Apartment>>([]);
    const [soldApartments, setSoldApartments] = useState<Array<ApartmentOwner>>([]);

    useEffect(() => {
        if (!user) {
            const storedUserData = localStorage.getItem("user");
            if (storedUserData != undefined) {
                try {
                    setUser(JSON.parse(storedUserData))
                } catch (e) {
                    //console.log(e)
                }
            }
        }
        if (!isLoggedIn) {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn != undefined) {
                try {
                    setIsLoggedIn(JSON.parse(isLoggedIn))
                } catch (e) {
                    //console.log(e)
                }
            }
        }
    }, [user, isLoggedIn]);

    const sendQueryToApi = async (addr: string, method: string, callbackSet: Function, body: any = null): Promise<any> => {
        var params: any = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        }
        if (body) {
            params.body = JSON.stringify(body)
        }

        const resp = await fetch(`${url}${addr}`, params)
        if (resp.status == 401) {
            setUser(null);
            setIsLoggedIn(false);
            localStorage.setItem("user", JSON.stringify(null));
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
            return;
        }
        var data = null;
        try {
            data = await resp.json();
        } catch (error) {
        }

        return callbackSet(data);
    };

    const loginUser = async (formData) => {
        try {
            const response = await fetch(`${url}/api_users/auth/jwt/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: qs.stringify(formData),
            });

            if (response.ok) {
                // Успешная авторизация, выполните дополнительные действия
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", JSON.stringify(true));
                router.push("/my_apartments");
                return true;
            } else {
                // Обработка ошибки авторизации
                setError("Неверный логин или пароль");
            }
        } catch (error) {
            setError("Ошибка на стороне сервера");
            console.error("Ошибка при отправке запроса:", error);
        }
    };

    const registerUser = async (formData) => {
        try {
            const response = await fetch(`${url}/api_users/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Успешная регистрация, выполните дополнительные действия
                return true;
            } else {
                // Обработка ошибки регистрации
                console.error("Ошибка при регистрации:", response.statusText);
                setError("Почта занята");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            setError("Ошибка на стороне сервера")
        }
    };

    const loadUser = async () => {
        useEffect(() => {
            if (isLoggedIn) {
                sendQueryToApi('/api_users/users/me', 'GET', (data) => {
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                })
            }
        }, [isLoggedIn]);
    };

    const patchUser = (formData) => {
        sendQueryToApi(`/api_users/users/me`, 'PATCH', (data) => {
            if (data.email != undefined) {
                setUser(data)
            }
        }, formData)
    };

    const logout = () => {
        sendQueryToApi('/api_users/auth/jwt/logout', 'POST', () => {
            router.push('/')
            setUser(null);
            setIsLoggedIn(false);
            localStorage.setItem("user", JSON.stringify(null));
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
        })
    };

    const addApartment = (data): any => {
        sendQueryToApi('/api_apartments/apartments', 'POST', (data) => {
            setApartments(oldArray => [...oldArray, data]);
        }, data)
        return true;
    }

    const getApartment = (id): any => {
        const [a, setA] = useState<Apartment>(null);
        useEffect(() => {
            sendQueryToApi(`/api_apartments/apartments/${id}`, 'GET', (data) => {
                setA(data)
            })
        }, [])

        return a;
    }

    const patchApartment = (data): any => {
        sendQueryToApi('/api_apartments/apartments', 'PATCH', (data) => {
        }, data)
        return true;
    }

    const deleteApartment = (id): any => {
        sendQueryToApi(`/api_apartments/apartments/${id}`, 'DELETE', () => {
            setApartments(apartments.filter(item => item.id !== id));
        })
        return true;
    }

    const buyApartment = (id): any => {
        sendQueryToApi('/api_apartments/buy_apartment/', 'POST', () => {
            setApartments(apartments.filter(item => item.id !== id));
        }, { id: id })
        return true;
    }

    const sellApartment = (id): any => {
        sendQueryToApi('/api_apartments/sell_apartment/', 'POST', () => {
            setMyApartments(myApartments.filter(item => item.id !== id));
        }, { id: id })
        return true;
    }

    const loadFreeApartments = () => {
        useEffect(() => {
            sendQueryToApi('/api_apartments/free_apartments', 'GET', (data) => {
                setApartments(data);
            })
        }, [])
    }

    const loadMyApartments = () => {
        useEffect(() => {
            sendQueryToApi('/api_apartments/my_apartments', 'GET', (data) => {
                setMyApartments(data);
            })
        }, [])
    }

    const loadSoldApartments = () => {
        useEffect(() => {
            sendQueryToApi('/api_apartments/sold_apartments', 'GET', (data) => {
                setSoldApartments(data);
            })
        }, [])
    }

    return (
        <AuthContext.Provider value={{ error, roles, user, apartments, myApartments, soldApartments, loginUser, registerUser, loadUser, patchUser, logout, addApartment, getApartment, patchApartment, loadFreeApartments, deleteApartment, buyApartment, loadMyApartments, loadSoldApartments, sellApartment }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};