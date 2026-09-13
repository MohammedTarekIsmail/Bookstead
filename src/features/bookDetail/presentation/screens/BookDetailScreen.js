import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useBookDescription from "../hooks/useBookDescription";
import useBookShelfStatus from "../hooks/useBookShelfStatus";
import ShelfButtons from "../components/ShelfButtons";
import ReadingProgress from "../components/ReadingProgress";
import FavouriteButton from "../components/FavouriteButton";
import StarRating from "../components/StarRating";

function BookDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const book = route.params?.book;
  // Called unconditionally (React's Rules of Hooks) — book?.id is undefined
  // when there's no book, and the hooks just no-op in that case.
  const { description, status } = useBookDescription(book?.id);
  const { shelf, selectShelf } = useBookShelfStatus(book);

  const backButton = (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
  );

  if (!book) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {backButton}
        <View style={styles.centered}>
          <Text style={styles.subtitle}>No book selected.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {backButton}
      <ScrollView contentContainerStyle={styles.container}>
        {book.coverUrl ? (
          <Image source={{ uri: book.coverUrl }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]} />
        )}

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.subtitle}>
          {book.authors.join(", ") || "Unknown author"}
        </Text>

        <FavouriteButton book={book} />

        {book.publishYear && (
          <Text style={styles.meta}>First published {book.publishYear}</Text>
        )}
        {book.genres?.length > 0 && (
          <Text style={styles.meta}>{book.genres.join(" · ")}</Text>
        )}

        <ShelfButtons shelf={shelf} onSelectShelf={selectShelf} />

        {shelf === "reading" && <ReadingProgress bookId={book.id} />}
        {shelf === "finished" && <StarRating bookId={book.id} />}

        <Text style={styles.description}>
          {status === "loading"
            ? "Loading description…"
            : (description ?? "No description available yet.")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookDetailScreen;

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
      flexGrow: 1,
      alignItems: "center",
      padding: 16,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    cover: {
      width: 140,
      height: 210,
      borderRadius: 8,
      backgroundColor: colors.surface,
      marginBottom: 16,
    },
    coverPlaceholder: {},
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 15,
      color: colors.textMuted,
      marginTop: 4,
      textAlign: "center",
    },
    meta: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 8,
      textAlign: "center",
    },
    description: {
      fontSize: 14,
      color: colors.text,
      marginTop: 16,
      lineHeight: 20,
      alignSelf: "stretch",
    },
  });
}
