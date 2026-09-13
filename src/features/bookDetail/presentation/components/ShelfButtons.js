import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../core/theme/ThemeContext";
import { SHELVES } from "../../../../core/constants/shelves";

function ShelfButtons({ shelf, onSelectShelf }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.row}>
      {SHELVES.map((option) => {
        const active = option.key === shelf;
        return (
          <TouchableOpacity
            key={option.key}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => onSelectShelf(option.key)}
          >
            <Text style={[styles.buttonText, active && styles.buttonTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default ShelfButtons;

function createStyles(colors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
      marginTop: 16,
    },
    button: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    buttonActive: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.primary,
    },
    buttonTextActive: {
      color: "#ffffff",
    },
  });
}
