import { View, Text } from "react-native";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#2563eb",
        borderRadius: 20,
        padding: 20,
        marginTop: 30,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
        }}
      >
        Total Balance
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        Rp {balance.toLocaleString("id-ID")}
      </Text>
    </View>
  );
}
