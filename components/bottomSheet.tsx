import { useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomBottomSheet() {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["25%", "50%", "90%"];

  const openBottomSheet = () => {
    sheetRef.current?.expand(); 
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* 🛠 Button to Open Bottom Sheet */}
        <Button title="Open Bottom Sheet" onPress={openBottomSheet} />

        {/* 🛠 Bottom Sheet Component */}
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <Text style={styles.text}>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
