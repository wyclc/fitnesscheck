# Week 2 Implementation Log

## Week Lock
- **目前執行的是**：第 2 週
- **本週交付物**：Deposit, Deposit Success, Goal New 頁面，以及對應的 Demo Session 持久化、Client-side Route Guard 與首頁狀態連動。
- **本週要完成的頁面 / 元件 / 流程**：
  - `lib/demo-session/storage.ts` & `session.ts` (LocalStorage 機制)
  - `components/common/route-guard.tsx` (路由阻擋)
  - `app/(app)/deposit/page.tsx`, `components/deposit/deposit-option-card.tsx`, `components/deposit/deposit-selection-form.tsx`
  - `app/(app)/deposit/success/page.tsx`, `components/deposit/deposit-success-panel.tsx`
  - `app/(app)/goal/new/page.tsx`, `components/goal/goal-form.tsx`, `lib/validators/goal-form.ts`
  - `app/(app)/page.tsx` 整合 `components/home/home-state-panel.tsx`
- **本週不做的事**：
  - Week 3 的目標打卡、寵物成長邏輯。
  - Week 4 的歷史列表、圖表、進度頁及完賽/失敗結果頁。
  - 不做真後端 API 串接與真金流付款。
- **Blockers / Prerequisites**：
  - 無，Week 1 資料結構已完成。

## 本週完成項目
1. 建立 `lib/demo-session/storage.ts` 及 `session.tsx`，以 Context API 封裝 localStorage 並處理 hydration。
2. 建立 `components/common/route-guard.tsx` 實作 Client-side Route Guard 攔截非授權的流程狀態（例如在沒有設定押金前嘗試進入目標建立）。
3. 實作押金選擇邏輯：`app/(app)/deposit/page.tsx`, `DepositSelectionForm`。
4. 實作押金成功回饋：`app/(app)/deposit/success/page.tsx`, `DepositSuccessPanel`。
5. 實作目標建立：`app/(app)/goal/new/page.tsx`, `GoalForm` 以及 Client-side 表單審核邏輯 `lib/validators/goal-form.ts`。
6. 實作 `components/home/home-state-panel.tsx` 取代靜態首頁，動態讀取 session 顯示首頁入口（未設押金、已設押金未設目標、有目標等狀態）。

## 實際修改的檔案清單
- `app/layout.tsx` (包裝 SessionProvider)
- `app/(app)/page.tsx`
- `app/(app)/deposit/page.tsx`
- `app/(app)/deposit/success/page.tsx`
- `app/(app)/goal/new/page.tsx`
- `components/common/route-guard.tsx`
- `components/deposit/deposit-option-card.tsx`
- `components/deposit/deposit-selection-form.tsx`
- `components/deposit/deposit-success-panel.tsx`
- `components/goal/goal-form.tsx`
- `components/home/home-state-panel.tsx`
- `lib/demo-session/storage.ts`
- `lib/demo-session/session.tsx`
- `lib/validators/goal-form.ts`

## 偏離計畫之處
無

## 已執行的檢查
- lint: 執行完畢，已修復 `Date.now()` 不純函數寫法與 `useEffect` 更新狀態之警告，全數通過。
- build: 執行完畢，全數頁面編譯通過 (`Static` 等級)。
- test: 不適用（Prototype 階段主要為手動驗證）

## 目前已知問題 / 待下週處理項目
目前 `app/(app)/goal/new/page.tsx` 提交成功後，導向了首頁 `/` 並看見了 State C 的狀態（進行中的目標），待下週 (Week 3) 實作了目標詳情頁之後，點擊首頁捷徑就可以進入真正的打卡介面了。

## 建議下一個 agent 接手時先看哪些檔案
- `lib/demo-session/session.tsx` 了解前端 session 掛載機制。
- `components/common/route-guard.tsx` 了解路由阻擋的實作。
- `components/home/home-state-panel.tsx` 了解目前可以處理的首頁狀態種類。
