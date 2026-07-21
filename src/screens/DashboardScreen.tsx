import { View, Text, FlatList } from "react-native";

import BalanceCard from "../components/BalanceCard";

import { useTransactionStore } from "../store/transactionStore";

import TransactionItem from "../components/TransactionItem";

export default function DashboardScreen() {
  const balance = useTransactionStore((state) => state.getBalance());
  const income = useTransactionStore((state) => state.getTotalIncome());
  const expense = useTransactionStore((state) => state.getTotalExpense());
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        SmartDough
      </Text>

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
      {transactions.slice(0, 3).map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
}
