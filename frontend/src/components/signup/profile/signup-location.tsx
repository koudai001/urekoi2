import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PREFECTURES } from "urekoi2-shared";
import { BackHeader } from "../../ui/back-header";
import { SignupProgressBar } from "./signup-progress-bar";
import { SignupNextButton } from "./signup-next-button";
import type { ProfileFormValues } from "./profile-schema";

// 居住都道府県の選択
export function SignupLocation({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { watch, setValue } = useFormContext<ProfileFormValues>();
  const prefectureCode = watch("prefectureCode");

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <SignupProgressBar currentStep={3} totalSteps={4} />

        <h1 className="mt-8 text-2xl font-bold">どちらにお住まいですか？</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          地域が近いお相手が探しやすくなります
        </p>

        <div className="mt-6 max-h-[260px] overflow-y-auto">
          {PREFECTURES.map((pref) => {
            const selected = prefectureCode === pref.code;
            return (
              <button
                key={pref.code}
                type="button"
                onClick={() => setValue("prefectureCode", pref.code)}
                aria-pressed={selected}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1 py-2.5 text-left"
              >
                <span className="flex w-4 shrink-0 items-center justify-center">
                  {selected && <Check className="h-4 w-4 text-primary" />}
                </span>
                <span
                  className={`text-[17px] ${
                    selected ? "font-bold" : "text-muted-foreground"
                  }`}
                >
                  {pref.name}
                </span>
              </button>
            );
          })}
        </div>

        <SignupNextButton onNext={onNext} disabled={!prefectureCode} />
      </div>
    </>
  );
}
