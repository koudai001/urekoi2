import { createFileRoute, notFound } from "@tanstack/react-router";
import { SearchDetailPage } from "../../../pages/search-detail";

// 検索から開くお相手の詳細（/search/123）
export const Route = createFileRoute("/_app/search/$id")({
  // URL の id を数値にする。正の整数でなければ 404
  params: {
    parse: ({ id }) => {
      const num = Number(id);
      if (!Number.isSafeInteger(num) || num <= 0) throw notFound();
      return { id: num };
    },
    stringify: ({ id }) => ({ id: String(id) }),
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <SearchDetailPage id={id} />;
}
