import { AuthContext } from "@/context/authContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

function RoleBasedNavigation() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useFocusEffect(() => {
    if (!user) return;

    if (user?.role === "driver") {
      router.push("/pages/driverdashboard");
    } else if (user?.role === "user") {
      router.push("/pages/userdashboard");
    } else {
      router.push("/");
    }
  });

  return null;
}

export default RoleBasedNavigation;