import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../../core/theme/ThemeContext";
import { SHELVES } from "../../../../core/constants/shelves";
import useShelfBooks from "../hooks/useShelfBooks";
import ShelfBookRow from "../components/ShelfBookRow";

function ShelfDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { shelf } = route.params;
  const { books, status } = useShelfBooks(shelf);

  const title = SHELVES.find((item) => item.key === shelf)?.label ?? "Shelf";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        style={styles.list}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShelfBookRow
            book={item}
            onPress={() => navigation.navigate("BookDetail", { book: item })}
          />
        )}
        ListEmptyComponent={
          status === "loading" ? (
            <ActivityIndicator color={colors.primary} style={styles.message} />
          ) : (
            <Text style={styles.message}>No books on this shelf yet.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

export default ShelfDetailScreen;

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 12,
    },
    list: {
      flex: 1,
    },
    message: {
      marginTop: 24,
      color: colors.textMuted,
      textAlign: "center",
    },
  });
}
