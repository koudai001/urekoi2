import { ActivityIndicator, View } from "react-native";

// 画面全体の読み込み中に、中央でくるくるを出す
export function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator />
    </View>
  );
}
