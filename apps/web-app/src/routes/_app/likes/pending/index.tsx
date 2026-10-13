import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/likes/pending/")({
  component: LikesPending,
});

function LikesPending() {
  return (
    <div className="px-8 pt-6">
      <h1 className="text-2xl font-bold">いいね</h1>
    </div>
  );
}
