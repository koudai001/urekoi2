import { createAuthClient } from "better-auth/client";

// 起動しているHonoサーバー（8787ポート）を向いたOAuthクライアントを作成
const authClient = createAuthClient({
  baseURL: "http://localhost:8787",
  fetchOptions: {
    headers: {
      Origin: "http://localhost:8787",
    },
  },
});

async function runLoginTest() {
  console.log("ログイン（Login）リクエストを送信中...");

  const { data, error } = await authClient.signIn.email({
    email: "test_user_01@example.com", // テスト用のメールアドレス
    password: "Password123!", // テスト用のパスワード
  });

  // 3. 結果の確認
  if (error) {
    console.error("❌ ログインに失敗しました:", error.message);
    console.error("詳細:", error);
  } else {
    console.log("✅ ログインに成功しました！");
    console.log("レスポンスデータ:", data);
  }
}

// スクリプトを実行
runLoginTest();
