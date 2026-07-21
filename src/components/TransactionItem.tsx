import { View, Text } from "react-native";
import { Transaction } from "../types/transaction";

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({
  transaction,
}: Props) {
  const isIncome =
    transaction.type === "income";

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {transaction.title}
          </Text>

          <Text
            style={{
              color: "#6b7280",
              marginTop: 4,
            }}
          >
            {transaction.category}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: isIncome
              ? "#16a34a"
              : "#dc2626",
          }}
        >
          {isIncome ? "+" : "-"} Rp{" "}
          {transaction.amount.toLocaleString(
            "id-ID"
          )}
        </Text>
      </View>
    </View>
  );
}