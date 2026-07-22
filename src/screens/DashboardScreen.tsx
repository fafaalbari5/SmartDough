import { View, Text, FlatList, ScrollView } from "react-native";

import BalanceCard from "../components/BalanceCard";

import { useTransactionStore } from "../store/transactionStore";

import TransactionItem from "../components/TransactionItem";
import PageHeader from "../components/PageHeader";

export default function DashboardScreen() {
  const balance = useTransactionStore((state) => state.getBalance());
  const income = useTransactionStore((state) => state.getTotalIncome());
  const expense = useTransactionStore((state) => state.getTotalExpense());
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f8fafc",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 20,
      }}
    >
      <PageHeader title="SmartDough" subtitle="Personal Finance Tracker" />

      <BalanceCard balance={balance} />

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#dcfce7",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text>Income</Text>

          <Text
            style={{
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Rp {income.toLocaleString("id-ID")}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#fee2e2",
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text>Expense</Text>

          <Text
            style={{
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Rp {expense.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        Recent Transactions
      </Text>
      {transactions.length === 0 ? (
        <Text
          style={{
            color: "#64748b",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No transactions yet
        </Text>
      ) : (
        transactions
          .slice(0, 3)
          .map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
      )}
    </ScrollView>
  );
}
