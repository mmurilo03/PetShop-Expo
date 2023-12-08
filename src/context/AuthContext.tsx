import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getSavedUser, saveUser } from "../storage/storage";
import { api } from "../api/api";
import { useNavigation } from "@react-navigation/native";

export interface User {
    name: string,
    token: string
}

interface AuthContextProps {
    user: User
    login: (nome: string, senha: string) => void
    validToken: boolean
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
                setUser({ name: data.nome, token: data.token });
                saveUser({ name: data.nome, token: data.token });
            }
        } catch (error) {
            throw error;
        }
    }

    const getUser = async () => {
        const user = await getSavedUser();
        
        if (user && await verifyToken(user.token)) {
            return setUser(user);
        }
        
        setUser({ name: "", token: "" });
        saveUser({ name: "", token: "" });
    }

    const verifyToken = async (token: string) => {
        try{
            api.defaults.headers.common.Authorization = token;
            const res = await api.get("/responsavel");
            
            setValidToken(res.status == 200);
            return res.status == 200;
        } catch(error){
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
    <AuthContext.Provider value={{ user, login, validToken }}>
        {children}
    </AuthContext.Provider>
    )
}