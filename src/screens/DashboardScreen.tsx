import { View, Text, ScrollView } from "react-native";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";
import PageHeader from "../components/PageHeader";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { useTransactionSummary } from "../hooks/useTransactionSummary";
import { formatCurrency } from "../utils/formatters";

export default function DashboardScreen() {
  const { balance, income, expense, recentTransactions } =
    useTransactionSummary();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      contentContainerStyle={{
        padding: SPACING.huge,
        paddingBottom: SPACING.huge,
      }}
    >
      <PageHeader title="SmartDough" subtitle="Personal Finance Tracker" />
      <BalanceCard balance={balance} />

      <View
        style={{
          flexDirection: "row",
          marginTop: SPACING.huge,
          gap: SPACING.md,
        }}
      >
        <OverviewCard
          label="Income"
          value={formatCurrency(income)}
          accent={COLORS.successSoft}
        />
        <OverviewCard
          label="Expense"
          value={formatCurrency(expense)}
          accent={COLORS.dangerSoft}
        />
      </View>

      <Text
        style={{
          ...TYPOGRAPHY.sectionTitle,
          marginTop: SPACING.massive,
          marginBottom: SPACING.xxxl,
        }}
      >
        Recent Transactions
      </Text>

      {recentTransactions.length === 0 ? (
        <Text
          style={{
            color: COLORS.mutedText,
            textAlign: "center",
            marginTop: SPACING.huge,
          }}
        >
          No transactions yet
        </Text>
      ) : (
        recentTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))
      )}
    </ScrollView>
  );
}

interface OverviewCardProps {
  label: string;
  value: string;
  accent: string;
}

function OverviewCard({ label, value, accent }: OverviewCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: accent,
        padding: SPACING.xxxl,
        borderRadius: RADIUS.xl,
      }}
    >
      <Text>{label}</Text>
      <Text style={{ fontWeight: "bold", marginTop: SPACING.xs }}>{value}</Text>
    </View>
  );
}
