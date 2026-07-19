import { View, Text } from "react-native";
import BalanceCard from "../components/BalanceCard";

export default function DashboardScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        SmartDough
      </Text>

      <Text
        style={{
          marginTop: 10,
          color: "gray",
        }}
      >
        Personal Finance Tracker
      </Text>
      <BalanceCard />
    </View>
  );
}