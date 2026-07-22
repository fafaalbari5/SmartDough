import { useState, useEffect } from "react";

import { View, TextInput, Button, Pressable, Text } from "react-native";
import { useTransactionStore } from "../store/transactionStore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTransactionScreen() {
  const route = useRoute<any>();
  const transaction = route.params?.transaction;
  const isEditMode = !!transaction;
  const navigation = useNavigation<any>();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [title, setTitle] = useState(transaction?.title ?? "");
  const [amount, setAmount] = useState(transaction?.amount?.toString() ?? "");
  const [type, setType] = useState<"income" | "expense">(
    transaction?.type ?? "expense",
  );
  const [category, setCategory] = useState(transaction?.category ?? "Food");
  const [date, setDate] = useState(
    transaction ? new Date(transaction.createdAt) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  useEffect(() => {
    if (type === "expense") {
      setCategory("Food");
    } else {
      setCategory("Salary");
    }
  }, [type]);

  const handleSave = () => {
    if (!title || !amount) {
      return;
    }

    const transactionData = {
      id: transaction?.id ?? Date.now().toString(),

      title,

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

  const categories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />
      <Text
        style={{
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        Type
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() => setType("income")}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            backgroundColor: type === "income" ? "#22c55e" : "#e5e7eb",
          }}
        >
          <Text>Income</Text>
        </Pressable>

        <Pressable
          onPress={() => setType("expense")}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 10,
            backgroundColor: type === "expense" ? "#ef4444" : "#e5e7eb",
          }}
        >
          <Text>Expense</Text>
        </Pressable>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Category
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 20,
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
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Date
      </Text>

      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Text>{date.toLocaleDateString("id-ID")}</Text>
      </Pressable>
      {showDatePicker && (
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
      )}

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
