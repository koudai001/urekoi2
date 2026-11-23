import { useLocalSearchParams } from "expo-router";
import { SearchDetailPage } from "@/pages/search-detail";

// 検索から開くお相手の詳細（/search/14）
export default function SearchDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SearchDetailPage id={Number(id)} />;
}
