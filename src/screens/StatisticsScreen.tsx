import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import PageHeader from "../components/PageHeader";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { useTransactionSummary } from "../hooks/useTransactionSummary";
import { formatCurrency } from "../utils/formatters";

export default function StatisticsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const {
    monthlyExpense,
    sortedCategories,
    topCategory,
    highestExpense,
    totalTransactions,
  } = useTransactionSummary();

  const pieData = sortedCategories.map(([category, amount], index) => ({
    name: category,
    amount,
    color: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"][
      index % 6
    ],
    legendFontColor: "#333",
    legendFontSize: 14,
  }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      contentContainerStyle={{
        padding: SPACING.huge,
        paddingBottom: SPACING.huge,
      }}
    >
      <PageHeader title="Statistics" />

      <SummaryCard
        title="This Month Expense"
        value={formatCurrency(monthlyExpense)}
      />

      <View
        style={{
          flexDirection: "row",
          gap: SPACING.md,
          marginBottom: SPACING.huge,
        }}
      >
        <InfoCard
          title="Top Category"
          value={topCategory ? topCategory[0] : "-"}
        />
        <InfoCard
          title="Highest Expense"
          value={highestExpense ? formatCurrency(highestExpense.amount) : "-"}
        />
      </View>

      <SummaryCard
        title="Total Transactions"
        value={String(totalTransactions)}
      />

      <Text
        style={{ fontSize: 18, fontWeight: "700", marginBottom: SPACING.md }}
      >
        Expense Distribution
      </Text>

      <View
        style={{
          backgroundColor: COLORS.surface,
          borderRadius: RADIUS.xxl,
          paddingVertical: SPACING.xxxl,
          marginBottom: SPACING.huge,
        }}
      >
        {pieData.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              color: COLORS.mutedText,
              paddingVertical: SPACING.massive,
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
            chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
          />
        )}
      </View>

      <Text
        style={{ fontSize: 18, fontWeight: "700", marginBottom: SPACING.md }}
      >
        Expense by Category
      </Text>

      {sortedCategories.map(([category, amount]) => (
        <View
          key={category}
          style={{
            backgroundColor: COLORS.surface,
            padding: SPACING.xxxl,
            borderRadius: RADIUS.xl,
            marginBottom: SPACING.sm,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600" }}>{category}</Text>
          <Text style={{ color: COLORS.danger, fontWeight: "700" }}>
            {formatCurrency(amount)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        backgroundColor: COLORS.surface,
        padding: SPACING.xxxl,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.huge,
      }}
    >
      <Text style={{ color: COLORS.mutedText }}>{title}</Text>
      <Text style={{ fontSize: 24, fontWeight: "700", marginTop: SPACING.xs }}>
        {value}
      </Text>
    </View>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: SPACING.xxxl,
        borderRadius: RADIUS.xl,
      }}
    >
      <Text style={{ color: COLORS.mutedText, fontSize: 12 }}>{title}</Text>
      <Text style={{ fontSize: 18, fontWeight: "700", marginTop: SPACING.xs }}>
        {value}
      </Text>
    </View>
  );
}
