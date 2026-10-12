import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/search/")({
  component: Search,
});

function Search() {
  return (
    <div className="px-8 pt-6">
      <h1 className="text-2xl font-bold">探す</h1>
    </div>
  );
}
