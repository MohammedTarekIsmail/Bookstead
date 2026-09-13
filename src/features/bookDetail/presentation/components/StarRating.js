import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useBookRating from "../hooks/useBookRating";

const STAR_VALUES = [1, 2, 3, 4, 5];

function StarRating({ bookId }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { rating, updateRating } = useBookRating(bookId);

  return (
    <View style={styles.row}>
      {STAR_VALUES.map((value) => (
        <TouchableOpacity key={value} onPress={() => updateRating(value)}>
          <Ionicons
            name={value <= rating ? "star" : "star-outline"}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default StarRating;

function createStyles(colors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      gap: 6,
      marginTop: 16,
    },
  });
}
