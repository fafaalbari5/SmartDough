import { useState, useEffect } from "react";

import { View, TextInput, Button, Pressable, Text } from "react-native";
import { useTransactionStore } from "../store/transactionStore";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

export default function AddTransactionScreen() {
  const navigation = useNavigation<any>();

  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("Food");

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

    addTransaction({
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category: category,
      type: type,
      createdAt: new Date().toISOString(),
    });

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

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
