import { View, Text, Pressable } from "react-native";
import { Transaction } from "../types/transaction";
import { useTransactionStore } from "../store/transactionStore";

interface Props {
  transaction: Transaction;
  onEdit?: () => void;
}

export default function TransactionItem({ transaction, onEdit }: Props) {
  const isIncome = transaction.type === "income";
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction,
  );

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
            color: isIncome ? "#16a34a" : "#dc2626",
          }}
        >
          {isIncome ? "+" : "-"} Rp {transaction.amount.toLocaleString("id-ID")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable onPress={onEdit}>
          <Text
            style={{
              color: "#2563eb",
              marginTop: 8,
            }}
          >
            Edit
          </Text>
        </Pressable>
        <Pressable onPress={() => removeTransaction(transaction.id)}>
          <Text
            style={{
              color: "red",
              marginTop: 10,
            }}
          >
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
