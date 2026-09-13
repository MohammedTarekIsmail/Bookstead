import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useFavouriteStatus from "../hooks/useFavouriteStatus";

function FavouriteButton({ book }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { isFavourite, toggle } = useFavouriteStatus(book);

  return (
    <TouchableOpacity style={styles.button} onPress={toggle}>
      <Ionicons
        name={isFavourite ? "heart" : "heart-outline"}
        size={28}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

export default FavouriteButton;

function createStyles(colors) {
  return StyleSheet.create({
    button: {
      marginTop: 8,
    },
  });
}
