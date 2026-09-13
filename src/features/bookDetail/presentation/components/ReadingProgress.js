import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "../../../../core/theme/ThemeContext";
import useBookProgress from "../hooks/useBookProgress";

function ReadingProgress({ bookId }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { progress, updateProgress } = useBookProgress(bookId);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{progress}% read</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={progress}
        onSlidingComplete={updateProgress}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primary}
      />
    </View>
  );
}

export default ReadingProgress;

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      alignSelf: "stretch",
      marginTop: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
      marginBottom: 4,
    },
    slider: {
      width: "100%",
      height: 40,
    },
  });
}
