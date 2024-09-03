## Withdrawal 
此 context 搭配 Desktop / H5 , feat/withdrawal 做使用。

實作所有業務邏輯於此 provider 

### Withdrawal 頁面業務流程 
1. 頁面初始化 => `checkKyc` 、 `checkUserInfo` 與所有基本資料 query。
2. `restoreAll` 會重置所有基礎資料並重新確認 kyc 狀況 
3. `handleInitData` 初始化並重置暫存於前端的資料 
4. 選擇卡片並輸入金額 => `checkAmount` 檢查金額是否合規 
5. 送出金額 => `checkAmount` => 若桌機版未選擇卡片則跳 error 視窗 / 手機版有預設選擇首張卡片的設定，故會出現此錯誤，除非該出金方式不存在任何卡片。
6. 手機版跳出確認彈窗、桌機版則根據狀態跳至確認畫面  => 發送 request
7. 桌機版顯示成功彈窗，手機版直接刷新頁面

備註 : 金額送出成功定義 => errorCode : 0 or 2 都屬成功


### 卡片管理 

1. 桌機版：
   1. Local Bank：刪除 / 新增，邏輯做於 provider 中 
   2. EWallet：刪除 / 新增，邏輯做於 provider 中 
   3. Crypto Wallet：僅新增，介接 CryptoWallet 故有邏輯，另包 CryptoWallet-Context，當前版本 Crypto 不可刪卡
2. 手機版
   1. Local Bank ：直接導轉至 `bankInfo` 頁面 
   2. EWallet : 直接導轉至 `EWallet` 頁面
   3. Crypto : 點擊後開啟新增 Crypto彈窗，介接 CryptoWallet故有邏輯

### Kyc 檢查
Kyc 流程均已在前端定義 enum ，分為 pending、upload 與 normal，上傳圖片後後端會更新狀態，kyc 通過之後將回傳 normal
上傳圖片功能已整合至 `useKycUploader` 內

操作方式：
1. Admin 後台移除該帳號的 kyc 圖片與 isKyc 勾選取消
2. withdrawal 送出成功後若無相片者 api 會回傳 `KycStatusEnum.KycUpload` 此時顯示上傳頁面
3. 上傳相片後 api 會回傳 `KycStatusEnum.KycPending`，此時顯示等待中
4. Kyc 完成後則正常顯示 withdrawal 畫面

裝置顯示方式：
1. 桌機版：根據 status 調整頁面顯示內容 
2. 手機版：根據 status 直接導轉至指定頁面 : kycWaiting , kyc ( 已完成 )

### 元件功能異動 
1. 原手機版的 accountName 欄位直接移除，原因為後面新增的 `checkUserInfo` 檢查會在進入頁面時就檢查到該欄位，並且做導轉設定。
當前版本已不存在新增卡片時沒有 `accountName` 的情境，舊帳號尚未設定者也會在進入 `withdrawal` 時被導轉，故直接移除。



