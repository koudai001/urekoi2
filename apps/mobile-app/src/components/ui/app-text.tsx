import { Text, type TextProps } from "react-native";

const typeClass = {
  small: "text-sm",
  default: "text-base",
  title: "text-2xl font-bold",
};

export type AppTextProps = TextProps & {
  type?: keyof typeof typeClass;
};

export function AppText({
  type = "default",
  className,
  ...props
}: AppTextProps) {
  return (
    <Text className={`${typeClass[type]} ${className ?? ""}`} {...props} />
  );
}
