type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline";
};

export function Button({ variant = "default", ...props }: ButtonProps) {
  const variantClass =
    variant === "outline"
      ? "border border-border bg-background"
      : "bg-primary text-white";

  return (
    <button
      className={`flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantClass}`}
      {...props}
    />
  );
}
