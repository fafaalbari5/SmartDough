import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <SafeAreaView edges={["top"]}>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              color: "#64748b",
              marginTop: 4,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
