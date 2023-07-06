## Affiliate

- AffId 是 Referral 用的
- AffCode 是代理用的

### 邏輯

1. Url 或 cookie 有 AffId > 用 api/Site/GetAffiliateAgent 檢查

   - 合格：帶進輸入框並使輸入框唯讀，註冊時打 api 帶入參數 AffId
   - 不合格：不帶進輸入框（之前是不管有沒有合格都會帶進輸入框裡），註冊時打 api 也不會帶入參數
     ‌

2. Url 或 cookie 有 AffCode > 使用新做的 api/Site/AffiliateCheck/{langId} 檢查

   - 合格：帶進輸入框並使輸入框唯讀，註冊時打 api 帶入參數 AffCode
   - 不合格：就不帶輸入框裡，註冊時打 api 也不會帶入參數
     ‌

3. 使用者自己填寫輸入框 > 使用新做的 api/Site/AffiliateCheck 檢查
   - 合格：註冊時打 api 帶入參數 AffCode
   - 不合格：顯示警告文字，無法點擊 Submit 直到使用者輸入正確 affCode 或是清空輸入框
     ‌

### 測試資料

`api/Site/AffiliateCheck` 測試合格 AffCode

- Nova88: 10170
- Goal123: 99769
- Bwing: 74601
