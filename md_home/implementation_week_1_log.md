# Week 1 Implementation Log

## Week Lock
- **目前執行的是**：第 1 週
- **本週交付物**：基礎專案結構架設、CI/CD 相關初始化（Git）、Mock 資料結構、Mock Repository 介面、`/welcome` 靜態頁面、`/` 首頁靜態殼層及 Demo Banner 元件。
- **本週要完成的頁面 / 元件 / 流程**：
  - `app/layout.tsx` (Root Layout) 跟 `app/globals.css` (Tailwind 設定)
  - `app/(marketing)/welcome/page.tsx` (歡迎/導覽頁)
  - `app/(app)/page.tsx` (靜態首頁)
  - `components/common/demo-banner.tsx` (Demo 提示元件)
  - `mocks/` 資料夾 (押金、目標、寵物等 20 筆種子資料)
  - `types/` 型別宣告
  - `lib/mock-repository/` 資料存取介面
- **本週不做的事**：
  - Week 2 的 LocalStorage sessions 及 Client-side Route Guard 不做。
  - Week 2 的押金選擇、目標設定流程不做。
  - Week 3 的打卡動態邏輯與寵物成長狀態更新不做。
  - Week 4 的歷史列表、圖表、進度頁及完賽/失敗結果頁不做。
  - 所有的真後端與真金流均不在專案範圍內。
- **Blockers / Prerequisites**：
  - 無，本週為專案初始化，未遭遇到任何阻礙。

## 本週完成項目
1. 完成 Next.js App Router 初始化，並移除預設的 `app/page.tsx` 避免衝突。
2. 建立 `types/` 定義：包括 `deposit.ts`, `goal.ts`, `pet.ts`, `progress.ts`, `session.ts`，確保 mock 資料型別安全。
3. 建立 `mocks/` 定義：20 筆 deposit, 20 筆 goal, 以及對應的 pets 與 body-progress 假資料。
4. 建立 `lib/mock-repository/index.ts` 提供抽象介面以便未來頁面統一讀取資料。
5. 實作靜態畫面：
   - `app/layout.tsx` 與 `globals.css` (Tailwind 基礎設定與 App Shell)
   - `components/common/demo-banner.tsx`
   - `app/(marketing)/welcome/page.tsx` (登入前歡迎與導覽頁)
   - `app/(app)/layout.tsx`
   - `app/(app)/page.tsx` (首頁空殼)

## 實際修改的檔案清單
- **New Directory Structure**: `app/`, `components/`, `lib/`, `mocks/`, `types/`
- **Configuration Defaults**: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `.eslintrc.json`, `next.config.mjs`
- **Core Types**:
  - `types/deposit.ts`, `types/goal.ts`, `types/pet.ts`, `types/progress.ts`, `types/session.ts`, `types/index.ts`
- **Mock Data**:
  - `mocks/deposits.seed.ts`, `mocks/goals.seed.ts`, `mocks/pets.seed.ts`, `mocks/body-progress.seed.ts`
  - `lib/mock-repository/index.ts`
- **UI Components & Pages**:
  - `components/common/demo-banner.tsx`
  - `app/layout.tsx`, `app/globals.css`
  - `app/(app)/layout.tsx`, `app/(app)/page.tsx`
  - `app/(marketing)/welcome/page.tsx`

## 偏離計畫之處
無

## 已執行的檢查
- `npm run lint`: 通過 (0 errors, 0 warnings)
- `npm run build`: 通過，`/` 與 `/welcome` 皆成功編譯成 Static Content。

## 目前已知問題 / 待下週處理項目
目前 `app/(app)/page.tsx` 中的「尚未設定押金」狀態為寫死，這是由於本週不處理 LocalStorage Session 邏輯。待下週 (Week 2) 實作 Client-side Route Guard 與 `HomeStatePanel` 後將予以替換成動態讀取使用者狀態。

## 建議下一個 agent 接手時先看哪些檔案
- `types/index.ts`: 掌握所有核心資料物件形狀。
- `lib/mock-repository/index.ts`: 理解目前提供給 UI 的可用假資料擷取方法。
- `mocks/`: 確認目前種子的資料量與分佈狀態，了解其 ID (如 `d-101`, `g-205` 等關聯設計)。
