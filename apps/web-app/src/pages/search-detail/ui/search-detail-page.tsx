import { Link } from "@tanstack/react-router";
import { getPrefectureName } from "@urekoi/core";
import { calculateAge } from "@urekoi/core/domain/profile";
import * as profileLabel from "@urekoi/core/labels/profile";
import { ChevronLeft } from "lucide-react";
import { getDummyImage, useProfile } from "@/entities/profile";
import { Button } from "@/shared/ui/button";
import { LoadingScreen } from "@/shared/ui/loading-screen";

const fields = profileLabel.fields;

// 項目名と値を縦に並べる。未設定でも同じ高さで出す
function DetailItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="min-w-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-medium">
        {value || profileLabel.notSet}
      </p>
    </div>
  );
}

// 検索から開くお相手の詳細
export function SearchDetailPage({ id }: { id: number }) {
  const { data: profile, error, isPending } = useProfile(id);

  if (isPending) return <LoadingScreen />;

  // エラーはルートの ErrorScreen に任せる
  if (error) throw error;

  const [year, month, day] = profile.birthdate.split("-").map(Number);
  const age = calculateAge(year, month, day);
  const prefectureName = getPrefectureName(profile.prefectureCode);

  return (
    <main className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/search" aria-label="一覧へ戻る">
            <ChevronLeft className="size-6" />
          </Link>
        </Button>
        <p className="truncate text-lg font-bold">{profile.nickname}</p>
      </header>

      {/* 写真から詳細情報までを、ヘッダーの下でスクロールする */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <img
          src={getDummyImage(profile.id)}
          alt={`${profile.nickname}さんの写真`}
          className="aspect-square w-full object-cover"
        />
        <div className="px-5 pt-6 pb-6">
          <h1 className="text-3xl font-extrabold">{profile.nickname}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {age}歳 ・ {prefectureName}
          </p>

          <section className="mt-8">
            <h2 className="border-b pb-2 text-xl font-bold">
              {profileLabel.bio}
            </h2>
            <p className="mt-4 whitespace-pre-wrap leading-7">
              {profile.bio || profileLabel.notSet}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="border-b pb-2 text-xl font-bold">
              {profileLabel.details}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
              <DetailItem
                label={fields.occupation}
                value={profile.occupation}
              />
              <DetailItem label={fields.hometown} value={profile.hometown} />
              <DetailItem label={fields.bloodType} value={profile.bloodType} />
              <DetailItem label={fields.mbti} value={profile.mbti} />
              <DetailItem label={fields.bodyType} value={profile.bodyType} />
              <DetailItem label={fields.education} value={profile.education} />
              <DetailItem label={fields.holiday} value={profile.holiday} />
              <DetailItem label={fields.alcohol} value={profile.alcohol} />
              <DetailItem label={fields.smoking} value={profile.smoking} />
              <DetailItem
                label={fields.heightCm}
                value={profile.heightCm ? `${profile.heightCm}cm` : null}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
