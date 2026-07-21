import { create } from "zustand";
import { Transaction } from "../types/transaction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface TransactionState {
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;

  removeTransaction: (id: string) => void;

  getBalance: () => number;

  getTotalIncome: () => number;

  getTotalExpense: () => number;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [
        {
          id: "1",
          title: "Gaji",
          amount: 5000000,
          category: "Salary",
          type: "income",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Makan Siang",
          amount: 50000,
          category: "Food",
          type: "expense",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Transport",
          amount: 20000,
          category: "Transport",
          type: "expense",
          createdAt: new Date().toISOString(),
        },
      ],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((item) => item.id !== id),
        })),

      getBalance: () => {
        return get().transactions.reduce((total, item) => {
          return item.type === "income"
            ? total + item.amount
            : total - item.amount;
        }, 0);
      },

      getTotalIncome: () => {
        return get()
          .transactions.filter((item) => item.type === "income")
          .reduce((total, item) => total + item.amount, 0);
      },

      getTotalExpense: () => {
        return get()
          .transactions.filter((item) => item.type === "expense")
          .reduce((total, item) => total + item.amount, 0);
      },
    }),
    {
      name: "smartdough-storage",

      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
