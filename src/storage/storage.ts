import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../context/AuthContext"


export const saveUser = async (user: User) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
}

export const getSavedUser = async () => {
    const userString = await AsyncStorage.getItem("user");

    const user: User = userString ? JSON.parse(userString) : {};
    
    return user;
}