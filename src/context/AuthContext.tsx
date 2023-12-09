import { ReactNode, createContext, useEffect, useState } from "react";
import { getSavedUser, saveUser } from "../storage/storage";
import { api } from "../api/api";
import { jwtDecode } from "jwt-decode";

export interface User {
    name: string,
    token: string,
    img: string,
}

interface AuthContextProps {
    user: User
    login: (nome: string, senha: string) => void
    logout: () => void
    validToken: boolean
    verifyToken: () => boolean
}

interface AuthComponentProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthComponent = ({children}: AuthComponentProps) => {

    const [user, setUser] = useState<User>({} as User);
    const [validToken, setValidToken] = useState<boolean>(false as boolean);

    const login = async (email: string, senha: string) => {
        try {
            const { data } = await api.post("/responsavel/login", {email, senha});
            if (data.token) {
                setUser({ name: data.nome, token: data.token, img: data.img });
                saveUser({ name: data.nome, token: data.token, img: data.img });
                setValidToken(true);
            }
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        try {
            setUser({ name: "", token: "", img: ""});
            saveUser({ name: "", token: "", img: ""});
            setValidToken(false);
            } catch (error) {

        }
    }

    const getUser = async () => {
        const user = await getSavedUser();
        
        if (user && await verifyToken()) {
            return setUser(user);
        }
        
        setUser({ name: "", token: "", img: "" });
        saveUser({ name: "", token: "", img: "" });
    }

    const verifyToken = () => {
        try {
            const decodedToken = jwtDecode(user.token);
            if (decodedToken.exp && decodedToken.exp * 1000 > new Date().getTime()){
                setValidToken(true)
                return true;
            }
            setValidToken(false)
            return false
        } catch (e) {
            return false
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
    <AuthContext.Provider value={{ user, login, logout, validToken, verifyToken }}>
        {children}
    </AuthContext.Provider>
    )
}