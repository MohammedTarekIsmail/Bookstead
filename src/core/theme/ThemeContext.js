import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkColors, lightColors } from "./colors";

const STORAGE_KEY = "theme-preference";

const ThemeContext = createContext(null);

// Defaults to the device's system appearance until the user explicitly toggles it in settings.
function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        setOverride(stored);
      }
    });
  }, []);

  const mode = override ?? systemScheme ?? "light";
  const colors = mode === "dark" ? darkColors : lightColors;

  async function toggleTheme() {
    const nextMode = mode === "dark" ? "light" : "dark";
    setOverride(nextMode);
    await AsyncStorage.setItem(STORAGE_KEY, nextMode);
  }

  return (
    <ThemeContext.Provider value={{ colors, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
