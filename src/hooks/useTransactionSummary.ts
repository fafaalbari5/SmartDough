import { useMemo } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { Transaction } from "../types/transaction";

export const useTransactionSummary = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const balance = useTransactionStore((state) => state.getBalance());
  const income = useTransactionStore((state) => state.getTotalIncome());
  const expense = useTransactionStore((state) => state.getTotalExpense());

  return useMemo(() => {
    const recentTransactions = [...transactions].slice(0, 3);
    const monthlyExpense = transactions.reduce((total, transaction) => {
      const date = new Date(transaction.createdAt);
      const isCurrentMonth =
        transaction.type === "expense" &&
        date.getMonth() === new Date().getMonth();

      return isCurrentMonth ? total + transaction.amount : total;
    }, 0);

    const expenseByCategory = transactions.reduce<Record<string, number>>(
      (acc, transaction) => {
        if (transaction.type !== "expense") {
          return acc;
        }

        acc[transaction.category] =
          (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      },
      {},
    );

    const sortedCategories = Object.entries(expenseByCategory).sort(
      (a, b) => b[1] - a[1],
    );
    const topCategory = sortedCategories[0];
    const highestExpense = [...transactions]
      .filter((transaction) => transaction.type === "expense")
      .sort((a, b) => b.amount - a.amount)[0];

    return {
      balance,
      income,
      expense,
      transactions,
      recentTransactions,
      monthlyExpense,
      expenseByCategory,
      sortedCategories,
      topCategory,
      highestExpense,
      totalTransactions: transactions.length,
    };
  }, [balance, expense, income, transactions]);
};
