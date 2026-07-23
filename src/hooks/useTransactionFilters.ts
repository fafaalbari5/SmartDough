import { useMemo, useState } from "react";
import { Transaction } from "../types/transaction";

export type TransactionFilter = "all" | "income" | "expense";
export type TransactionSort = "newest" | "oldest" | "highest" | "lowest";

interface UseTransactionFiltersParams {
  transactions: Transaction[];
}

export const useTransactionFilters = ({
  transactions,
}: UseTransactionFiltersParams) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [sortBy, setSortBy] = useState<TransactionSort>("newest");

  const filteredTransactions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        keyword === "" ||
        transaction.title.toLowerCase().includes(keyword) ||
        transaction.category.toLowerCase().includes(keyword) ||
        transaction.type.toLowerCase().includes(keyword) ||
        transaction.amount.toString().includes(keyword);

      const matchesFilter = filter === "all" || transaction.type === filter;

      return matchesSearch && matchesFilter;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "highest":
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case "lowest":
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return sorted;
  }, [filter, search, sortBy, transactions]);

  return {
    search,
    filter,
    sortBy,
    setSearch,
    setFilter,
    setSortBy,
    filteredTransactions,
  };
};
