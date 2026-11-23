// TanStack Query のキャッシュキー
export const queryKeys = {
  myprofile: ["myprofile"] as const,
  profile: (id: number) => ["profile", id] as const,
  search: ["search"] as const,
};
