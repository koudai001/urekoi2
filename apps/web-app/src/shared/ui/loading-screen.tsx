import { Spinner } from "./spinner";

// 画面全体の読み込み中に、中央でくるくるを出す
export function LoadingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}
