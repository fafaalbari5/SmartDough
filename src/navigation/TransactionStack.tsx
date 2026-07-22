import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TransactionsScreen from "../screens/TransactionsScreen";
import AddTransactionScreen from "../screens/AddTransactionScreen";

const Stack = createNativeStackNavigator();

export default function TransactionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsScreen}
        options={{
          title: "Transactions",
        }}
      />

      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          title: "Add Transaction",
        }}
      />

      <Stack.Screen
        name="EditTransaction"
        component={AddTransactionScreen}
        options={{
          title: "Edit Transaction",
        }}
      />
    </Stack.Navigator>
  );
}
