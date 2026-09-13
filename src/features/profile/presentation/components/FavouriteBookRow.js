import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../core/theme/ThemeContext";

function FavouriteBookRow({ book, onPress }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {book.coverUrl ? (
        <Image source={{ uri: book.coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]} />
      )}
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.authors.join(", ") || "Unknown author"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default FavouriteBookRow;

function createStyles(colors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 12,
      paddingVertical: 8,
    },
    cover: {
      width: 48,
      height: 72,
      borderRadius: 4,
      backgroundColor: colors.surface,
    },
    coverPlaceholder: {},
    text: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    author: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 2,
    },
  });
}
