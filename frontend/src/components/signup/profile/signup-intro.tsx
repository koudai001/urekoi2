import { Timer } from "lucide-react";
import { SignupProgressBar } from "./signup-progress-bar";
import { SignupNextButton } from "./signup-next-button";

// オンボーディング導入(プロフィール入力の案内)
export function SignupIntro({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="h-16 shrink-0" />
      <div className="px-8 pt-6">
        <SignupProgressBar currentStep={0} totalSteps={4} />

        <h1 className="mt-8 text-2xl font-bold">
          あなたについて教えてください
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="size-4" aria-hidden="true" />
          約30秒で完了します
        </p>

        <SignupNextButton onNext={onNext} />

        <img
          src="/profiles/woman-3.webp"
          alt="登録イメージ"
          width={208}
          height={240}
          className="mx-auto mt-8 h-60 w-52 rounded-xl object-cover"
        />
      </div>
    </>
  );
}
