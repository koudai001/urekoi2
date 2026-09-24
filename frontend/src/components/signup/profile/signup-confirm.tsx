import { useFormContext } from "react-hook-form";
import { PREFECTURES } from "urekoi2-shared";
import { BackHeader } from "../../ui/back-header";
import { Button } from "../../ui/button";
import type { ProfileFormValues } from "./profile-schema";

const GENDER_LABEL: Record<string, string> = {
  male: "男性",
  female: "女性",
};

// signupフローの最終ステップ。入力済みのプロフィール項目を確認し、始めるとプロフィールを作成する
export function SignupConfirm({
  onBack,
  onNext,
  isSubmitting,
}: {
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}) {
  const { watch } = useFormContext<ProfileFormValues>();
  const nickname = watch("nickname");
  const gender = watch("gender");
  const birthYear = watch("birthYear");
  const birthMonth = watch("birthMonth");
  const birthDay = watch("birthDay");
  const prefectureCode = watch("prefectureCode");

  const prefectureName = PREFECTURES.find(
    (p) => p.code === prefectureCode,
  )?.name;

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">入力内容を確認してください</h1>

        <dl className="mt-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">表示名</dt>
            <dd className="text-base font-bold">{nickname}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">性別</dt>
            <dd className="text-base font-bold">
              {gender ? GENDER_LABEL[gender] : ""}
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">生年月日</dt>
            <dd className="text-base font-bold">
              {birthYear}年{birthMonth}月{birthDay}日
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">都道府県</dt>
            <dd className="text-base font-bold">{prefectureName}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <Button type="button" disabled={isSubmitting} onClick={onNext}>
            {isSubmitting ? "作成中..." : "始める"}
          </Button>
        </div>
      </div>
    </>
  );
}
