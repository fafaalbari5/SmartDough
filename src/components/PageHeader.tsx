import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={{ marginBottom: SPACING.huge }}>
        <Text style={TYPOGRAPHY.title}>{title}</Text>

        {subtitle ? (
          <Text style={{ color: COLORS.mutedText, marginTop: SPACING.xs }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
