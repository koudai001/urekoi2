import { useMutation } from "@tanstack/react-query";
import type { ProfileFormValues } from "@urekoi/core/domain/profile";
import * as authLabel from "@urekoi/core/labels/auth";
import * as commonLabel from "@urekoi/core/labels/common";
import { apiClient } from "../../../shared/api/api-client";

// フォームの値を API の形に変えて、プロフィールを作成する
export function useCreateProfile() {
  return useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const { gender, prefectureCode } = values;
      if (!gender || !prefectureCode) {
        throw new Error("gender and prefectureCode are required");
      }

      const res = await apiClient.api.myprofile.$post({
        json: {
          nickname: values.nickname,
          gender,
          birthdate: `${values.birthYear}-${values.birthMonth.padStart(2, "0")}-${values.birthDay.padStart(2, "0")}`,
          prefectureCode,
        },
      });
      if (!res.ok) {
        switch (res.status) {
          case 400:
            throw new Error(authLabel.signup.profile.confirm.invalid);
          case 500:
            throw new Error(commonLabel.serverError);
          default: {
            // 想定していないステータスが増えたら、型エラーで気づけるようにする
            const _exhaustiveCheck: never = res;
            throw new Error(`Unexpected status code: ${_exhaustiveCheck}`);
          }
        }
      }
    },
  });
}
