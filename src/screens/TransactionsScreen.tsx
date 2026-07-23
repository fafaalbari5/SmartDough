import { useMemo, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import TransactionItem from "../components/TransactionItem";
import { useTransactionStore } from "../store/transactionStore";

export default function TransactionsScreen() {
  const navigation = useNavigation<any>();

  const transactions = useTransactionStore(
    (state) => state.transactions,
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "income" | "expense"
  >("all");

  const filteredTransactions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        keyword === "" ||
        transaction.title.toLowerCase().includes(keyword) ||
        transaction.category.toLowerCase().includes(keyword) ||
        transaction.type.toLowerCase().includes(keyword) ||
        transaction.amount.toString().includes(keyword);

      const matchesFilter =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Search */}

      <TextInput
        placeholder="Search transaction..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
        style={{
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          marginBottom: 16,
        }}
      />

      {/* Filter */}

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {(["all", "income", "expense"] as const).map((type) => (
          <Pressable
            key={type}
            onPress={() => setFilter(type)}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor:
                filter === type ? "#2563eb" : "#e5e7eb",
              backgroundColor:
                filter === type ? "#2563eb" : "white",
            }}
          >
            <Text
              style={{
                color:
                  filter === type ? "white" : "#374151",
                fontWeight: "600",
              }}
            >
              {type === "all"
                ? "All"
                : type === "income"
                ? "Income"
                : "Expense"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* List */}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
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
              marginTop: 80,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: 15,
              }}
            >
              {search.trim() !== "" || filter !== "all"
                ? "No matching transaction"
                : "No transactions yet"}
            </Text>
          </View>
        }
      />

      {/* Floating Button */}

      <Pressable
        onPress={() =>
          navigation.navigate("AddTransaction")
        }
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

          elevation: 6,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}