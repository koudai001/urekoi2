import * as commonLabel from "@urekoi/core/labels/common";
import { Link } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { ProfileCard, useSearchProfiles } from "@/entities/profile";
import { AppText } from "@/shared/ui/app-text";
import { ListEmpty } from "./list-empty";
import { ListFooter } from "./list-footer";

export function SearchPage() {
  const {
    profiles,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPending,
    error,
  } = useSearchProfiles();

  // 一番下に近づいたら、続きを読み込む
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  if (isPending) {
    return (
      <AppText className="py-16 text-center text-sm text-muted-foreground">
        {commonLabel.loading}
      </AppText>
    );
  }

  return (
    <FlatList
      data={profiles}
      keyExtractor={(profile) => String(profile.id)}
      renderItem={({ item }) => (
        <Link
          href={{ pathname: "/search/[id]", params: { id: item.id } }}
          asChild
        >
          <Pressable className="flex-1">
            <ProfileCard profile={item} />
          </Pressable>
        </Link>
      )}
      numColumns={2}
      columnWrapperClassName="gap-3"
      ListEmptyComponent={<ListEmpty errorMessage={error?.message} />}
      ListFooterComponent={
        <ListFooter
          isLoading={isFetchingNextPage}
          errorMessage={profiles.length > 0 ? error?.message : undefined}
        />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-3 px-3 py-4"
    />
  );
}
