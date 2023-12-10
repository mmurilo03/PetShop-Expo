import { ReactNode, createContext, useEffect, useState } from "react";
import { getSavedUser, saveUser } from "../storage/storage";
import { api } from "../api/api";

export interface User {
    name: string,
    token: string,
    img: string,
    email: string,
    id: number,
    funcao: string,
    telefone: string,
}

interface AuthContextProps {
    user: User
    login: (nome: string, senha: string) => void
    logout: () => void
    updateUser: (newUser: User) => void
    loading: boolean
    validToken: boolean
    verifyToken: (token: string) => Promise<boolean>
}

interface AuthComponentProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthComponent = ({children}: AuthComponentProps) => {

    const [user, setUser] = useState<User>({} as User);
    const [validToken, setValidToken] = useState<boolean>(false as boolean);
    const [loading, setLoading] = useState<boolean>(true as boolean);

    const login = async (email: string, senha: string) => {
        try {
            const { data } = await api.post("/responsavel/login", {email, senha});
            if (data.token) {                
                setUser({ name: data.nome, token: data.token, img: data.img, email: data.email, funcao: data.funcao, id: data.id, telefone: data.telefone });
                saveUser({ name: data.nome, token: data.token, img: data.img, email: data.email, funcao: data.funcao, id: data.id, telefone: data.telefone });
                setValidToken(true);
            }
        } catch (error) {
            throw error;
        }
    }

    const updateUser = async (newUser: any) => {
        setUser({ name: newUser.nome, token: user.token, img: newUser.imagem, email: newUser.email, funcao: newUser.funcao, id: newUser.id, telefone: newUser.telefone });
        await saveUser({ name: newUser.nome, token: user.token, img: newUser.imagem, email: newUser.email, funcao: newUser.funcao, id: newUser.id, telefone: newUser.telefone });
        getUser();
    }

    const logout = () => {
        try {
            setUser({ name: "", token: "", img: "", email: "", funcao: "", id: 0, telefone: ""});
            saveUser({ name: "", token: "", img: "", email: "", funcao: "", id: 0, telefone: ""});
            setValidToken(false);
            } catch (error) {

        }
    }

    const getUser = async () => {
        const user = await getSavedUser();

        if (user && await verifyToken(user.token)) {
            setLoading(false);
            return setUser(user);
        }
        setLoading(false);
        setUser({ name: "", token: "", img: "", email: "", funcao: "", id: 0, telefone: "" });
        saveUser({ name: "", token: "", img: "", email: "", funcao: "", id: 0, telefone: "" });
    }

    const verifyToken = async (token: string) => {
        try{
            api.defaults.headers.common.Authorization = token;
            const res = await api.get("/responsavel/verify");
            
            setValidToken(res.status == 200);
            return res.status == 200;
        } catch(error){
            setValidToken(false)
            return false
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
    <AuthContext.Provider value={{ user, login, logout, validToken, verifyToken, loading, updateUser }}>
        {children}
    </AuthContext.Provider>
    )
}