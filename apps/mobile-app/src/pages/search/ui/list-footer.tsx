import * as commonLabel from "@urekoi/core/labels/common";
import { AppText } from "@/shared/ui/app-text";

// 一覧の一番下：続きの読み込み中か、続きの読み込みエラー
export function ListFooter({
  isLoading,
  errorMessage,
}: {
  isLoading: boolean;
  errorMessage?: string;
}) {
  if (isLoading) {
    return (
      <AppText className="py-6 text-center text-sm text-muted-foreground">
        {commonLabel.loading}
      </AppText>
    );
  }
  if (errorMessage) {
    return (
      <AppText className="py-6 text-center text-sm text-error">
        {errorMessage}
      </AppText>
    );
  }
  return null;
}
