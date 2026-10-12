import { useFormContext } from "react-hook-form";
import { BackHeader } from "../../ui/back-header";
import { SignupProgressBar } from "./signup-progress-bar";
import { SignupNextButton } from "./signup-next-button";
import type { ProfileFormValues } from "./profile-schema";

const options = [
  { value: "male", label: "男性", image: "/profiles/men-1.webp" },
  { value: "female", label: "女性", image: "/profiles/woman-1.webp" },
] as const;

// signupフローのステップ2。性別選択
export function SignupGender({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { watch, setValue } = useFormContext<ProfileFormValues>();
  const gender = watch("gender");

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="px-8 pt-6">
        <SignupProgressBar currentStep={1} totalSteps={4} />

        <h1 className="mt-8 text-2xl font-bold">あなたの性別は？</h1>

        <div className="mt-8 flex justify-center gap-4">
          {options.map((option) => {
            const selected = gender === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue("gender", option.value)}
                aria-pressed={selected}
                className={`flex cursor-pointer flex-col items-center gap-3 rounded-full p-4 transition-colors ${
                  selected ? "bg-primary/10 ring-2 ring-primary" : ""
                }`}
              >
                <span className="h-24 w-24 overflow-hidden rounded-full border-2 border-border">
                  <img
                    src={option.image}
                    alt={option.label}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-lg font-bold">{option.label}</span>
              </button>
            );
          })}
        </div>

        <SignupNextButton onNext={onNext} disabled={!gender} />
      </div>
    </>
  );
}
