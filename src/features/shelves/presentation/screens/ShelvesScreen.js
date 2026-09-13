import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";
import { SHELVES } from "../../../../core/constants/shelves";
import useShelfCounts from "../hooks/useShelfCounts";

function ShelvesScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { counts, status } = useShelfCounts();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>My Shelves</Text>

      {status === "loading" ? (
        <ActivityIndicator color={colors.primary} style={styles.spinner} />
      ) : (
        <View style={styles.list}>
          {SHELVES.map((shelf) => {
            const count = counts[shelf.key] ?? 0;
            return (
              <TouchableOpacity
                key={shelf.key}
                style={styles.card}
                onPress={() => navigation.navigate("ShelfDetail", { shelf: shelf.key })}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name={shelf.icon} size={22} color={colors.primary} />
                </View>

                <View style={styles.cardText}>
                  <Text style={styles.label}>{shelf.label}</Text>
                  <Text style={styles.count}>
                    {count} {count === 1 ? "book" : "books"}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

export default ShelvesScreen;

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
    },
    spinner: {
      marginTop: 24,
    },
    list: {
      gap: 12,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      gap: 12,
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    cardText: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    count: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 2,
    },
  });
}
