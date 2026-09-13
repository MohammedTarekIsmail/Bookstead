import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useIsbnScanner from "../hooks/useIsbnScanner";

function ScannerScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [permission, requestPermission] = useCameraPermissions();
  const { status, handleBarcodeScanned, reset } = useIsbnScanner((book) => {
    navigation.navigate("BookDetail", { book });
  });

  if (!permission) {
    return (
      <SafeAreaView style={styles.centered} edges={["top"]}>
        <ActivityIndicator color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centered} edges={["top"]}>
        <Text style={styles.message}>
          Bookstead needs camera access to scan book barcodes.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Camera Access</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
        onBarcodeScanned={status === "idle" ? handleBarcodeScanned : undefined}
      />

      <View style={styles.overlay} pointerEvents="box-none">
        {status === "idle" && (
          <Text style={styles.hint}>Point the camera at a book's barcode</Text>
        )}

        {status === "looking-up" && (
          <View style={styles.statusCard}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.statusText}>Looking up book…</Text>
          </View>
        )}

        {status === "not-found" && (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>No book found for that barcode.</Text>
            <TouchableOpacity style={styles.button} onPress={reset}>
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === "error" && (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>Something went wrong. Please try again.</Text>
            <TouchableOpacity style={styles.button} onPress={reset}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default ScannerScreen;

function createStyles(colors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#000000",
    },
    camera: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 40,
    },
    hint: {
      color: "#ffffff",
      fontSize: 14,
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    statusCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      gap: 8,
      marginHorizontal: 24,
    },
    statusText: {
      fontSize: 14,
      color: colors.text,
      textAlign: "center",
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      padding: 24,
      gap: 16,
    },
    message: {
      fontSize: 15,
      color: colors.text,
      textAlign: "center",
    },
    button: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: "#ffffff",
      fontWeight: "600",
    },
  });
}
