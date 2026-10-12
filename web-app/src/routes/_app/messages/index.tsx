import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/messages/")({
  component: Messages,
});

function Messages() {
  return (
    <div className="px-8 pt-6">
      <h1 className="text-2xl font-bold">メッセージ</h1>
    </div>
  );
}
