import * as searchLabel from "@urekoi/core/labels/search";
import { AppText } from "@/shared/ui/app-text";

// 一覧が空のとき：エラーがあればエラー文言、なければ「お相手がいません」
export function ListEmpty({ errorMessage }: { errorMessage?: string }) {
  return (
    <AppText className="py-16 text-center text-sm text-muted-foreground">
      {errorMessage ?? searchLabel.empty}
    </AppText>
  );
}
