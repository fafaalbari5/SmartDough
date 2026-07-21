import { View, Text } from "react-native";

import { Transaction } from "../types/transaction";

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({
  transaction,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {transaction.title}
      </Text>

      <Text>{transaction.category}</Text>

      <Text
        style={{
          marginTop: 5,
        }}
      >
        Rp {transaction.amount.toLocaleString("id-ID")}
      </Text>
    </View>
  );
}