import { useState, createContext } from "react";


export const globalContext = createContext();

function GlobalContextProvider({ children }) {
    const [profileImage, setProfileImage] = useState('');
    const [vehicleImage, setVehicleImage] = useState('');
    const [userprofileImage , setUserProfileImage] = useState('')
  
  return (
    <globalContext.Provider value={{profileImage, setProfileImage, vehicleImage, setVehicleImage,
      userprofileImage , setUserProfileImage
    }}>
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContextProvider;
