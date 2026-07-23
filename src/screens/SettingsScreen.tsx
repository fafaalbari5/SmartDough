import { View, Text } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        padding: SPACING.huge,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Settings</Text>
      <Text style={{ color: COLORS.mutedText, marginTop: SPACING.sm }}>
        More options will be added soon.
      </Text>
    </View>
  );
}
