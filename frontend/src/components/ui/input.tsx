import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.ComponentProps<"input">;

export function Input({ type, ...props }: InputProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex h-14 items-center gap-3 border-b border-border focus-within:border-primary">
      <input
        type={isPassword ? (visible ? "text" : "password") : type}
        className="h-full w-full flex-1 border-0 bg-transparent px-0 text-lg outline-none placeholder:text-muted-foreground"
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "パスワードを隠す" : "パスワードを表示"}
          className="cursor-pointer"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}
