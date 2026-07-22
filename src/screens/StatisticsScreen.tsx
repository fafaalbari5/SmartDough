import { View, Text, Dimensions, ScrollView } from "react-native";
import { useTransactionStore } from "../store/transactionStore";
import { PieChart } from "react-native-chart-kit";
import PageHeader from "../components/PageHeader";

export default function StatisticsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const transactions = useTransactionStore((state) => state.transactions);
  const income = useTransactionStore((state) => state.getTotalIncome());
  const expense = useTransactionStore((state) => state.getTotalExpense());
  const balance = useTransactionStore((state) => state.getBalance());
  const currentMonth = new Date().getMonth();

  const monthlyExpense = transactions
    .filter((transaction) => {
      const date = new Date(transaction.createdAt);

      return transaction.type === "expense" && date.getMonth() === currentMonth;
    })
    .reduce((total, item) => total + item.amount, 0);

  const expenseByCategory = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (acc, transaction) => {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + transaction.amount;

        return acc;
      },
      {} as Record<string, number>,
    );

  const sortedCategories = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1],
  );
  const totalTransactions = transactions.length;

  const highestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  const topCategory = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const pieData = Object.entries(expenseByCategory).map(
    ([category, amount], index) => ({
      name: category,
      amount,
      color: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"][
        index % 6
      ],

      legendFontColor: "#333",
      legendFontSize: 14,
    }),
  );

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
      <PageHeader title="Statistics" />
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#64748b",
          }}
        >
          This Month Expense
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginTop: 6,
          }}
        >
          Rp {monthlyExpense.toLocaleString("id-ID")}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: "#64748b",
              fontSize: 12,
            }}
          >
            Top Category
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginTop: 6,
            }}
          >
            {topCategory ? topCategory[0] : "-"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: "#64748b",
              fontSize: 12,
            }}
          >
            Highest Expense
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginTop: 6,
            }}
          >
            {highestExpense
              ? `Rp ${highestExpense.amount.toLocaleString("id-ID")}`
              : "-"}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#64748b",
            fontSize: 12,
          }}
        >
          Total Transactions
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginTop: 6,
          }}
        >
          {totalTransactions}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Expense Distribution
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          paddingVertical: 20,
          marginBottom: 20,
        }}
      >
        {pieData.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              color: "#64748b",
              paddingVertical: 30,
            }}
          >
            No expense data available
          </Text>
        ) : (
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={150}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
            chartConfig={{
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Expense by Category
      </Text>

      {sortedCategories.map(([category, amount]) => (
        <View
          key={category}
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 16,
            marginBottom: 10,

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {category}
          </Text>

          <Text
            style={{
              color: "#dc2626",
              fontWeight: "700",
            }}
          >
            Rp {amount.toLocaleString("id-ID")}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
