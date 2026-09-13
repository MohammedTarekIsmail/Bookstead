import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../core/theme/ThemeContext";

function TrendingBookCard({ book, onPress }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {book.coverUrl ? (
        <Image source={{ uri: book.coverUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]} />
      )}
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
    </TouchableOpacity>
  );
}

export default TrendingBookCard;

function createStyles(colors) {
  return StyleSheet.create({
    card: {
      width: 100,
      marginRight: 12,
    },
    cover: {
      width: 100,
      height: 150,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },
    coverPlaceholder: {},
    title: {
      fontSize: 13,
      color: colors.text,
      marginTop: 6,
    },
  });
}
