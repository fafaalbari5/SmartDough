import { useCallback } from "react";
import { View, FlatList, Pressable, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TransactionItem from "../components/TransactionItem";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import {
  TRANSACTION_FILTERS,
  TRANSACTION_SORT_OPTIONS,
} from "../constants/theme";
import { useTransactionFilters } from "../hooks/useTransactionFilters";
import { useTransactionStore } from "../store/transactionStore";
import { getTransactionTypeLabel } from "../utils/formatters";

export default function TransactionsScreen() {
  const navigation = useNavigation<any>();
  const transactions = useTransactionStore((state) => state.transactions);
  const {
    search,
    filter,
    sortBy,
    setSearch,
    setFilter,
    setSortBy,
    filteredTransactions,
  } = useTransactionFilters({ transactions });

  const handleEdit = useCallback(
    (transaction: (typeof transactions)[number]) => {
      navigation.navigate("EditTransaction", { transaction });
    },
    [navigation],
  );

  const handleAdd = useCallback(() => {
    navigation.navigate("AddTransaction");
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        padding: SPACING.huge,
        backgroundColor: COLORS.background,
      }}
    >
      <TextInput
        placeholder="Search transaction..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#9ca3af"
        style={{
          backgroundColor: COLORS.surface,
          padding: SPACING.xl,
          borderRadius: RADIUS.lg,
          borderColor: COLORS.border,
          borderWidth: 1,
          marginBottom: SPACING.xxxl,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          gap: SPACING.md,
          marginBottom: SPACING.xxxl,
        }}
      >
        {TRANSACTION_FILTERS.map((type) => {
          const selected = filter === type;

          return (
            <Pressable
              key={type}
              onPress={() => setFilter(type)}
              style={{
                flex: 1,
                paddingVertical: SPACING.lg,
                borderRadius: RADIUS.md,
                alignItems: "center",
                borderWidth: 1,
                borderColor: selected ? COLORS.primary : COLORS.border,
                backgroundColor: selected ? COLORS.primary : COLORS.surface,
              }}
            >
              <Text
                style={{
                  color: selected ? COLORS.white : "#374151",
                  fontWeight: "600",
                }}
              >
                {type === "all" ? "All" : getTransactionTypeLabel(type)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: SPACING.sm,
          marginBottom: SPACING.xxxl,
        }}
      >
        {TRANSACTION_SORT_OPTIONS.map((item) => {
          const selected = sortBy === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => setSortBy(item.value)}
              style={{
                paddingHorizontal: SPACING.xl,
                paddingVertical: SPACING.md,
                borderRadius: RADIUS.pill,
                backgroundColor: selected ? COLORS.primary : COLORS.surface,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            >
              <Text
                style={{
                  color: selected ? COLORS.white : "#374151",
                  fontWeight: "600",
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onEdit={() => handleEdit(item)} />
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 80, alignItems: "center" }}>
            <Text style={{ color: "#6b7280", fontSize: 15 }}>
              {search.trim() !== "" || filter !== "all"
                ? "No matching transaction"
                : "No transactions yet"}
            </Text>
          </View>
        }
      />

      <Pressable
        onPress={handleAdd}
        style={{
          position: "absolute",
          right: SPACING.huge,
          bottom: SPACING.huge,
          width: 60,
          height: 60,
          borderRadius: RADIUS.pill,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
          elevation: 6,
        }}
      >
        <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: "700" }}>
          +
        </Text>
      </Pressable>
    </View>
  );
}
