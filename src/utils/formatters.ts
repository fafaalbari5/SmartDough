export const formatCurrency = (value: number): string =>
  `Rp ${value.toLocaleString("id-ID")}`;

export const formatDate = (value: string | Date): string =>
  new Date(value).toLocaleDateString("id-ID");

export const getTransactionTypeLabel = (type: "income" | "expense"): string => {
  if (type === "income") {
    return "Income";
  }

  return "Expense";
};
