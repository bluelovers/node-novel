# README.md

    簡易型小說排版整理

## install

```
npx @node-novel/layout-cli

// 可以自訂配對指定檔案
npx @node-novel/layout-cli *.txt
npx @node-novel/layout-cli c*.txt a.txt b.txt
```

- 如果給的參數是路徑的話 推薦使用 unix 風格的斜線 `/` 來取代 `\`
- 此腳本預設不處理子資料夾(即使輸入規則內包含也是如此)
- 但如果此資料夾為 node-novel style 的小說資料夾(也就是包含 readme.md 則會自動處理子資料夾)

```
Options:
  --cwd       搜尋檔案的基準資料夾              [string]
  --ruleName  更換使用其他內建樣式集來進行排版                          [string]
  --version   Show version number                                      [boolean]
  --help      Show help                                                [boolean]
```

`--ruleName xxx` 可以為以下內容 或查閱 [`@layout-pattern`](https://github.com/bluelovers/node-novel/tree/master/packages/layout-pattern/lib/rules)

- `demo`
- `demo.zht`

- `demo.lf2`
- `demo.lf2.cht`
