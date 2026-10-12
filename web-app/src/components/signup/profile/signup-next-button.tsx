import { Button } from "../../ui/button";

// signupフローの各ステップ共通の「次へ」ボタン
export function SignupNextButton({
  onNext,
  disabled,
}: {
  onNext: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="pt-8">
      <Button type="button" disabled={disabled} onClick={onNext}>
        次へ
      </Button>
    </div>
  );
}
