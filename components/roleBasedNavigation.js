import { AuthContext } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

function RoleBasedNavigation() {
  const { user } = useContext(AuthContext);
  const router = useRouter()


  useEffect(()=> {
    if (!user) {
      router.push("/");
      return;
    }
    if (user) {
      switch (user?.role) {
        case "driver":
          router.push("/pages/driverdashboard");
          break;
        case "user":
          router.push("/pages/userdashboard");
          break;
        default:
          router.push("/"); 
      }
    }
  }, [user])

  return <></>; 
};

export default RoleBasedNavigation;
