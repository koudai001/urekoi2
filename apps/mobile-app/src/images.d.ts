// Metro が画像を数値のアセット ID に変えるので、その型を宣言する
declare module "*.webp" {
  const source: number;
  export default source;
}

declare module "*.png" {
  const source: number;
  export default source;
}
