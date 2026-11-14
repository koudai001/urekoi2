import { Pressable, type PressableProps } from "react-native";
import { AppText } from "@/components/ui/app-text";

type SignupButtonProps = PressableProps & {
  title: string;
};

export function SignupButton({ title, ...props }: SignupButtonProps) {
  return (
    <Pressable
      className="h-12 w-full items-center justify-center rounded-lg border border-border bg-white"
      {...props}
    >
      <AppText className="font-bold text-foreground">{title}</AppText>
    </Pressable>
  );
}
