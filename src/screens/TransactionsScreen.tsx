import {
  View,
  FlatList,
} from "react-native";

import TransactionItem from "../components/TransactionItem";

import { useTransactionStore } from "../store/transactionStore";

export default function TransactionsScreen() {
  const transactions =
    useTransactionStore(
      (state) => state.transactions
    );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
          />
        )}
      />
    </View>
  );
}