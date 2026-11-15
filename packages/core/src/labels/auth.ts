export const email = {
  placeholder: "例）urekoi@example.com",
  invalid: "メールアドレスの形式が正しくありません",
  submit: "コードを送る",
};

export const otp = {
  title: "認証コードを入力してください",
  sentTo: (email: string) =>
    `${email} にお送りした6桁のコードを入力してください。`,
  placeholder: "6桁のコード",
  invalid: "6桁の数字を入力してください",
};

export const signup = {
  withEmail: "メールアドレスで新規登録",
  consent: {
    lead: "熟恋は、大人の女性と年下男性のためのマッチングサービスです。ご登録の前に、以下の内容をご確認ください。",
    ageRule: "女性は35歳以上、男性は35歳未満限定です",
    termsPrefix: "すべての規約",
    termsSuffix: "に同意します",
    termsNote: "*利用規約・プライバシーポリシーへの同意が必要です",
    submit: "内容に同意して進む",
  },
  emailTermsNotice:
    "アカウント登録すると、利用規約・プライバシーポリシー・コミュニティガイドラインに同意したこととみなします。",
  otpSubmit: "登録する",
};

export const login = {
  title: "熟恋にログイン",
  withEmail: "メールアドレスでログイン",
  emailTitle: "メールアドレスを入力してください",
  otpSubmit: "ログインする",
};
