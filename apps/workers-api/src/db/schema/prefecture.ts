import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// 都道府県マスタ(JIS X 0401コード 1〜47)。値はシードスクリプトで投入する
export const prefecture = sqliteTable("prefecture", {
  code: integer("code").primaryKey(),
  name: text("name").notNull(),
});
