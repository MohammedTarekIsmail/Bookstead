import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import BookDetailScreen from "../features/bookDetail/presentation/screens/BookDetailScreen";
import ShelfDetailScreen from "../features/shelves/presentation/screens/ShelfDetailScreen";
import SettingsScreen from "../features/settings/presentation/screens/SettingsScreen";
import AboutScreen from "../features/settings/presentation/screens/AboutScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="ShelfDetail" component={ShelfDetailScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
