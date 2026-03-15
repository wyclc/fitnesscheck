# 文件資訊

* **文件名稱**：運動押金養成 App Frontend Spec
* **文件版本**：v0.1-spec
* **文件狀態**：Draft for Implementation
* **最後更新日期**：2026/03/14
* **文件目的**：定義可供前端工程師、QA、AI coding agent 直接執行的頁面、路由、元件、狀態、資料、例外處理、測試掛鉤與部署前提
* **來源（Spot / PRD）**：

  * 使用者本次 prompt 中的需求約束
  * 《運動押金養成 App PRD v0.1》
  * Spot 原文未於本次 prompt 中單獨附上；本文件以 PRD 與 prompt 明示需求為唯一產品依據
* **參考依據（官方 Next.js / 官方 Vercel，若有）**：

  * Next.js 官方 App Router、Layouts and Pages、Project Structure、Server and Client Components、Route Groups、CSS、TypeScript、loading、error、not-found 文件。([Next.js][1])
  * Vercel 官方 Git deployment、Preview/Production environments、GitHub integration 文件。([Vercel][2])

# 前言

## Spec 目的

本文件將 PRD 轉換為可實作、可測試、可拆工的前端規格，重點放在：

* 路由與頁面責任
* 元件與資料契約
* demo 狀態流與限制
* 錯誤與例外處理
* 測試掛鉤
* 部署與環境前提

## 文件定位

本文件是 **Frontend / QA / AI coding agent 實作規格**，不是產品願景文件，也不是設計稿替代品。

## 與 PRD 的關係

* **PRD**：定義為什麼做、做什麼、做到哪裡
* **Spec**：定義怎麼落成前端系統、頁面、狀態、資料與驗收掛鉤

## 本文件適用範圍

適用於本次 **Mobile First App Prototype + 前端 Demo**：

* 僅使用 mock data
* 不串接後端
* 不做真實付款 / 退款
* 不做真實登入與安全驗證
* 僅定義 prototype 等級之路由保護與 demo session 表現

# 開發範圍與限制

## 本次實作範圍

1. 歡迎 / 導覽頁
2. 首頁 Home（依狀態切換內容）
3. 押金選擇頁
4. 押金確認成功頁（Demo）
5. 目標設定頁
6. 目標詳情 / 打卡頁
7. 進度頁
8. 寵物收藏頁
9. 完成 / 失敗結果頁
10. 歷史紀錄頁
11. 20 筆押金 mock data
12. 20 筆目標 mock data
13. 對應寵物與身體變化 mock data
14. demo 狀態切換能力（供展示 / QA）

## 不在本次範圍

1. 真實金流
2. 真實退款
3. 真實帳號登入 / 註冊
4. 穿戴裝置串接
5. 推播與背景通知
6. 後端 API / DB
7. 跨裝置同步
8. 後台管理
9. 社群、排行、好友
10. 教練推薦、複雜分析模型

## Prototype 限制

1. 所有資料皆為 mock data
2. 所有新增 / 更新僅作用於瀏覽器前端狀態
3. 路由保護僅為 demo 級流程限制，不是正式安全保護
4. 付款成功 / 押金返還皆為模擬文案與模擬結果
5. 身體變化資料僅做視覺展示，不應暗示醫療判讀

## 風險提醒

1. 使用 local storage / client state 的流程保護可被繞過，不具正式安全性
2. 若未明確定義 targetCount、到期規則、單次打卡規則，容易造成前端與 QA 對完成條件理解不一致
3. Demo 若沒有狀態切換機制，展示與手測成本會過高
4. 若將整頁過度 client 化，會增加 bundle 與維護成本
5. 若把 prototype 文案寫得像正式金流，會造成誤解風險

# 技術基準

本專案以前端 prototype 為前提，技術基準如下：

* **Framework**：Next.js，採 **App Router**，不混用 Pages Router。App Router 是 Next.js 較新的路由模型，採檔案式路由，支援 layouts、nested routing、loading/error/not-found 等檔案慣例。([Next.js][1])
* **Language**：TypeScript。Next.js 對 TypeScript 提供內建支援。([Next.js][3])
* **Styling**：Tailwind CSS 為主；全域樣式放在 `app/globals.css`，由 root layout 載入；若有少量 Tailwind 不易表達的樣式，可局部使用 CSS Modules。([Next.js][4])
* **Router 組織**：使用 route groups 做資料夾分群，僅作組織用途，不應出現在 URL path。([Next.js][5])
* **Layout 與檔案慣例**：

  * `app/layout.tsx` 為 root layout，必須包含 `html` 與 `body`
  * 路由頁面用 `page.tsx`
  * 區段 loading 用 `loading.tsx`
  * 區段例外用 `error.tsx`
  * 找不到資源用 `not-found.tsx`。([Next.js][6])
* **Server / Client 原則**：pages 與 layouts 預設採 Server Components；只有需要 state、event handler、`useEffect`、browser APIs（如 localStorage）時才下沉為 Client Components。([Next.js][7])
* **Deployment target**：Vercel
* **Git-based workflow**：GitHub repo + Vercel Git integration
* **Preview / Production 邏輯**：

  * 非 production branch push / PR → Preview deployment
  * merge 到 production branch（預設 `main`）→ Production deployment
  * production branch 名稱可調整，但本 Spec 預設為 `main`。([Vercel][2])
* **資料來源**：本版全部使用 mock data
* **驗證 / session**：

  * **無真實登入**
  * **無正式 session**
  * 僅有 **demo 級前端狀態持久化**
* **demo 級做法**

  * localStorage 保存本機瀏覽器 demo 進度
  * client-side route guard 限制流程順序
  * 模擬提交延遲與模擬成功 / 失敗狀態
* **不是正式安全方案**

  * localStorage 不可作為正式權限控管
  * client redirect 不可作為正式保護頁面方案
  * 模擬押金 / 退款不可作為金流實作依據

# 專案結構建議

```txt
app/
  layout.tsx
  globals.css
  not-found.tsx
  (marketing)/
    welcome/
      page.tsx
  (app)/
    layout.tsx
    loading.tsx
    error.tsx
    page.tsx
    deposit/
      page.tsx
      success/
        page.tsx
    goal/
      new/
        page.tsx
      [goalId]/
        page.tsx
        loading.tsx
    progress/
      page.tsx
    pets/
      page.tsx
    history/
      page.tsx
    result/
      [goalId]/
        page.tsx

components/
  common/
    app-shell.tsx
    page-header.tsx
    status-badge.tsx
    empty-state.tsx
    demo-banner.tsx
    route-guard.tsx
    section-card.tsx
  home/
    home-state-panel.tsx
    quick-actions.tsx
  deposit/
    deposit-option-card.tsx
    deposit-selection-form.tsx
    deposit-success-panel.tsx
  goal/
    goal-form.tsx
    goal-summary-card.tsx
    check-in-action-panel.tsx
    pet-growth-card.tsx
    result-status-panel.tsx
  progress/
    progress-stats-panel.tsx
    body-metrics-chart.tsx
    time-range-tabs.tsx
  pets/
    pet-collection-grid.tsx
    pet-detail-sheet.tsx
  history/
    history-record-list.tsx

lib/
  constants/
    routes.ts
    labels.ts
  mock-repository/
    deposits.ts
    goals.ts
    pets.ts
    body-progress.ts
  selectors/
    app-state.ts
    goal-status.ts
    pet-growth.ts
    progress.ts
  validators/
    goal-form.ts
    deposit.ts
  demo-session/
    storage.ts
    session.ts
    presets.ts
  utils/
    dates.ts
    format.ts
    ids.ts

mocks/
  deposits.seed.ts
  goals.seed.ts
  pets.seed.ts
  body-progress.seed.ts
  demo-presets.ts

types/
  deposit.ts
  goal.ts
  pet.ts
  progress.ts
  session.ts

tests/
  unit/
  integration/
  e2e/
```

## 切分理由

* `app/`：只放路由與 route-level 檔案，符合 App Router 慣例。([Next.js][6])
* `route groups`：用 `(marketing)` 與 `(app)` 分離導覽頁與主應用殼層，URL 不受影響。([Next.js][5])
* `components/`：按功能模組切分，避免 page.tsx 過重
* `lib/mock-repository/`：集中 mock 讀取與轉換邏輯，避免頁面直接散落資料處理
* `selectors/`：集中狀態推導，方便單元測試
* `validators/`：集中表單規則，避免規則寫死在元件內
* `mocks/`：僅存 seed 資料，不直接夾雜 UI 邏輯
* `types/`：明確型別契約，供前端 / QA / AI coding agent 對齊
* `tests/`：按測試層級拆分，對應後續 testing plan

# 路由與頁面規格

## 路由總表

| 路由                 | 頁面名稱       | 主要責任           | 保護等級    |
| ------------------ | ---------- | -------------- | ------- |
| `/welcome`         | 歡迎 / 導覽頁   | 說明核心規則與 CTA    | 公開      |
| `/`                | 首頁 Home    | 依目前狀態顯示主入口     | 公開      |
| `/deposit`         | 押金選擇頁      | 選擇並確認 demo 押金  | 流程限制    |
| `/deposit/success` | 押金確認成功頁    | 顯示押金成功、解鎖目標    | 流程限制    |
| `/goal/new`        | 目標設定頁      | 建立新目標          | 受流程限制   |
| `/goal/[goalId]`   | 目標詳情 / 打卡頁 | 查看目標與執行打卡      | 受資料存在限制 |
| `/progress`        | 進度頁        | 顯示統計與身體變化 mock | 公開      |
| `/pets`            | 寵物收藏頁      | 瀏覽已獲得寵物        | 公開      |
| `/history`         | 歷史紀錄頁      | 查看過去目標與押金紀錄    | 公開      |
| `/result/[goalId]` | 結果頁        | 顯示完成或失敗結果      | 受狀態限制   |

---

## `/welcome`

* **頁面目的**：讓首次使用者在 1 個畫面內理解「先押金，後設目標；完成後拿回押金並獲得寵物」
* **使用者**：首次進入或手動重看導覽的使用者
* **When**：

  * 首次造訪且 `hasSeenWelcome = false`
  * 使用者從其他頁面主動返回導覽
* **What**：

  * App 名稱 / slogan
  * 核心價值三點
  * 主要 CTA：開始設定押金
  * 次要 CTA：略過導覽
* **How**：

  * server page render 靜態內容
  * CTA 區塊為 client button，點擊後寫入 `hasSeenWelcome = true`
* **Where**：`app/(marketing)/welcome/page.tsx`
* **頁面區塊**：

  1. Hero 區
  2. 核心規則三步驟
  3. Demo 說明條
  4. CTA 區
* **導頁規則**：

  * 開始設定押金 → `/deposit`
  * 略過導覽 → `/`
* **未授權 / 過期 / 錯誤處理**：

  * 無未授權概念
  * 若 localStorage 讀取失敗，不阻擋使用，直接允許導頁

---

## `/`

* **頁面目的**：作為主入口，依使用者目前狀態顯示不同內容
* **使用者**：所有使用者
* **When**：每次進入 App 主入口
* **What**：

  * 狀態 A：未押金
  * 狀態 B：已押金未設目標
  * 狀態 C：有進行中目標
  * 狀態 D：有歷史結果
* **How**：

  * server page 載入共用殼層與靜態 seed 摘要
  * client `HomeStatePanel` 讀取 demo session，決定畫面狀態
* **Where**：`app/(app)/page.tsx`
* **頁面區塊**：

  1. 頁首標題
  2. Demo banner
  3. 主要狀態卡
  4. 快捷入口
  5. 最新結果 / 歷史入口
* **導頁規則**：

  * 未押金 → `/deposit`
  * 已押金未設目標 → `/goal/new`
  * 有進行中目標 → `/goal/[activeGoalId]`
  * 看進度 → `/progress`
  * 看寵物收藏 → `/pets`
  * 看歷史 → `/history`
* **未授權 / 過期 / 錯誤處理**：

  * 若 active deposit / active goal id 指向不存在資料：顯示「demo 狀態已損毀」恢復卡，提供「重設本機 demo」按鈕
  * 若目標已逾期且尚未結算：首頁 hydration 後應先完成狀態轉換，再顯示失敗結果提示

---

## `/deposit`

* **頁面目的**：完成第一個承諾行為，建立押金
* **使用者**：尚未有進行中目標的使用者
* **When**：

  * 初次進入流程
  * 上一輪目標完成或失敗後重新開始
* **What**：

  * 100 / 200 / 300 固定選項
  * Demo 說明文案
  * CTA：確認押金
* **How**：

  * client form 管理選中狀態與提交 loading
  * 模擬提交成功後建立新 deposit record，寫入 active deposit
* **Where**：`app/(app)/deposit/page.tsx`
* **頁面區塊**：

  1. 標題 / 說明
  2. 選項卡區
  3. 注意事項（demo）
  4. CTA 區
* **導頁規則**：

  * 成功 → `/deposit/success`
  * 返回 → `/`
* **未授權 / 過期 / 錯誤處理**：

  * 若已有進行中目標：不允許建立新押金；顯示阻擋卡與 CTA「前往目前目標」
  * 若已有已確認但未綁目標之押金：不重複建立；顯示既有押金摘要與 CTA「前往建立目標」
  * 若未選金額就送出：按鈕應保持 disabled，不出現 submit 行為

---

## `/deposit/success`

* **頁面目的**：明確顯示押金已成功設定，並解鎖目標建立
* **使用者**：剛完成押金確認的使用者
* **When**：從 `/deposit` 提交成功後
* **What**：

  * 成功圖示
  * 押金金額
  * 解鎖說明
  * CTA：開始設定目標
* **How**：

  * server shell + client 讀取最近 active deposit
* **Where**：`app/(app)/deposit/success/page.tsx`
* **頁面區塊**：

  1. 成功主視覺
  2. 金額摘要
  3. 解鎖說明
  4. CTA 區
* **導頁規則**：

  * 開始設定目標 → `/goal/new`
  * 回首頁 → `/`
* **未授權 / 過期 / 錯誤處理**：

  * 若沒有 active confirmed deposit：redirect `/deposit?reason=missing-deposit`
  * 若已有 active goal：redirect `/goal/[activeGoalId]`

---

## `/goal/new`

* **頁面目的**：建立可追蹤的個人運動目標
* **使用者**：已完成押金設定但尚未建立目標的使用者
* **When**：押金成功後
* **What**：

  * 目標名稱
  * 運動類型
  * 每週頻率
  * 單次時長
  * 開始日期
  * 結束日期
  * 寵物預覽
  * CTA：建立目標
* **How**：

  * client form
  * 驗證通過後建立 goal / pet / bodyProgress 初始資料並寫入 active goal
* **Where**：`app/(app)/goal/new/page.tsx`
* **頁面區塊**：

  1. 表單區
  2. 表單驗證訊息區
  3. 寵物預覽區
  4. 建立 CTA 區
* **導頁規則**：

  * 建立成功 → `/goal/[goalId]`
  * 返回首頁 → `/`
* **未授權 / 過期 / 錯誤處理**：

  * 無 active deposit：redirect `/deposit?reason=deposit-required`
  * 已有進行中目標：redirect `/goal/[activeGoalId]?reason=active-goal-exists`
  * 表單驗證錯誤：停留本頁，欄位級錯誤顯示
  * 建立失敗（mock failure）：停留本頁並顯示全域錯誤橫幅

---

## `/goal/[goalId]`

* **頁面目的**：顯示目標資訊、進度與打卡入口
* **使用者**：有目標資料的使用者
* **When**：

  * 從首頁進入
  * 建立目標後進入
  * 從歷史紀錄查看
* **What**：

  * 目標資訊
  * 進度條
  * 寵物成長
  * 打卡按鈕
  * 狀態標籤
* **How**：

  * route 以 `goalId` 取資料
  * hydration 後重新判斷狀態是否需轉 completed / failed
* **Where**：`app/(app)/goal/[goalId]/page.tsx`
* **頁面區塊**：

  1. 目標摘要區
  2. 進度條區
  3. 寵物成長區
  4. 打卡 CTA 區
  5. 相關操作區（看進度 / 看結果 / 回首頁）
* **導頁規則**：

  * 打卡成功但未完成：留在本頁
  * 打卡後達成目標：redirect `/result/[goalId]`
  * 若 hydrate 後判定已失敗：redirect `/result/[goalId]`
* **未授權 / 過期 / 錯誤處理**：

  * `goalId` 不存在：觸發 `notFound()`
  * goal 已完成 / 已失敗：本頁只讀，不顯示可打卡 CTA，提供「查看結果」
  * active goal 與 route goalId 不一致：允許查看歷史，但若歷史為失敗 / 完成則只讀
  * 重複連點打卡：同一次提交期間忽略後續點擊

---

## `/progress`

* **頁面目的**：回應「我有沒有變好」的需求
* **使用者**：所有使用者
* **When**：主動查看進度與身體變化時
* **What**：

  * 完成次數
  * 連續打卡天數 / 週數
  * 完成率
  * 身體變化摘要
  * 趨勢圖
* **How**：

  * server 載入 seed summary
  * client 管理時間區間切換與圖表互動
* **Where**：`app/(app)/progress/page.tsx`
* **頁面區塊**：

  1. 時間區間切換
  2. 統計卡區
  3. 身體變化卡區
  4. 趨勢圖區
  5. 歷史摘要入口
* **導頁規則**：

  * 看歷史 → `/history`
  * 看目前目標 → `/goal/[activeGoalId]`
* **未授權 / 過期 / 錯誤處理**：

  * 無資料：顯示空狀態，不顯示圖表
  * bodyProgress 缺漏：該區塊顯示 fallback 文案，不阻斷整頁

---

## `/pets`

* **頁面目的**：顯示已解鎖寵物與未解鎖占位
* **使用者**：所有使用者
* **When**：主動查看收藏時
* **What**：

  * 已解鎖清單
  * 未解鎖占位
  * 點擊查看寵物詳情
* **How**：

  * server 載入 seed list
  * client 管理 detail sheet 開關
* **Where**：`app/(app)/pets/page.tsx`
* **頁面區塊**：

  1. 收藏總覽
  2. 已解鎖清單
  3. 未解鎖占位
  4. 寵物詳情 sheet
* **導頁規則**：

  * 點擊卡片 → 開啟頁內 detail sheet
  * 回首頁 → `/`
* **未授權 / 過期 / 錯誤處理**：

  * 無寵物：空狀態
  * 有資料但圖片缺漏：顯示 fallback placeholder，不可破版

---

## `/history`

* **頁面目的**：瀏覽過去目標與押金紀錄
* **使用者**：所有使用者
* **When**：想查看已完成 / 失敗歷程時
* **What**：

  * 歷史目標卡
  * 對應押金與返還狀態
  * 完成 / 失敗標籤
* **How**：

  * 讀取 goal + deposit 關聯資料
  * 預設依日期新到舊排序
* **Where**：`app/(app)/history/page.tsx`
* **頁面區塊**：

  1. 歷史列表
  2. 狀態標籤
  3. 結果快捷入口
* **導頁規則**：

  * 查看詳情 → `/goal/[goalId]`
  * 查看結果 → `/result/[goalId]`
* **未授權 / 過期 / 錯誤處理**：

  * 無歷史：空狀態
  * 關聯 deposit 遺失：列表顯示「押金資料缺失」，但目標卡仍可查看

---

## `/result/[goalId]`

* **頁面目的**：在完成或失敗時給出明確結果回饋
* **使用者**：狀態為 completed / failed 的目標擁有者
* **When**：

  * 完成後自動導入
  * 失敗後自動導入
  * 從歷史紀錄重新查看
* **What**：

  * 完成：恭喜、押金已返還、新寵物、成果摘要
  * 失敗：未完成、押金不返還、鼓勵重新開始
* **How**：

  * 由 `goal.status` 決定畫面分支
  * 若為第一次查看 completed，需同步清除 `newPetUnseen` flag
* **Where**：`app/(app)/result/[goalId]/page.tsx`
* **頁面區塊**：

  1. 結果主視覺
  2. 摘要區
  3. 押金結果區
  4. 寵物獎勵 / 失敗說明區
  5. CTA 區
* **導頁規則**：

  * 完成後看寵物 → `/pets`
  * 回首頁 → `/`
  * 重新開始 → `/deposit`
* **未授權 / 過期 / 錯誤處理**：

  * 目標不存在：`notFound()`
  * 若 status 仍為 `in_progress`：redirect `/goal/[goalId]`
  * 若關聯資料不完整：顯示簡化結果頁，不阻斷主要 CTA

# Server / Client 邊界

## Server-first 原則

Next.js App Router 下，pages 與 layouts 預設為 Server Components；本專案應維持 server-first，只把互動最小單位切成 client。([Next.js][7])

## 應優先採 server-first 的頁面 / 區塊

1. `app/layout.tsx`
2. `app/(marketing)/welcome/page.tsx`
3. `app/(app)/layout.tsx` 的殼層結構
4. `/`、`/deposit`、`/deposit/success`、`/goal/new`、`/progress`、`/pets`、`/history`、`/result/[goalId]` 的 page shell
5. 所有純展示型摘要卡、靜態說明文案、列表初始資料載入

## 必須是 Client Component 的互動

1. 押金金額選擇
2. 目標表單輸入與驗證狀態
3. 打卡按鈕與提交中狀態
4. localStorage demo session 讀寫
5. 時間區間切換
6. Pet detail sheet / modal
7. Demo preset switcher
8. toast / inline live feedback
9. 任何 `useEffect`、`window`、`localStorage` 相關邏輯

## 只存在前端的狀態

1. `hasSeenWelcome`
2. `activeDepositId`
3. `activeGoalId`
4. `newPetUnseen`
5. 表單 dirty / touched / submitting
6. 圖表時間區間選擇
7. sheet / drawer 開關
8. demo preset 當前模式
9. 模擬失敗 / timeout 開關（若啟用）

## 應避免不必要 client 化的地方

1. 不要為了單一按鈕事件把整個 page.tsx 標成 `use client`
2. 不要把整個 app root 變成 client component
3. 不要在 server page 內混入 localStorage 判斷
4. 不要在純展示元件中使用 `useEffect`
5. 不要把 seed data 處理散落在各元件中

## 推薦做法

* server page 只做：

  * 取 mock data
  * 組 page-level props
  * 組 layout / section 結構
* client leaf component 只做：

  * 表單、互動、前端 session、導頁條件、動畫狀態

# 畫面區塊與元件規格

## 1. `DemoBanner`

* **用途**：在 prototype 中持續提示「金流 / 退款 / 身體數據皆為模擬」
* **顯示內容**：

  * Demo 標籤
  * 簡短警示文案
* **Props**

```ts
type DemoBannerProps = {
  variant?: 'default' | 'warning'
  compact?: boolean
}
```

* **輸入 / 輸出**

  * 輸入：variant、compact
  * 輸出：無事件
* **狀態**：default / warning
* **空狀態**：不適用
* **錯誤狀態**：不適用
* **loading 狀態**：不適用
* **success / failure 行為**：不適用

## 2. `RouteGuard`

* **用途**：在 demo 狀態尚未 hydrate 前阻止錯誤渲染，hydrate 後依規則放行 / redirect
* **顯示內容**：

  * skeleton
  * 或 guard message
* **Props**

```ts
type GuardResult =
  | { allowed: true }
  | { allowed: false; redirectTo: string; reason: string }

type RouteGuardProps = {
  check: () => GuardResult
  loadingFallback?: React.ReactNode
  children: React.ReactNode
}
```

* **輸入 / 輸出**

  * 輸入：guard function
  * 輸出：client redirect
* **狀態**：

  * hydrating
  * allowed
  * blocked
* **空狀態**：不適用
* **錯誤狀態**：guard 執行失敗時顯示恢復卡
* **loading 狀態**：顯示頁面 skeleton
* **success / failure 行為**：

  * success：render children
  * failure：redirect

## 3. `HomeStatePanel`

* **用途**：根據首頁狀態 A / B / C / D 顯示對應內容
* **顯示內容**：

  * 狀態說明
  * CTA
  * 目標 / 寵物 / 歷史摘要
* **Props**

```ts
type HomeState = 'no_deposit' | 'deposit_unlinked' | 'goal_active' | 'history_only'

type HomeStatePanelProps = {
  state: HomeState
  activeDeposit?: DepositRecord
  activeGoal?: GoalRecord
  latestResultGoal?: GoalRecord
  newPetUnseen?: boolean
}
```

* **狀態**：四種首頁狀態
* **空狀態**：`no_deposit`
* **錯誤狀態**：資料關聯失敗時顯示 reset CTA
* **loading 狀態**：首頁骨架屏
* **success / failure 行為**：點擊 CTA 導至對應路由

## 4. `DepositOptionCard`

* **用途**：顯示單一押金選項
* **顯示內容**：

  * 金額
  * 選中樣式
* **Props**

```ts
type DepositOptionCardProps = {
  amount: 100 | 200 | 300
  selected: boolean
  disabled?: boolean
  onSelect: (amount: 100 | 200 | 300) => void
}
```

* **狀態**：default / selected / disabled
* **空狀態**：不適用
* **錯誤狀態**：不適用
* **loading 狀態**：提交期間全部 disabled
* **success / failure 行為**：點擊後回傳 `amount`

## 5. `DepositSelectionForm`

* **用途**：管理押金選擇與提交
* **顯示內容**：

  * 3 張金額卡
  * submit button
  * demo notice
* **Props**

```ts
type DepositSelectionFormProps = {
  onSubmit: (amount: 100 | 200 | 300) => Promise<void>
}
```

* **狀態**：

  * no-selection
  * selected
  * submitting
  * submit-success
  * submit-failure
* **空狀態**：初始為 no-selection
* **錯誤狀態**：顯示 inline error banner
* **loading 狀態**：button loading + cards disabled
* **success / failure 行為**：

  * success：導頁 `/deposit/success`
  * failure：保留目前選項、顯示重試

## 6. `DepositSuccessPanel`

* **用途**：顯示押金已確認
* **顯示內容**：

  * success icon
  * amount
  * 說明文字
* **Props**

```ts
type DepositSuccessPanelProps = {
  deposit: DepositRecord
}
```

* **狀態**：success only
* **錯誤狀態**：deposit 缺漏時改顯示 fallback 卡
* **loading 狀態**：hydration 前 skeleton
* **success / failure 行為**：CTA 導向 `/goal/new`

## 7. `GoalForm`

* **用途**：建立目標
* **顯示內容**：

  * 目標名稱
  * 運動類型
  * 每週頻率
  * 單次時長
  * 開始日期
  * 結束日期
  * 目標摘要
  * CTA
* **Props**

```ts
type GoalFormValues = {
  goalTitle: string
  exerciseType: ExerciseType
  frequencyPerWeek: number
  durationPerSession: number
  startDate: string
  endDate: string
}

type GoalFormProps = {
  initialValues?: Partial<GoalFormValues>
  onSubmit: (values: GoalFormValues) => Promise<{ goalId: string }>
}
```

* **狀態**：

  * pristine
  * dirty
  * invalid
  * submitting
  * submit-failure
* **空狀態**：不適用
* **錯誤狀態**：

  * 欄位級錯誤
  * 表單級錯誤
* **loading 狀態**：送出中 disable 全表單
* **success / failure 行為**：

  * success：導頁目標詳情
  * failure：留在原頁

## 8. `GoalSummaryCard`

* **用途**：顯示目標重點資訊
* **顯示內容**：

  * 目標名稱
  * 運動類型
  * 起訖日期
  * 完成度
  * status badge
* **Props**

```ts
type GoalSummaryCardProps = {
  goal: GoalRecord
  compact?: boolean
}
```

* **狀態**：in_progress / completed / failed
* **空狀態**：不適用
* **錯誤狀態**：資料缺字段時顯示 `--`
* **loading 狀態**：skeleton card
* **success / failure 行為**：若可點擊則導頁 goal detail

## 9. `PetGrowthCard`

* **用途**：視覺化目標進度對應的寵物成長
* **顯示內容**：

  * 寵物圖像
  * 名稱
  * 成長階段
  * 成長描述
* **Props**

```ts
type PetGrowthCardProps = {
  pet: PetRecord
  progressRate: number
}
```

* **狀態**：egg / baby / growth / final
* **空狀態**：若無 pet，顯示 placeholder egg
* **錯誤狀態**：圖片缺漏時改 placeholder
* **loading 狀態**：skeleton illustration
* **success / failure 行為**：無提交事件

## 10. `CheckInActionPanel`

* **用途**：執行一次手動打卡
* **顯示內容**：

  * 打卡按鈕
  * 已完成 / 目標次數
  * 補充說明
* **Props**

```ts
type CheckInActionPanelProps = {
  goal: GoalRecord
  disabledReason?: string | null
  onCheckIn: () => Promise<{
    status: GoalStatus
    completedCount: number
  }>
}
```

* **狀態**：

  * enabled
  * disabled
  * submitting
  * success
  * failure
* **空狀態**：不適用
* **錯誤狀態**：顯示 inline error / toast
* **loading 狀態**：button loading
* **success / failure 行為**：

  * success 且未完成：更新數字與寵物階段
  * success 且完成：導頁結果頁
  * failure：保留現況，可重試

## 11. `ProgressStatsPanel`

* **用途**：顯示統計摘要
* **顯示內容**：

  * 總完成次數
  * 連續打卡
  * 完成率
  * 本期週均次數
* **Props**

```ts
type ProgressStatsPanelProps = {
  stats: {
    totalCompletedCount: number
    streakCount: number
    completionRate: number
    weeklyWorkoutCount: number
  }
}
```

* **狀態**：default only
* **空狀態**：顯示 0 值與說明文案
* **錯誤狀態**：欄位缺漏時卡片 fallback
* **loading 狀態**：skeleton cards

## 12. `BodyMetricsChart`

* **用途**：顯示 mock 趨勢
* **顯示內容**：

  * 體重 / 體脂 / 心情 / 耐力之選定指標
  * 趨勢線或柱狀
* **Props**

```ts
type RangeKey = '7d' | '30d' | 'all'

type BodyMetricsChartProps = {
  data: BodyMetricPoint[]
  metric: 'weight' | 'bodyFat' | 'mood' | 'stamina'
  range: RangeKey
}
```

* **狀態**：default / no-data
* **空狀態**：顯示「目前無可展示趨勢」
* **錯誤狀態**：資料格式異常時顯示文字 fallback
* **loading 狀態**：chart skeleton
* **success / failure 行為**：切換 range 後重繪

## 13. `PetCollectionGrid`

* **用途**：以 grid 顯示寵物收藏
* **顯示內容**：

  * 已解鎖卡
  * 未解鎖占位卡
* **Props**

```ts
type PetCollectionGridProps = {
  unlockedPets: PetRecord[]
  lockedPets: PetRecord[]
  onSelectPet: (petId: string) => void
}
```

* **狀態**：empty / partial / populated
* **空狀態**：無已解鎖寵物
* **錯誤狀態**：資料缺漏時仍顯示占位
* **loading 狀態**：grid skeleton
* **success / failure 行為**：點擊開 sheet

## 14. `PetDetailSheet`

* **用途**：顯示寵物詳情
* **顯示內容**：

  * 名稱
  * 種類
  * 獲得日期
  * 對應目標
  * 最終型態
* **Props**

```ts
type PetDetailSheetProps = {
  pet?: PetRecord | null
  relatedGoal?: GoalRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
```

* **狀態**：closed / open
* **空狀態**：pet 未選時不開啟
* **錯誤狀態**：goal 遺失時只顯示 pet 資訊
* **loading 狀態**：可省略，資料已在頁面內
* **success / failure 行為**：關閉 sheet

## 15. `ResultStatusPanel`

* **用途**：完成 / 失敗結果主體
* **顯示內容**：

  * 主標題
  * 押金結果
  * 寵物結果
  * 摘要
  * CTA
* **Props**

```ts
type ResultStatusPanelProps = {
  goal: GoalRecord
  deposit?: DepositRecord | null
  pet?: PetRecord | null
}
```

* **狀態**：completed / failed
* **空狀態**：不適用
* **錯誤狀態**：deposit / pet 缺漏時顯示簡化結果
* **loading 狀態**：skeleton
* **success / failure 行為**：

  * completed：CTA 看寵物 / 回首頁
  * failed：CTA 重新設定

## 16. `HistoryRecordList`

* **用途**：顯示歷史目標列表
* **顯示內容**：

  * goal title
  * dates
  * status
  * deposit amount
  * refund status
* **Props**

```ts
type HistoryRecordItem = {
  goal: GoalRecord
  deposit?: DepositRecord | null
}

type HistoryRecordListProps = {
  items: HistoryRecordItem[]
}
```

* **狀態**：empty / populated
* **空狀態**：尚無歷史紀錄
* **錯誤狀態**：關聯 deposit 遺失時顯示缺失標籤
* **loading 狀態**：list skeleton
* **success / failure 行為**：點擊進入詳情 / 結果

# 資料與 Mock Data 規格

## mock data 放置方式

* **seed data**：`mocks/*.seed.ts`
* **讀取 / 查找 / 組裝邏輯**：`lib/mock-repository/*.ts`
* **demo preset**：`mocks/demo-presets.ts`
* **前端可變狀態**：`lib/demo-session/storage.ts` + localStorage

## 檔案位置建議

```txt
mocks/
  deposits.seed.ts
  goals.seed.ts
  pets.seed.ts
  body-progress.seed.ts
  demo-presets.ts
```

## 資料模型

```ts
export type DepositAmount = 100 | 200 | 300
export type DepositStatus = 'confirmed'
export type RefundStatus = 'pending' | 'refunded' | 'forfeited'

export type GoalStatus = 'in_progress' | 'completed' | 'failed'
export type GrowthStage = 'egg' | 'baby' | 'growth' | 'final'
export type ExerciseType =
  | 'running'
  | 'walking'
  | 'strength'
  | 'yoga'
  | 'free_training'

export type DepositRecord = {
  depositId: string
  amount: DepositAmount
  createdAt: string
  depositStatus: DepositStatus
  linkedGoalId: string | null
  refundStatus: RefundStatus
}

export type GoalRecord = {
  goalId: string
  goalTitle: string
  exerciseType: ExerciseType
  frequencyPerWeek: number
  durationPerSession: number
  startDate: string
  endDate: string
  completedCount: number
  targetCount: number
  status: GoalStatus
  linkedDepositId: string
  linkedPetId: string
  bodyProgressSummary: string
  createdAt: string
  updatedAt: string
}

export type PetRecord = {
  petId: string
  petName: string
  species: string
  growthStage: GrowthStage
  isUnlocked: boolean
  linkedGoalId: string
  obtainedDate: string | null
  imageKey: string
}

export type BodyProgressRecord = {
  goalId: string
  baselineWeight: number | null
  currentWeight: number | null
  baselineBodyFat: number | null
  currentBodyFat: number | null
  staminaScore: number | null
  moodScore: number | null
  weeklyWorkoutCount: number
  trendPoints: Array<{
    date: string
    weight: number | null
    bodyFat: number | null
    mood: number | null
    stamina: number | null
  }>
}

export type DemoSessionState = {
  hasSeenWelcome: boolean
  activeDepositId: string | null
  activeGoalId: string | null
  newPetUnseen: boolean
  localCreatedDeposits: DepositRecord[]
  localCreatedGoals: GoalRecord[]
  localCreatedPets: PetRecord[]
  localCreatedBodyProgress: BodyProgressRecord[]
  updatedAt: string
}
```

## 欄位定義

### Deposit

* `depositId`：唯一識別碼
* `amount`：固定為 100 / 200 / 300
* `createdAt`：建立時間
* `depositStatus`：prototype 固定 `confirmed`
* `linkedGoalId`：尚未綁目標時為 `null`
* `refundStatus`：

  * `pending`：已押金但目標未結束
  * `refunded`：已完成並返還
  * `forfeited`：失敗不返還

### Goal

* `targetCount`：由日期區間與 `frequencyPerWeek` 推導，不由使用者直接輸入
* `status`：`in_progress` / `completed` / `failed`
* `linkedDepositId`：必填，一目標對一押金
* `linkedPetId`：必填，一目標對一寵物

### Pet

* `growthStage`：

  * `egg`
  * `baby`
  * `growth`
  * `final`
* `isUnlocked`：

  * goal 完成 → `true`
  * 進行中 / 失敗 → `false`

### BodyProgress

* 全為 mock，可出現 `null`
* 若值為 `null`，UI 不得顯示醫療意義推論

## 初始資料量

* 押金：20 筆

  * 100：7 筆
  * 200：7 筆
  * 300：6 筆
* 目標：20 筆

  * completed：8
  * in_progress：8
  * failed：4
* 寵物：20 筆，與 20 筆目標一一對應
* body progress：20 筆，與 goal 一一對應

## 狀態變化方式

### Seed data

* 不直接修改 `mocks/*.seed.ts`
* 實際畫面使用：

  * `seed data`
  * 加上 `localCreated*` 的前端新增資料
  * 再經 selectors 排序與去重

### 新增押金

1. 使用者選擇金額並送出
2. 建立新的 `DepositRecord`
3. `linkedGoalId = null`
4. `refundStatus = pending`
5. `activeDepositId = newDepositId`

### 建立目標

1. 需先有 `activeDepositId`
2. 建立 `GoalRecord`
3. `status = in_progress`
4. 建立對應 `PetRecord`
5. 建立 `BodyProgressRecord`
6. 回寫 deposit `linkedGoalId`
7. `activeGoalId = newGoalId`

### 打卡

1. `completedCount += 1`
2. 重新計算 `progressRate`
3. 更新 `growthStage`
4. 若 `completedCount >= targetCount`

   * `status = completed`
   * deposit `refundStatus = refunded`
   * pet `isUnlocked = true`
   * pet `growthStage = final`
   * `newPetUnseen = true`

### 失敗

1. 當前日期晚於 `endDate`
2. 且 `completedCount < targetCount`
3. `status = failed`
4. deposit `refundStatus = forfeited`
5. pet 保持未解鎖

## 前端狀態更新聲明

* 本版所有新增 / 更新 **僅做前端狀態更新**
* 刷新後是否保留，取決於 localStorage
* 不存在伺服器真實資料來源
* 不保證跨裝置一致

# 驗證 / 權限 / Session Flow

## 角色

* 單一角色：一般使用者
* 無管理者、無多角色權限差異

## 進入條件

| 頁面                 | 進入條件                                      |
| ------------------ | ----------------------------------------- |
| `/welcome`         | 無條件                                       |
| `/`                | 無條件                                       |
| `/deposit`         | 無進行中目標                                    |
| `/deposit/success` | 有 active confirmed deposit                |
| `/goal/new`        | 有 active confirmed deposit 且無 active goal |
| `/goal/[goalId]`   | goal 存在                                   |
| `/result/[goalId]` | goal 存在且 status 為 completed / failed      |
| `/progress`        | 無條件                                       |
| `/pets`            | 無條件                                       |
| `/history`         | 無條件                                       |

## 驗證條件

1. **先押金，後設目標**
2. **同一時間僅允許一個進行中目標**
3. **completed / failed 目標不可再打卡**
4. **result page 不可被 in_progress goal 直接進入**

## 失敗條件

1. 直接進 `/goal/new` 但沒有 active deposit
2. 直接進 `/deposit/success` 但沒有 active deposit
3. 直接進 `/result/[goalId]` 但 goal 尚未結束
4. 目標資料不存在
5. demo session 與資料關聯損毀

## 過期條件

* **無登入 session 過期**
* **只有目標狀態過期**

  * `today > endDate`
  * 且 `completedCount < targetCount`
  * 則目標轉 `failed`

## route protection 規則

1. `/goal/new`

   * 無押金 → redirect `/deposit`
   * 有 active goal → redirect `/goal/[activeGoalId]`
2. `/deposit`

   * 有 active goal → 顯示阻擋卡，不讓新增押金
3. `/result/[goalId]`

   * in_progress → redirect `/goal/[goalId]`
4. `/deposit/success`

   * 無 active deposit → redirect `/deposit`

## 重新登入條件

* 本版 **不適用**
* 無登入 / 登出 / session refresh

## demo 做法

* localStorage key 建議：`exercise-deposit-demo-v1`
* hydrate 後由 client guard 決定是否放行
* 可提供 demo reset / preset 切換

## 正式產品未來應如何替換

1. localStorage → server-issued session + user identity
2. client guard → server-side route validation
3. mock deposit / refund → 真實金流與後端狀態機
4. local records → database persistence
5. `goal ownership` → 後端驗證，不可只靠前端 id

# 狀態與互動規格

## 表單狀態

### 押金表單

* 初始：未選擇
* 選擇後：按鈕可點
* 提交中：按鈕 loading、卡片 disabled
* 成功：導頁 success page
* 失敗：停留本頁，顯示錯誤

### 目標表單

* 初始：空白
* dirty：任一欄位變更
* invalid：欄位未通過驗證
* submitting：整表 disabled
* submit success：導頁 goal detail
* submit failure：顯示表單級錯誤

## 表單驗證規則

### 必填

* `goalTitle`
* `exerciseType`
* `frequencyPerWeek`
* `durationPerSession`
* `startDate`
* `endDate`

### 規則

* `goalTitle.trim().length > 0`
* `goalTitle.length <= 40`
* `frequencyPerWeek` 必須為整數且 `>= 1`
* `durationPerSession` 必須為整數且 `>= 1`
* `endDate >= startDate`
* 目標期間至少 1 天
* 目標期間建議不超過 365 天；超過時阻擋送出

## `targetCount` 計算規則

```ts
goalDurationDays = differenceInCalendarDays(endDate, startDate) + 1
goalDurationWeeks = Math.ceil(goalDurationDays / 7)
targetCount = frequencyPerWeek * goalDurationWeeks
```

## 清單狀態

### 歷史頁

* 預設依 `createdAt / endDate` 新到舊
* 不提供複雜篩選
* 單筆卡片需顯示 status + refundStatus

### 寵物收藏頁

* 已解鎖優先顯示
* 已解鎖內部依 `obtainedDate desc`
* 未解鎖占位顯示在後

## 篩選 / 排序

### 進度頁

* 時間區間切換：

  * `7d`
  * `30d`
  * `all`

### 歷史頁

* 固定排序：最新在前
* 本版不做使用者自訂排序

## 儲存 / 更新

* 皆為前端 state mutation
* 提交時應加入 400–800ms 模擬延遲，以便呈現 loading 與可測試性
* mutation 完成後需同步更新：

  * 畫面
  * localStorage
  * 相關關聯資料

## 錯誤提示

* 欄位錯誤：欄位下方 inline message
* 表單級錯誤：表單上方 banner
* 路由限制錯誤：guard card + redirect
* 系統錯誤：route-level error fallback

## 成功提示

* 押金成功：success page
* 目標建立成功：導頁 goal detail
* 打卡成功：inline success text 或 toast
* 完成目標：自動進 result page
* 新寵物未查看：首頁顯示提醒 badge

## 重複提交處理

1. 提交中按鈕 disabled
2. 同一 promise 未結束前忽略二次點擊
3. 打卡成功後至少完成一次 state commit 才能再次點擊

## timeout / failure UI 行為

* Demo mutation timeout 門檻：5 秒
* 超時後顯示「操作逾時，請再試一次」
* 若啟用 `simulateFailure`：

  * 不更新 local state
  * 顯示 failure banner
  * 保留原本表單值 / 已選狀態

# RWD / UX / Accessibility 規格

## mobile first 要求

1. 以 360–430px 寬度為主要設計基準
2. 所有主流程在手機寬度下可完整操作
3. 主要 CTA 需落在首屏或 1 次捲動內可見
4. 上下 safe area 需預留空間
5. 卡片列表在窄螢幕維持單欄

## 文字層級

* H1：頁面主標題
* H2：區塊標題
* Body：說明文
* Meta：標籤、日期、次要資訊
* 不得只用字級差異不明顯的方式呈現層級

## 點擊區域

* 按鈕 / 卡片最小可點擊區域：44x44 px
* 選項卡整張可點
* icon 若有操作功能，需有對應點擊熱區與文字標示

## 對比與可讀性

1. 重要 CTA 與背景需有明確對比
2. 進行中 / 完成 / 失敗三種狀態不能只靠顏色區分
3. 必須搭配：

   * label
   * icon
   * 文案

## 狀態不能只靠顏色

* `in_progress`：藍/中性色 +「進行中」
* `completed`：綠色 +「已完成」
* `failed`：紅/灰色 +「失敗」

## 表單錯誤可辨識

1. 錯誤欄位需有紅框或明確狀態邊框
2. 需有文字錯誤說明
3. 需透過 `aria-describedby` 關聯錯誤訊息
4. 提交後焦點應移至第一個錯誤欄位

## 窄螢幕 / 長內容 / 多資料量時的處理

1. 長標題超過 2 行時截斷並保留 title / tooltip 或完整詳情頁
2. 20 筆列表使用自然捲動，不需虛擬清單
3. 寵物 grid 在手機寬度採 2 欄
4. 趨勢圖在窄螢幕下不得超出容器
5. 長文案需可換行，不得 overflow 破版

## Accessibility 要求

1. 所有互動元件可鍵盤操作
2. focus 樣式不可被移除
3. toast / 成功 / 錯誤訊息區需有 `aria-live="polite"`
4. 圖表需有文字摘要，不得只靠圖形
5. 寵物圖片需有替代文字
6. Demo 警示文案需可被朗讀理解

# 錯誤與例外處理

## Route-level 錯誤與 fallback

* `loading.tsx`：用於 `(app)` 與 `goal/[goalId]` 區段 skeleton。`loading.js` 為 App Router 的 route segment loading 慣例，能提供即時 loading UI。([Next.js][8])
* `error.tsx`：處理未預期 runtime error；此檔必須為 Client Component。([Next.js][9])
* `not-found.tsx`：處理不存在的 `goalId` 或其他找不到資源情況。([Next.js][10])

## Expected errors（本專案）

Expected errors 應用 inline / return-state 方式處理，不應把正常的表單驗證或 mock failure 當成 uncaught exception。這與 Next.js 對 expected errors 的建議一致。([Next.js][11])

## 至少涵蓋以下情境

### 1. 空值

* 目標名稱空白
* 未選運動類型
* 未填日期
* 進度頁無 body data
* 寵物收藏為空

### 2. 錯誤輸入

* `frequencyPerWeek = 0`
* `durationPerSession = 0`
* `endDate < startDate`
* 標題超長

### 3. 權限不足 / 流程不足

* 未押金進 `/goal/new`
* 未完成目標進 `/result/[goalId]`
* 已有進行中目標又進 `/deposit`

### 4. 狀態過期

* 進行中目標在 hydrate 當下已過截止日且未達標
* 應先更新為 failed，再導入結果頁

### 5. 重複提交

* 押金確認按鈕連點
* 建立目標按鈕連點
* 打卡按鈕連點

### 6. 大量資料

* 20 筆歷史列表手機滾動
* 20 個寵物卡手機 grid
* 長列表不應出現 layout shift 或按鈕被壓縮

### 7. timeout

* 模擬提交 5 秒未完成
* 顯示 timeout error
* 保留目前輸入值
* 提供重試

### 8. API failure（prototype 以 mock failure 模擬）

* 押金提交失敗
* 目標建立失敗
* 打卡更新失敗
* 進度資料讀取失敗（以 selector 故障或空資料模擬）

### 9. mock data 無資料

* 歷史頁空
* 寵物頁空
* 進度頁空
* 首頁無任何資料

### 10. 與 PRD 直接相關的 corner cases

* 直接進 `/deposit/success`
* 押金成功後離開，稍後再回來
* 已完成目標不可再打卡
* 已失敗目標不可顯示押金返還
* 完成後尚未看收藏頁，首頁仍需提示新寵物
* 返回上一頁後狀態需合理，不可出現同一 active deposit 對應多個 active goal

# 測試掛鉤需求

## 適合 Unit Test 的邏輯

1. `targetCount` 計算函式
2. `progressRate` 計算函式
3. `growthStage` 推導函式
4. `goal status transition`：

   * in_progress → completed
   * in_progress → failed
5. `refundStatus` 推導
6. route guard helper
7. goal form validator
8. history sorting selector
9. unlocked pet selector
10. `newPetUnseen` 清除邏輯

## 適合 Integration Test 的流程

1. 押金選擇 → success page
2. success page → goal/new guard
3. 目標建立成功後首頁 / goal detail 同步更新
4. goal detail 打卡後：

   * completedCount 更新
   * progress 更新
   * pet growth 更新
5. 逾期目標自動轉 failed
6. result page 首次查看後清除新寵物提醒
7. history page 與 result page 資料一致性
8. localStorage hydration 恢復上次 demo 狀態

## 應由 E2E 驗證的 user journey

1. **首次使用主流程**

   * `/welcome` → `/deposit` → `/deposit/success` → `/goal/new` → `/goal/[goalId]`
2. **進行中目標打卡至完成**

   * 進首頁 → 進目標詳情 → 打卡 → 完成 → result → pets
3. **目標失敗流程**

   * 建立短期目標 → 模擬過期 → result failed → 重新開始
4. **歷史回看流程**

   * 進 history → 進 goal detail / result
5. **重整後保留 demo 狀態**

   * 建立中途資料 → reload → 首頁正確顯示
6. **guard 流程**

   * 無押金直接進 `/goal/new`
   * 進行中目標時進 `/deposit`

## 留給 Manual QA 的 UI / 文案 / RWD

1. Demo 文案是否清楚標示模擬
2. 狀態色彩與標籤是否一致
3. 手機首屏 CTA 是否可見
4. 長標題 / 長說明是否破版
5. 空狀態文案是否明確
6. 錯誤訊息是否易懂
7. 圖表與文字摘要是否一致
8. focus / keyboard / live region 是否正確

## 必須被測的 edge cases

1. `endDate = startDate`
2. `frequencyPerWeek = 1`
3. 最後一次打卡剛好達成
4. 逾期但已達成，不得誤判失敗
5. 關聯 deposit 缺漏
6. localStorage 內容被污染 / JSON parse 失敗
7. mock data 為空
8. 連續點兩次打卡按鈕
9. 已完成 goal 直接進 detail
10. 未解鎖寵物點擊行為

# 部署與環境規格（高層）

## GitHub repo 前提

1. 專案版本控制在單一 GitHub repository
2. Production branch 預設為 `main`
3. 功能開發以 feature branch / PR 方式進行
4. 所有可部署版本必須可在本地 `next build` 通過

## branch / preview / production 基本邏輯

Vercel Git integration 會為非 production branch push 與 PR 建立 Preview deployment，merge 到 production branch 後建立 Production deployment；本專案依此作為環境規格前提。([Vercel][2])

### 建議分支邏輯

* `main`：production
* `feature/*`：開發
* `fix/*`：修正
* PR 指向 `main` 時必須可出 Preview URL 給 PM / QA 驗收

## Vercel 部署假設

1. 部署平台為 Vercel
2. 無後端服務相依
3. 本版不需 database、cron、queue、server secrets
4. 若需要環境變數，僅限：

   * `NEXT_PUBLIC_APP_ENV`
   * `NEXT_PUBLIC_ENABLE_DEMO_PRESETS`
5. Preview 與 Production 可有不同 demo 開關策略

## 最低 CI/CD 要求

1. install dependencies
2. type check
3. lint
4. unit / integration tests
5. `next build`
6. 失敗不得合併到 `main`

## 專案規格前提聲明

* CI/CD 在本文件中僅作為交付前提，不展開操作教學
* Preview URL 必須可供利害關係人驗收 prototype 狀態
* Production 只代表穩定展示版，不代表正式商業上線版

# 不做事項

1. 不做真實登入 / 註冊 / 忘記密碼
2. 不做正式 session 機制
3. 不做 JWT / OAuth / 第三方登入
4. 不做後端 API
5. 不做真實金流
6. 不做真實退款
7. 不做穿戴裝置資料同步
8. 不做通知中心 / 推播
9. 不做多人協作 / 社群
10. 不做排行榜 / 好友挑戰
11. 不做 CMS / admin
12. 不做資料匯出
13. 不做多語系
14. 不做 PWA / 離線模式
15. 不做深色模式切換
16. 不做複雜權限系統
17. 不做圖表第三方重套件的非必要導入
18. 不做超出 PRD 的新遊戲化機制
19. 不做超出一個 active goal 的多目標流程
20. 不做醫療、健康專業判讀文案

# 假設與待確認事項

1. **Spot 原文未單獨提供**：本 Spec 以 PRD 與本次 prompt 為唯一需求來源。
2. **同一時間僅支援一個進行中目標**。
3. **一筆押金只對應一個目標**。
4. **一個目標只對應一隻寵物**。
5. **目標失敗條件**：到 `endDate` 後仍未達 `targetCount`。
6. **`targetCount` 由日期區間與 `frequencyPerWeek` 自動計算**，不額外讓使用者輸入。
7. **「目標週期」欄位不另外獨立輸入**，改為由起訖日期推導顯示。
8. **運動打卡不做真實驗證**，純手動觸發。
9. **單日可否多次打卡**：本版不設商業規則限制，只防重複提交；是否要限制每日一次，待產品拍板。
10. **運動類型採固定選項**，不做自由輸入；若設計要支援「其他」，需另補規格。
11. **寵物詳情採頁內 sheet / drawer**，不另開獨立路由。
12. **歷史紀錄頁為必要頁面**，因 PRD 明示有歷史紀錄功能。
13. **Demo preset switcher 僅在 Preview / 非 Production 暴露**。
14. **localStorage 持久化不設逾時機制**，除非使用者手動 reset。
15. **本版無正式安全方案**；未來正式化需改 server-side 驗證與資料所有權控管。

# 給 Build / Test 的交接備註

## Build 階段不能自行超做

1. 不要擴充成真實登入流程
2. 不要自行加入第二個 active goal
3. 不要把 mock 金流做成看似真實付款
4. 不要新增排行榜、社群、提醒、商城等功能
5. 不要把寵物詳情擴成獨立子產品
6. 不要引入未經批准的大型狀態管理庫或圖表庫
7. 不要把 prototype 的 client guard 誤包裝成正式安全機制

## implementation plan 要先拍板的技術決策

1. 表單實作採原生 React state 或表單庫
2. 圖表採自製 SVG / CSS 還是輕量套件
3. Demo preset 入口形式：

   * query param
   * dev panel
   * preview only switch
4. localStorage schema versioning
5. mock failure / timeout 開關的暴露方式
6. 寵物圖像資產策略：

   * `public/` 靜態檔
   * placeholder 圖示
7. package manager 與 test runner 選型

## testing plan 必須優先覆蓋

1. 先押金後設目標的主流程
2. 一次只允許一個進行中目標
3. 打卡後狀態、進度、寵物同步更新
4. 完成後押金返還與寵物解鎖
5. 失敗後押金不返還與重新開始流程
6. 直接進受流程限制頁面的 guard 行為
7. localStorage hydrate / reload 後狀態一致性
8. 空狀態、資料缺漏、timeout、mock failure
9. Mobile first 首屏 CTA 與長列表不破版
10. completed / failed 目標不可再打卡
