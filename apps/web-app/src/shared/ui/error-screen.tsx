import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import * as commonLabel from "@urekoi/core/labels/common";
import { Button } from "../../components/ui/Button";

// ルートの読み込みで失敗したときに出す画面
export function ErrorScreen({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message =
    error instanceof Error ? error.message : commonLabel.serverError;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-8">
      <p className="text-center text-sm">{message}</p>
      <Button
        type="button"
        onClick={() => {
          reset();
          router.invalidate();
        }}
      >
        {commonLabel.retry}
      </Button>
    </main>
  );
}
