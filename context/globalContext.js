import { useState, createContext } from "react";


export const globalContext = createContext();

function GlobalContextProvider({ children }) {

    const [profileImage, setProfileImage] = useState();
    const [vehicleImage, setVehicleImage] = useState();
    const [userprofileImage , setUserProfileImage] = useState()
    const [Open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


  
  return (
    <globalContext.Provider value={{profileImage, setProfileImage, vehicleImage, setVehicleImage,
      userprofileImage , setUserProfileImage, Open, setOpen, modalOpen, setModalOpen ,
      modalVisible, setModalVisible

    }}>
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContextProvider;
