import { useState, createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  User: string | null;
  setUser: Dispatch<SetStateAction<null>> ;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthContextProvider({ children }: any) {
  const [User, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ User, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
