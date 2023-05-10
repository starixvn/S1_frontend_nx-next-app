## Locale 設定

因應 SSR，Locale 需有兩種初始化手段，分別為 Client side / Server Side，同時又細分成 isLogin 與 !login

底下依照整個 Flow 做完整的流程解說，其中需於專案新增時做設定的地方會特別用 * 加註

主要語系與幣別資料取自於 cookie 與登入後 api 給的 userInfo 內。

### Step1 : Middleware*

在開始 Middleware 之前，先補充 NextJS 在接收到網頁路由後會走過的流程 

NextJS PageFlow : 

`middleware` => `serverSide Functions (getServerSideProps)` => `Client`

如上面的流程所示，所有 request 在進入之後，都會進入 middleware (有的話)，之後才會被送進各頁面獨立的 SSR Function，最後渲染出 HTML 頁面傳送至 client side。

在目前的架構中，我們會在 middleware 處理最基本的 cookie 設定，大多均為 `!login` 狀態，ex : 賦予網站的預設 langId 與 currencyId、根據網址內的 locale 賦予 langId 

#### **需於每個專案手動設定的部分！！！**

因為 middleware 存在於各專案內，必須於新建專案時和 `.env` 一同放置於專案 root 層
(可參考 nova88-desktop 的 middleware)

```ts
// middleware.ts
import type { NextRequest } from 'next/server'
import { siteMiddleware } from '@nx-next-app/utils'
import { LANG_TO_CURRENCY } from './data/langList'

// 於各專案定義預設 lang 與 currencyId 
const config = {
  defaultLocale: 'en',
  defaultCurrency: LANG_TO_CURRENCY['en'],
}

// 命名需為 middleware , 且檔名亦為 middleware.ts
export const middleware = (request: NextRequest) => {
  // 直接 return 寫好的 siteMiddleware function , 傳入 request 與 site config  
  return siteMiddleware({ request, config })
}
```

### Server Side
因 NextJS 要在 ServerSide 做 redirect 需要寫在 SSR function 內，考量到複用性，在每一頁都要寫一次 redirect function 不符合效益

故將 redirect 處理於 client side。

### Client Side

主要邏輯均已寫於 `Country` 與 `AuthContext` 內，無需另外做設定 

1. `useSynchronizeCookiesEffect` 用於處理登入後的 cookie 更新，更新至 userInfo 內的資訊

2. `useInitLocaleEffect` : 用於處理 Client side 所有 redirect 行為：
   1. 未登入時根據Cookie 做正確導轉
   2. 登入後根據 userInfo 內的資訊做正確導轉

3. `Country`，只有 !login 時會在 click 時直接導轉與 setCookie , 登入狀態會透過 `setLanguage` api 異動 userInfo 資料，才根據 userInfo 做相應導轉。
