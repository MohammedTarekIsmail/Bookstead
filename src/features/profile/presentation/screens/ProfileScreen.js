import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";
import { SHELVES } from "../../../../core/constants/shelves";
import useProfileStats from "../hooks/useProfileStats";
import useFavouriteBooks from "../hooks/useFavouriteBooks";
import FavouriteBookRow from "../components/FavouriteBookRow";

const FAVOURITES_PAGE_SIZE = 5;

function ProfileScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { counts, totalCount, status } = useProfileStats();
  const { books: favouriteBooks, status: favouritesStatus } = useFavouriteBooks();
  const [showAllFavourites, setShowAllFavourites] = useState(false);

  const hasMoreFavourites = favouriteBooks.length > FAVOURITES_PAGE_SIZE;
  const displayedFavourites = showAllFavourites
    ? favouriteBooks
    : favouriteBooks.slice(0, FAVOURITES_PAGE_SIZE);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={displayedFavourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavouriteBookRow
            book={item}
            onPress={() => navigation.navigate("BookDetail", { book: item })}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Profile / Stats</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Ionicons name="settings-outline" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {status === "loading" ? (
              <ActivityIndicator color={colors.primary} style={styles.spinner} />
            ) : (
              <>
                <View style={styles.totalCard}>
                  <View style={styles.totalIconCircle}>
                    <Ionicons name="library" size={24} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.totalNumber}>{totalCount}</Text>
                    <Text style={styles.totalLabel}>Books Tracked</Text>
                  </View>
                </View>

                <View style={styles.list}>
                  {SHELVES.map((shelf) => {
                    const count = counts[shelf.key] ?? 0;
                    return (
                      <View key={shelf.key} style={styles.card}>
                        <View style={styles.iconCircle}>
                          <Ionicons name={shelf.icon} size={20} color={colors.primary} />
                        </View>
                        <Text style={styles.cardLabel}>{shelf.label}</Text>
                        <Text style={styles.cardCount}>{count}</Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}

            <Text style={styles.sectionTitle}>Favourites</Text>
          </>
        }
        ListFooterComponent={
          !showAllFavourites && hasMoreFavourites ? (
            <TouchableOpacity onPress={() => setShowAllFavourites(true)}>
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          favouritesStatus === "loading" ? null : (
            <Text style={styles.message}>No favourite books yet.</Text>
          )
        }
      />
    </SafeAreaView>
  );
}

export default ProfileScreen;

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    spinner: {
      marginTop: 24,
    },
    totalCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 16,
      borderRadius: 14,
      backgroundColor: colors.surface,
      marginBottom: 12,
    },
    totalIconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    totalNumber: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.primary,
    },
    totalLabel: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 2,
    },
    list: {
      gap: 10,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    iconCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    cardLabel: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
    cardCount: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginTop: 24,
      marginBottom: 8,
    },
    seeMore: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
      textAlign: "center",
      marginTop: 12,
    },
    message: {
      color: colors.textMuted,
      textAlign: "center",
      marginTop: 12,
    },
  });
}
