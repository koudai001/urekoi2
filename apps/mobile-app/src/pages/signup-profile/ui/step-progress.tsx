import { View } from "react-native";
import { AppText } from "@/shared/ui/app-text";
import { Progress } from "@/shared/ui/progress";

const TOTAL_STEPS = 4;

export function StepProgress({ step }: { step: number }) {
  return (
    <View className="flex-row items-center gap-3">
      <Progress value={(step / TOTAL_STEPS) * 100} className="flex-1" />
      <AppText className="text-sm text-muted-foreground">
        {step}/{TOTAL_STEPS}
      </AppText>
    </View>
  );
}
