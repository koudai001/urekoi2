import { getPrefectureName } from "@urekoi/core";
import type { ProfileFormValues } from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import { useFormContext, useFormState } from "react-hook-form";
import { BackHeader } from "../../ui/BackHeader";
import { Button } from "../../ui/Button";

const label = authLabel.signup.profile.confirm;
const genderLabel = authLabel.signup.profile.gender;

// signupフローの最終ステップ。入力済みのプロフィール項目を確認し、始めるとプロフィールを作成する
export function SignupConfirm({
  onBack,
  onNext,
  isSubmitting,
  apiErrorMessage,
}: {
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  apiErrorMessage: string | null;
}) {
  const { watch, control } = useFormContext<ProfileFormValues>();
  const { errors } = useFormState({ control });
  const validationErrorMessages = Object.values(errors).map(
    (error) => error?.message,
  );
  const nickname = watch("nickname");
  const gender = watch("gender");
  const birthYear = watch("birthYear");
  const birthMonth = watch("birthMonth");
  const birthDay = watch("birthDay");
  const prefectureCode = watch("prefectureCode");

  const prefectureName = getPrefectureName(prefectureCode);

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <h1 className="text-2xl font-bold">{label.title}</h1>

        <dl className="mt-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">{label.nickname}</dt>
            <dd className="text-base font-bold">{nickname}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">{label.gender}</dt>
            <dd className="text-base font-bold">
              {gender ? genderLabel[gender] : ""}
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">{label.birthday}</dt>
            <dd className="text-base font-bold">
              {label.birthdayValue(birthYear, birthMonth, birthDay)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-sm text-muted-foreground">
              {label.prefecture}
            </dt>
            <dd className="text-base font-bold">{prefectureName}</dd>
          </div>
        </dl>

        {validationErrorMessages.map((message) => (
          <p key={message} className="mt-4 text-sm font-medium text-error">
            {message}
          </p>
        ))}
        {apiErrorMessage && (
          <p className="mt-4 text-sm font-medium text-error">
            {apiErrorMessage}
          </p>
        )}

        <div className="mt-8">
          <Button type="button" disabled={isSubmitting} onClick={onNext}>
            {isSubmitting ? label.submitting : label.submit}
          </Button>
        </div>
      </div>
    </>
  );
}
