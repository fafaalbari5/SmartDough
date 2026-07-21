import { View, FlatList, Button, Pressable, Text } from "react-native";

import TransactionItem from "../components/TransactionItem";

import { useTransactionStore } from "../store/transactionStore";
import { useNavigation } from "@react-navigation/native";

export default function TransactionsScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("AddTransaction")}
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          + Add Transaction
        </Text>
      </Pressable>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 100,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
              }}
            >
              No transactions yet
            </Text>
          </View>
        }
      />
    </View>
  );
}
