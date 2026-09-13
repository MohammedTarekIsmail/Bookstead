import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "../../../../core/theme/ThemeContext";

function SearchInput({ value, onChangeText }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search books by title or author"
      placeholderTextColor={colors.textMuted}
      value={value}
      onChangeText={onChangeText}
      autoCorrect={false}
    />
  );
}

export default SearchInput;

function createStyles(colors) {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 12,
      color: colors.text,
    },
  });
}
