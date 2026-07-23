import { View, Text } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { formatCurrency } from "../utils/formatters";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.xxl,
        padding: SPACING.giant,
        marginTop: SPACING.giant,
      }}
    >
      <Text style={{ color: COLORS.primarySoft, fontSize: 15 }}>
        Total Balance
      </Text>

      <Text
        style={{
          color: COLORS.white,
          fontSize: 34,
          fontWeight: "bold",
          marginTop: SPACING.sm,
        }}
      >
        {formatCurrency(balance)}
      </Text>
    </View>
  );
}
