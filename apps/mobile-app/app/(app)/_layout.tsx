import { Tabs } from "expo-router";
import { Heart, MessageCircle, Search, UserRound } from "lucide-react-native";

// 探す・いいね・メッセージ・マイページ共通のレイアウト。下部にタブを表示する
export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="search"
        options={{
          title: "探す",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: "いいね",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "メッセージ",
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myprofile"
        options={{
          title: "マイページ",
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
