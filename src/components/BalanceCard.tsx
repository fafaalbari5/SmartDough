import { View, Text } from "react-native";

interface Props {
  balance: number;
}

export default function BalanceCard({
  balance,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "#2563eb",
        borderRadius: 24,
        padding: 24,
        marginTop: 25,
      }}
    >
      <Text
        style={{
          color: "#bfdbfe",
          fontSize: 15,
        }}
      >
        Total Balance
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 34,
          fontWeight: "bold",
          marginTop: 8,
        }}
      >
        Rp {balance.toLocaleString("id-ID")}
      </Text>
    </View>
  );
}