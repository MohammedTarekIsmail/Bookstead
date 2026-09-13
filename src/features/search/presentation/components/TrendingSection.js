import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../core/theme/ThemeContext";
import TrendingBookCard from "./TrendingBookCard";

const CARD_LIMIT = 10;

function TrendingSection({ title, books, onPressBook, onSeeMore }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onSeeMore}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={books.slice(0, CARD_LIMIT)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrendingBookCard book={item} onPress={() => onPressBook(item)} />
        )}
      />
    </View>
  );
}

export default TrendingSection;

function createStyles(colors) {
  return StyleSheet.create({
    section: {
      marginBottom: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    seeMore: {
      fontSize: 13,
      color: colors.primary,
      fontWeight: "600",
    },
  });
}
