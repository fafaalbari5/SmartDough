import { useEffect, useMemo, useState } from "react";
import { View, TextInput, Button, Pressable, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import { useTransactionStore } from "../store/transactionStore";
import { Transaction, TransactionType } from "../types/transaction";
import { formatDate } from "../utils/formatters";

interface RouteParams {
  transaction?: Transaction;
}

export default function AddTransactionScreen() {
  const route = useRoute<any>();
  const params = route.params as RouteParams | undefined;
  const transaction = params?.transaction;
  const isEditMode = Boolean(transaction);
  const navigation = useNavigation<any>();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  const [title, setTitle] = useState(transaction?.title ?? "");
  const [amount, setAmount] = useState(transaction?.amount?.toString() ?? "");
  const [type, setType] = useState<TransactionType>(
    transaction?.type ?? "expense",
  );
  const [category, setCategory] = useState(transaction?.category ?? "Food");
  const [date, setDate] = useState(
    transaction ? new Date(transaction.createdAt) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const defaultCategory = type === "expense" ? "Food" : "Salary";
    setCategory((currentCategory) =>
      currentCategory === "Food" || currentCategory === "Salary"
        ? defaultCategory
        : currentCategory,
    );
  }, [type]);

  const categories = useMemo(
    () => (type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES),
    [type],
  );

  const handleSave = () => {
    if (!title.trim() || !amount.trim()) {
      return;
    }

    const transactionData: Transaction = {
      id: transaction?.id ?? Date.now().toString(),
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      createdAt: date.toISOString(),
    };

    if (isEditMode) {
      updateTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }

    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: SPACING.huge,
        backgroundColor: COLORS.background,
      }}
    >
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          padding: SPACING.lg,
          borderRadius: RADIUS.sm,
          marginBottom: SPACING.xxxl,
        }}
      />

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          padding: SPACING.lg,
          borderRadius: RADIUS.sm,
          marginBottom: SPACING.xxxl,
        }}
      />

      <Text style={{ marginBottom: SPACING.md, fontWeight: "bold" }}>Type</Text>

      <View
        style={{
          flexDirection: "row",
          gap: SPACING.md,
          marginBottom: SPACING.huge,
        }}
      >
        <Pressable
          onPress={() => setType("income")}
          style={{
            flex: 1,
            padding: SPACING.lg,
            borderRadius: RADIUS.sm,
            backgroundColor: type === "income" ? COLORS.income : COLORS.border,
          }}
        >
          <Text>Income</Text>
        </Pressable>

        <Pressable
          onPress={() => setType("expense")}
          style={{
            flex: 1,
            padding: SPACING.lg,
            borderRadius: RADIUS.sm,
            backgroundColor:
              type === "expense" ? COLORS.expense : COLORS.border,
          }}
        >
          <Text>Expense</Text>
        </Pressable>
      </View>

      <Text style={{ fontWeight: "bold", marginBottom: SPACING.md }}>
        Category
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: RADIUS.sm,
          marginBottom: SPACING.huge,
        }}
      >
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          {categories.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <Text style={{ fontWeight: "bold", marginBottom: SPACING.md }}>Date</Text>

      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: RADIUS.sm,
          padding: SPACING.xl,
          marginBottom: SPACING.huge,
        }}
      >
        <Text>{formatDate(date)}</Text>
      </Pressable>

      {showDatePicker ? (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date("2000-01-01")}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      ) : null}

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
