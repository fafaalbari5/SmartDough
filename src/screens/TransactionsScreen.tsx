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
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onEdit={() =>
              navigation.navigate("EditTransaction", {
                transaction: item,
              })
            }
          />
        )}
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
      <Pressable
        onPress={() => navigation.navigate("AddTransaction")}
        style={{
          position: "absolute",

          right: 20,
          bottom: 20,

          width: 60,
          height: 60,

          borderRadius: 30,

          backgroundColor: "#2563eb",

          justifyContent: "center",
          alignItems: "center",

          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}
