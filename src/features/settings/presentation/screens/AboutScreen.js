import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../../core/theme/ThemeContext";

function AboutScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appName}>Bookstead</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <Text style={styles.paragraph}>
          Bookstead is a personal reading tracker for searching books, organizing
          them on shelves, tracking reading progress, and scanning barcodes to
          add physical books instantly.
        </Text>

        <Text style={styles.paragraph}>
          Book data is provided by the Open Library API, a free and open project
          from the Internet Archive.
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL("https://openlibrary.org")}>
          <Text style={styles.link}>openlibrary.org</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutScreen;

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
      padding: 16,
    },
    appName: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    version: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 4,
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: 16,
    },
    link: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "600",
    },
  });
}
