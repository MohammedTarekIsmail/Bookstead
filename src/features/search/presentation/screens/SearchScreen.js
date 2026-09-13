import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useSearchBooks from "../hooks/useSearchBooks";
import SearchInput from "../components/SearchInput";
import BookResultItem from "../components/BookResultItem";
import TrendingSection from "../components/TrendingSection";

const TRENDING_SECTIONS = [
  { period: "daily", title: "Trending Today" },
  { period: "weekly", title: "Trending This Week" },
  { period: "monthly", title: "Trending This Month" },
];

function SearchScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {
    query,
    setQuery,
    results,
    status,
    trending,
    trendingStatus,
    expandedPeriod,
    setExpandedPeriod,
  } = useSearchBooks();

  const goToBookDetail = (book) => navigation.navigate("BookDetail", { book });
  const isSearching = query.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SearchInput value={query} onChangeText={setQuery} />

      {isSearching ? (
        <FlatList
          style={styles.list}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookResultItem book={item} onPress={() => goToBookDetail(item)} />
          )}
          ListEmptyComponent={
            status === "loading" ? (
              <ActivityIndicator color={colors.primary} style={styles.message} />
            ) : (
              <Text style={styles.message}>
                {status === "error"
                  ? "Something went wrong. Please try again."
                  : "No books found."}
              </Text>
            )
          }
        />
      ) : expandedPeriod ? (
        <FlatList
          style={styles.list}
          data={trending[expandedPeriod]}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setExpandedPeriod(null)}
            >
              <Text style={styles.backButtonText}>‹ Back to Trending</Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <BookResultItem book={item} onPress={() => goToBookDetail(item)} />
          )}
        />
      ) : trendingStatus === "loading" ? (
        <ActivityIndicator color={colors.primary} style={styles.message} />
      ) : trendingStatus === "error" ? (
        <Text style={styles.message}>Something went wrong. Please try again.</Text>
      ) : (
        <ScrollView style={styles.list}>
          {TRENDING_SECTIONS.map((section) => (
            <TrendingSection
              key={section.period}
              title={section.title}
              books={trending[section.period]}
              onPressBook={goToBookDetail}
              onSeeMore={() => setExpandedPeriod(section.period)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 12,
    },
    list: {
      flex: 1,
    },
    message: {
      marginTop: 24,
      color: colors.textMuted,
      textAlign: "center",
    },
    backButton: {
      marginBottom: 12,
    },
    backButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.primary,
    },
  });
}
