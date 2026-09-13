import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../features/search/presentation/screens/SearchScreen";
import ShelvesScreen from "../features/shelves/presentation/screens/ShelvesScreen";
import ScannerScreen from "../features/scanner/presentation/screens/ScannerScreen";
import ProfileScreen from "../features/profile/presentation/screens/ProfileScreen";
import { useTheme } from "../core/theme/ThemeContext";

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shelves"
        component={ShelvesScreen}
        options={{
          title: "My Shelves",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
