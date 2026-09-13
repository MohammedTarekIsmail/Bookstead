import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";

function SettingsScreen() {
  const navigation = useNavigation();
  const { colors, mode, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Mode</Text>
          <Switch
            value={mode === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary }}
          />
        </View>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("About")}>
          <Text style={styles.rowLabel}>About</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;

function createStyles(colors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backButton: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignSelf: "flex-start",
    },
    container: {
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowLabel: {
      fontSize: 16,
      color: colors.text,
    },
  });
}
