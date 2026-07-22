import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import TransactionStack from "./TransactionStack";
import StatisticsScreen from "../screens/StatisticsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",

        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "home";
              break;

            case "Transactions":
              iconName = "wallet";
              break;

            case "Statistics":
              iconName = "pie-chart";
              break;

            default:
              iconName = "settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}}/>

      <Tab.Screen name="Transactions" component={TransactionStack} options={{headerShown: false}}/>

      <Tab.Screen name="Statistics" component={StatisticsScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
