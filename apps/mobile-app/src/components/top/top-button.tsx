import { Pressable, type PressableProps } from "react-native";

import { AppText } from "@/components/ui/app-text";

type TopButtonProps = PressableProps & {
  variant?: "signup" | "login";
  title: string;
};

export function TopButton({
  variant = "signup",
  title,
  ...props
}: TopButtonProps) {
  const variantClass =
    variant === "login" ? "border border-border" : "bg-primary";
  const textClass =
    variant === "login"
      ? "font-semibold text-foreground"
      : "font-bold text-white";

  return (
    <Pressable
      className={`h-16 w-full items-center justify-center rounded-xl ${variantClass}`}
      {...props}
    >
      <AppText className={`text-lg ${textClass}`}>{title}</AppText>
    </Pressable>
  );
}
