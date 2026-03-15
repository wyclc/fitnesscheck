# 專案實作計畫：運動押金養成 App (Prototype)

## 1. 文件資訊
- **文件名稱**：運動押金養成 App 實作計畫 (Implementation Plan)
- **版本**：v1.0
- **狀態**：Approved for Execution
- **最後更新日期**：2026/03/14
- **來源文件**：`spot.md`、`prd.md`、`spec.md`

## 2. 專案摘要
- **專案目標**：打造「押金機制 + 養成寵物」運動習慣養成 App 前端 Demo，以驗證押金承諾感及寵物養成對持續運動的幫助。
- **專案性質**：Mobile First App Prototype (前端 Demo)，無後端，全數使用 Mock Data。
- **核心交付物**：可完整操作的 Web App 端 Demo (Next.js App Router)，包含押金、目標設定、打卡、結果與寵物收藏流程，並部署於 Vercel。
- **五週後預期成果**：第五週結束時，得到一個部署在 Vercel 上的 Production-ready Demo，能夠流暢展示核心體驗（包含完整的 edge cases 與防呆提示），並可供內部或外部利害關係人直接操作體驗。

## 3. 實作策略總覽
- **為什麼這樣排順序**：採取「以核心流程為骨幹，以假亂真為血肉」的策略。先打通基礎建設與主流程骨幹（Deposit -> Goal -> Check-in），之後再補上分支與視覺細節（History, Charts, Pet Animations）。最後一週全力 QA 與 Demo Hardening。
- **哪些先做**：Next.js App Router + Tailwind 基礎建置、Vercel CI/CD 串接、Mock Data 結構與前端狀態機制建立（LocalStorage / Context）。
- **哪些後做**：歷史紀錄、身體數值變化圖表、錯誤邊界等防呆體驗。
- **哪些可以並行**：UI/UX 設計定稿可與 Week 1/2 的架構建置與 Mock Data 模型綁定並行。
- **哪些不能太早做**：過度複雜的寵物動效細節，需等基本資料綁定與狀態切換邏輯無誤後再進行。
- **哪些地方要先做技術驗證**：前端 LocalStorage 作為 Demo Session 路由保護（Route Guard）的流暢度與 Hydration 問題。

## 4. Workstreams
- **Product / PM alignment**
  - **目標**：確保工程落實涵蓋 PRD 所列狀態與條件。
  - **依賴**：無。
- **Design / UI finalization**
  - **目標**：產出 Mobile First 畫面設計圖、寵物圖庫。
  - **依賴**：需於 Week 2 釋出核心操作畫面供前端佈局。
- **Frontend architecture**
  - **目標**：Next.js App Router 架構劃分、Server/Client 元件邊界定義、Mock Repository 介面設計。
  - **依賴**：Week 1 優先執行。
- **Route & navigation**
  - **目標**：建立各路由骨架、導入 Route Groups 分區。
- **Mock data / state**
  - **目標**：建構 `localStorage` demo session 與 JSON seed data 介面。
- **Auth / guard demo flow**
  - **目標**：基於 session 實作 Client-side Route Guard 攔截流程異常操作。
- **Core page implementation**
  - **目標**：歡迎 > 押金 > 目標 > 打卡 > 進度 > 收藏，完整落實。
- **QA / test readiness**
  - **目標**：擬定 Demo readiness checklist 與邊界用例。
- **GitHub / Vercel / CI/CD setup**
  - **目標**：確保 `main` 作為 Vercel Production，並開啟 Preview Deploy 功能以利多版本預覽。
- **Demo hardening**
  - **目標**：強化 Prototype 在預期外操作的恢復力（例如提供 Reset 按鈕）。

## 5. 五週總覽
- **Week 1**：建置 CI/CD 管道、基礎專案結構架設、Mock 規格套用與靜態導覽首頁。
- **Week 2**：核心防線（Route Guard）與「押金選定 -> 解鎖 -> 建立目標」主流程。
- **Week 3**：打卡推進里程碑、寵物狀態綁定、核心進度追蹤功能。
- **Week 4**：後續流程與視覺化（結果判定頁面、進度圖表 mock、寵物圖鑑與歷史）。
- **Week 5**：Demo Hardening 封版、全端 QA 與展示前打磨。

## 6. Detailed Weekly Plan

### Week 1：基礎建設與主架構搭建
- **本週目標**：完成開發環境、Vercel 自動化部署管道，產出核心 Mock 資料存取層與靜態 Layout 殼層。
- **本週核心產出**：Vercel 首版部署連結、Mock Repository。
- **主要工作項目**：
  1. 初始化 Next.js (App Router, TS, Tailwind CSS)。
  2. 建立 GitHub Repo 並連接 Vercel，設定 `main` 為 Production 及 Preview Environments。
  3. 實作 `mocks/` 與 `lib/mock-repository/`，產生 20 筆押金/目標種子假資料。
  4. 建立基礎 Layout 與 `/welcome`, `/` 靜態架構。
- **任務拆解與目的**：
  - 盡早部署以確認 Vercel 環境參數均正確無誤。
  - Mock 層建置讓 UI 開發不再依賴真後端。
- **依賴與並行**：架構建置優先，Mock 資料處理可由另一人並行。
- **本週交付物**：能上線至 Vercel 展示基礎 /welcome 頁。
- **本週驗收方式**：推播代碼至 `main` 需自動過建置並發布新版，Mock 模組可回傳正確型別假資料。
- **風險與注意事項**：確實遵守 Spec 建立 `app/(marketing)` 與 `app/(app)` 的 Route Groups，分清 Server / Client 原則。

### Week 2：核心流程一 (押金與目標建立)
- **本週目標**：完成從設定押金到成功建立第一筆目標的核心流轉。
- **本週核心產出**：`/deposit`, `/deposit/success`, `/goal/new` 與首頁狀態連動。
- **主要工作項目**：
  1. 實作 `lib/demo-session` LocalStorage 機制。
  2. 定義 Client-side Route Guard 以限縮非法操作 (如未押金導回 deposit)。
  3. 實作押金選擇及繳交模擬成功頁。
  4. 實作目標設定表單 (`/goal/new`) 與 Client-side 欄位驗證。
- **任務拆解與目的**：確實鎖定「先押金、後設定目標」的強制順序。
- **依賴與並行**：依賴 Week 1 Mock 資料架構。Route Guard 依賴 Session。
- **本週交付物**：押金/目標核心畫面的可操作雛形。
- **本週驗收方式**：能於瀏覽器選押金 -> 看見確認成功 -> 跳轉目標表單送出，完成後首頁狀態成功切換。
- **風險與注意事項**：Next.js Hydration 問題，確保 localStorage 在 Client-side 掛載後才觸發讀取，避免 Server-Hydrate mismatch。

### Week 3：核心流程二 (打卡與狀態流轉)
- **本週目標**：讓使用者開始與進行中的目標互動，打卡並看見寵物變化。
- **本週核心產出**：首頁動態 (HomeStatePanel)、`/goal/[goalId]` 目標詳情與打卡邏輯。
- **主要工作項目**：
  1. 首頁渲染對應的「進行中」進度與快捷選項。
  2. 實作 `/goal/[goalId]` 目標詳情頁及「打卡執行」動作。
  3. 將打卡累計次數對應至寵物生長階段 (Pet Growth Mapping)。
  4. 模擬判斷「達標 (Completed)」或「未達標屆期 (Failed)」邏輯。
- **任務拆解與目的**：落實產品最關鍵的遊戲化養成體驗與操作回饋。
- **依賴與並行**：需繼承 Week 2 的目標資料。
- **本週交付物**：多次點擊打卡後，能看見畫面進度條與寵物階段變化。
- **本週驗收方式**：首頁進入目標 -> 打卡 -> 回首頁，打卡數值與寵物成長必須雙向同步且持久儲存。
- **風險與注意事項**：嚴密防範「連點打卡」導致狀態被多次推進的錯誤，並留意最後一次打卡成功如何切換為結果轉向。

### Week 4：結果回饋與外圍功能 (歷史、進度與圖鑑)
- **本週目標**：補齊所有達成/失敗的結果提示與視覺化周邊模組。
- **本週核心產出**：`/result/[goalId]`, `/pets`, `/history`, `/progress`。
- **主要工作項目**：
  1. 實作任務結果頁面 (分「成功返還與新獲寵物」與「失敗沒收」)。
  2. 實作 `/pets` 寵物圖鑑頁，能區分獲得與未獲得的格狀占位。
  3. 實作 `/history` 歷史目標及押金歷程。
  4. 實作 `/progress` 顯示身體變化卡與靜態模擬圖表。
- **任務拆解與目的**：提供持續追蹤的外部動機，達成業務閉環。
- **依賴與並行**：這四個頁面可由不同前端高度並行開發，僅共用狀態層。
- **本週交付物**：所有周邊視圖頁面建置完成，無死胡同連結。
- **本週驗收方式**：成功目標導向完成結果並將寵物移入「圖鑑」保留；失敗結果顯示錯誤。所有歷史皆有紀錄。
- **風險與注意事項**：趨勢圖表庫若造成 Client bundle 太大，應找純輕量解決方案或用純 CSS Mock，重點在「傳達變化」而非「精確繪圖」。

### Week 5：Demo Hardening 與發布準備
- **本週目標**：針對展示過程的一切細節打磨，確保正式操作流暢度。
- **本週核心產出**：可信任的 production-ready Demo、無死角例外處理。
- **主要工作項目**：
  1. 依據 PRD 進行 End-to-End QA，排查 Corner cases。
  2. 補入「Reset Demo」重置按鈕或進入快捷除錯路徑，方便重複展示。
  3. UI Polishing：檢查所有 Mobile First 單欄排版在真機 (iOS Safari) 底端遮擋問題。
  4. GitHub 實施 Branch freeze。
- **任務拆解與目的**：保證 Demo 的最高品質與展示者使用上的絕對安心感。
- **依賴與並行**：所有人進入找 Bug 與修復階段。
- **本週交付物**：修復完畢且穩定發布至 Vercel main 分支。
- **本週驗收方式**：通過下方「Demo Readiness Checklist」。
- **風險與注意事項**：禁止隨意引入新邏輯與架構大修，只以修補影響體驗的問題為主。

## 7. 關鍵技術決策點
- **決策一：前端持久化與路由阻擋方案**
  - **最晚應於：第 1 週拍板。**
  - **若不拍板的後果**：無法區分權限，App 將失去引導順序感，Demo 頻繁跳錯。
  - **建議保守方案**：Next.js Client Components 內搭配單純的 LocalStorage + Context API，不混用過重工具如 Redux 等。
- **決策二：進度頁圖表庫選用 (若需)**
  - **最晚應於：第 3 週拍板。**
  - **若不拍板的後果**：第 4 週的身體數值進度模塊難以展現。
  - **建議保守方案**：使用 Recharts，或者單純使用 Tailwind 高度寫死的進度條與靜態視圖，符合 Demo 等級即可。

## 8. GitHub / Vercel / CI/CD 里程碑
- **Week 1 建立 Repo**：創建專案並連接 Vercel，確保 Vercel 能抓取 Next.js 設定。
- **Week 1 即刻建立 Preview Deploy 規範**：所有 PR 皆觸發 Vercel Preview Deploy 給 PM 以便確認 UI。
- **Week 2 加入最小 CI**：Vercel 建置過程必須包含 ESLint (`next lint`) 與 TSC (`tsc --noEmit`) 檢查，攔截明顯代碼問題。
- **Week 5 Demo Freeze**：停止審核帶有新功能之 PR (Feature freeze)，`main` 分支視為 Demo Production，所有展示均採用此 Vercel url。

## 9. Definition of Done
- **功能層**：PRD 定義範圍皆落實，Mock 的增刪改查邏輯上完好（即便只是存於 LocalStorage）。
- **UI 層**：符合 Mobile First 設計，能在標準智慧手機上正常單欄操作、無破版。
- **路由與互動層**：非預期動線（例如試圖跳過押金設目標）皆會被 Route Guard 正確導回。
- **測試層**：開發者手動經過 E2E 所有情境，含正常打卡、失敗打卡與無紀錄空狀態。
- **部署層**：順利在 Vercel 生效，首頁、打卡邏輯未發生 Server-Client Hydrate Mismatch。
- **Prototype 限制說明**：在全域組件明顯處顯示「本資料/資金為模擬用」的 Demo Banner。

## 10. Demo Readiness Checklist
- **第 5 週 Demo 前必查項目**：
  - [ ] 1. 新使用者（清除 LocalStorage）是否能正確看見 Welcome 及首頁引導？
  - [ ] 2. 選擇押金面額、設定目標是否有防呆驗證及跳轉成功？
  - [ ] 3. 是否能連續流暢打卡推進？寵物圖片與進度條是否正確渲染目前數值？
  - [ ] 4. 完成 / 失敗的結果頁是否清楚表明了押金處理結果與新寵物？
  - [ ] 5. 「寵物收藏頁」與「歷史頁」否正確顯示 Mock 資料關聯？
  - [ ] 6. 點擊「重設 Demo 狀態」後，App 是否無瑕疵地清空資料回到原點？
  - [ ] 7. 真機測試（Safari/Chrome）是否沒碰到下緣 Toolbar 或虛擬鍵盤造成的不可用問題？

## 11. 風險清單與對策
- **PRD / Spec 模糊點**：
  - _風險_：單次打卡對結束條件的判定方式不夠精準。
  - _對策_：於 Week 2 開會確認；若無法定論，預設採最保守作法（總次數達標立即觸發勝利轉向）。
- **技術風險**：
  - _風險_：Next.js App Router 預設 Server-first，但在重度依賴 LocalStorage 時極容易引發 `Text content did not match` 錯誤。
  - _對策_：對所有與 session 有關的元件，均封裝 Client 載入（如使用 `mounted` state 防護），或考慮 `next/dynamic` 關閉 SSR。
- **設計延遲風險**：
  - _風險_：寵物階段圖檔、插圖不及時繳交。
  - _對策_：工程一律先做帶有色塊和字串的佔位符 Placeholder，確保邏輯不中斷。
- **Mock data 與真實資料差距**：
  - _風險_：前端高度耦合特定形狀的 Mock JSON。
  - _對策_：建立 Repository Pattern 隔離存取（如 `lib/mock-repository`）。
- **demo auth / 金流被誤當正式方案**：
  - _風險_：外部觀看者誤會已實作真實金流與安全認證。
  - _對策_：在畫面上、文案上（如「模擬繳交押金」）及 Demo Banner 大量聲明這只是原型。
- **時程壓力**：
  - _風險_：開發不及完成圖表等外圍視圖。
  - _對策_：若 Delay，Week 4 簡化進度歷史頁功能，專注「主流程骨幹」的可用性。

## 12. 執行紀律
- **遵守本計畫**：各工程師請以 Weekly Plan 裡定義的項目創建 issue 並依賴關係開工。
- **什麼情況可偏離**：遭遇到 Vercel 或 Next.js 重大 Bug 或不可抗力，且 PM 同意改變技術解法時。
- **什麼情況不可偏離**：「押金選擇」、「目標前置阻擋」業務規則；「單機無後端」之限制原則不可私自接遠端。
- **偏離時要如何紀錄**：須在此文件新增「修訂軌跡」並調整對應 Week 落點目標，確保隨時有唯一版本的 Single Source of Truth。
