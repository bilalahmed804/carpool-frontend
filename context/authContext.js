import { AppRoutes } from "@/constant/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(AsyncStorage.getItem("token") || null );
  
  useEffect(()=> {
    const getCurrentUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const response = await axios.get(AppRoutes.getCurrentUser, {
          headers : { Authorization : `Bearer ${token}`}
        })
        setUser(response?.data?.data)
      } catch (error) {
        console.log("no token==>", error)
      }
    }
    getCurrentUserInfo()
  }, [])  
  


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
