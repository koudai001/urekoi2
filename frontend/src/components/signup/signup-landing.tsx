import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { BackHeader } from "../ui/back-header";

// 新規登録方法選択画面
export function SignupLanding({
  onSelectEmail,
}: {
  onSelectEmail: () => void;
}) {
  return (
    <main>
      <BackHeader href="/" title="熟恋に新規登録" />

      <div className="flex flex-col gap-3 px-8 pt-6">
        <Button type="button" onClick={onSelectEmail} variant="outline">
          <Mail className="size-5" />
          メールアドレスで新規登録
        </Button>
        {/* TODO: Google新規登録ボタンを後で追加 */}
      </div>
    </main>
  );
}
