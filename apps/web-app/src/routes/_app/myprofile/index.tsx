import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/myprofile/")({
  component: MyProfile,
});

function MyProfile() {
  return (
    <div className="px-8 pt-6">
      <h1 className="text-2xl font-bold">マイページ</h1>
    </div>
  );
}
