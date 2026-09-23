import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { SignupFormValues } from "./use-signup";
import { Button } from "../ui/button";
import { BackHeader } from "../ui/back-header";

// 年齢・規約への同意を取る。
export function SignupConsent({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { watch, setValue } = useFormContext<SignupFormValues>();
  const isAdult = watch("isAdult");
  const agreeTerms = watch("agreeTerms");
  const canProceed = isAdult && agreeTerms;

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <p className="mb-8 text-center text-sm leading-relaxed text-muted-foreground">
          熟恋は、大人の女性と年下男性のためのマッチングサービスです。ご登録の前に、以下の内容をご確認ください。
        </p>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setValue("isAdult", !isAdult)}
            className="flex w-full cursor-pointer items-center gap-3 text-left"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 ${
                isAdult
                  ? "border-primary bg-primary text-white"
                  : "border-border"
              }`}
            >
              {isAdult && <Check className="h-4 w-4" strokeWidth={3} />}
            </span>
            <span className="text-base">
              女性は35歳以上、男性は35歳未満限定です
            </span>
          </button>

          <button
            type="button"
            onClick={() => setValue("agreeTerms", !agreeTerms)}
            className="flex w-full cursor-pointer items-center gap-3 text-left"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 ${
                agreeTerms
                  ? "border-primary bg-primary text-white"
                  : "border-border"
              }`}
            >
              {agreeTerms && <Check className="h-4 w-4" strokeWidth={3} />}
            </span>
            <span className="text-base">
              すべての規約<span className="text-primary">*</span>に同意します
            </span>
          </button>
        </div>

        <p className="mt-5 text-sm font-medium text-primary">
          <span>*</span>利用規約・プライバシーポリシーへの同意が必要です
        </p>

        <div className="mt-8">
          <Button type="button" disabled={!canProceed} onClick={onNext}>
            内容に同意して進む
          </Button>
        </div>
      </div>
    </>
  );
}
