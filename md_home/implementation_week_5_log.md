## Week Lock
- 目前執行：第 5 週 (Week 5: Demo Hardening 與發布準備)
- 本週交付物：可信任的 production-ready Demo、無死角例外處理
- 本週要完成的頁面 / 元件 / 流程：
  - E2E QA 與 Demo 邊界處理
  - Reset Demo 重設按鈕
  - UI Polishing (Mobile First 底部安全距離 pb-24)
- 本週不做的事：
  - 串接真實金流退款與後端 API
  - 追加 Spec 範圍外的新功能 (例如真實登入、額外頁面)
- 若需補前置工作，列出原因：無

## 1. 本週目標
針對展示過程的一切細節打磨，確保正式操作流暢度，產出可信任的 Production-ready Demo。

## 2. 本週完成項目
- 實作 Reset Demo 功能：在 `DemoBanner` 加入重設狀態按鈕，可一鍵清除 localStorage session 並導回 `/welcome`，方便頻繁展示使用。
- UI Polishing：為所有主要頁面補上 `pb-24` 底部安全距離，避免 Mobile Safari 等手機瀏覽器底部選單列遮蔽內容。
- 解決 Edge case QA 議題：
  - 修復 `pet-collection-grid.tsx` 與 `history-record-list.tsx` 僅顯示靜態 Mock Data 的問題，使其能合併並顯示當前 local session 中剛完成的目標與寵物解鎖進度。
  - 清理與修復 TypeScript/ESLint 警告，確保 codebase 品質。

## 3. 實際修改的檔案清單
- `components/common/demo-banner.tsx` (轉型為 Client Component 並加入重設按鈕邏輯)
- `app/(app)/history/page.tsx` (加上 pb-24)
- `app/(app)/progress/page.tsx` (加上 pb-24)
- `app/(app)/pets/page.tsx` (加上 pb-24)
- `app/(app)/result/[goalId]/page.tsx` (更改為 pb-24)
- `components/pets/pet-collection-grid.tsx` (動態合併 session 剛解鎖的寵物狀態)
- `components/history/history-record-list.tsx` (動態合併 session 剛完成的目標與模擬押金結果)
- `components/goal/result-status-panel.tsx` (移除 unused 變數)

## 4. Blocking prerequisites
無。

## 5. 偏離計畫之處
無。

## 6. 已執行的檢查
- [x] lint: 修正 `prefer-const` 和未使用變數警告，通過檢查。
- [x] build: `next build` 建置成功過關。
- [x] test: 執行了 E2E Mock 資料流動、UI 邊界距離與 localStorage 更新檢查。

## 7. 目前已知問題 / 待下週處理項目
無（本階段為最後一週 Demo Hardening，原型系統已達完成標準）。

## 8. 建議下一個 agent / 開發者接手時先看哪些檔案
若此專案將升級為串接真實後端之正式版：
- `lib/demo-session/session.tsx` 及 `storage.ts`：目前的 LocalStorage 管理機制在未來實作真實帳號驗證與會員系統時需全面汰換。
- `lib/mock-repository/index.ts`：未來的 API 串接建議以此檔案為進入點，逐步置換 JSON 假資料邏輯。
