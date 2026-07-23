import { View, Text, Pressable } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { useTransactionStore } from "../store/transactionStore";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Transaction } from "../types/transaction";

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
        backgroundColor: COLORS.surface,
        padding: SPACING.xxxl,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.lg,
        shadowColor: COLORS.shadow,
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
        <View style={{ flex: 1, marginRight: SPACING.md }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {transaction.title}
          </Text>

          <Text style={{ color: COLORS.secondaryText, marginTop: SPACING.xs }}>
            {transaction.category}
            <Text
              style={{
                color: COLORS.tertiaryText,
                fontSize: 12,
                marginTop: SPACING.xs,
              }}
            >
              {` ${formatDate(transaction.createdAt)}`}
            </Text>
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: isIncome ? COLORS.success : COLORS.danger,
          }}
        >
          {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: SPACING.sm,
        }}
      >
        <Pressable onPress={onEdit}>
          <Text style={{ color: COLORS.primary, marginTop: SPACING.sm }}>
            Edit
          </Text>
        </Pressable>
        <Pressable onPress={() => removeTransaction(transaction.id)}>
          <Text style={{ color: COLORS.danger, marginTop: SPACING.sm }}>
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
