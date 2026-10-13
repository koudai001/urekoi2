// 利用側（workers-api は hono/jsx）の tsconfig で型チェックされても React の JSX として扱わせる
/** @jsxImportSource react */
import type { CSSProperties, ReactElement } from "react";
import { Body, Container, Heading, Html, Preview, Text } from "react-email";

export interface OtpEmailProps {
  otp: string;
}

export function OtpEmail({ otp }: OtpEmailProps): ReactElement {
  return (
    <Html lang="ja">
      {/* メール一覧で件名の横に出る1行 */}
      <Preview>ログインコード: {otp}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>ログインコード</Heading>
          <Text style={text}>以下のコードをアプリに入力してください。</Text>
          <Text style={code}>{otp}</Text>
          <Text style={note}>
            有効期限は5分です。
            <br />
            心当たりがない場合は、このメールを無視してください。
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// メールソフトは CSS のクラスに対応していないことが多いため、スタイルはインラインで書く
const body: CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif',
};

const container: CSSProperties = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "480px",
};

const heading: CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const text: CSSProperties = {
  fontSize: "16px",
  lineHeight: "28px",
  margin: "0 0 16px",
};

const code: CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "8px",
  margin: "24px 0",
};

const note: CSSProperties = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666666",
  margin: 0,
};
