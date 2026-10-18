import { Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { BackHeader } from "../ui/BackHeader";

// ログイン方法選択画面
export function LoginLanding({ onSelectEmail }: { onSelectEmail: () => void }) {
  return (
    <main>
      <BackHeader href="/" title="熟恋にログイン" />

      <div className="flex flex-col gap-3 px-8 pt-6">
        <Button type="button" onClick={onSelectEmail} variant="outline">
          <Mail className="size-5" />
          メールアドレスでログイン
        </Button>
        {/* TODO: Googleログインボタンを後で追加 */}
      </div>
    </main>
  );
}
