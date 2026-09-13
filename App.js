import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/core/theme/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { mode } = useTheme();

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default App;
