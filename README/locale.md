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

### 新增幣別流程

* 前端先處理部分

1. 新增 middleware 的 currencyId

```ts
export const LANG_TO_CURRENCY: { [key: string]: number } = {
	en: 2,
	cs: 2,
	my: 2,
	th: 4,
	id: 15,
	ko: 45,
	hi: 61,
	kh: 72,
	bd: 74,
	vn: 51,
	br: 82,
}
```
2. 新增 next-18n.config

```ts
module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'my', 'bd', 'id', 'kh', 'hi', 'vn'],
		locales: [
			'default',
			'en',
			'cs',
			'th',
			'my',
			'bd',
			'id',
			'kh',
			'hi',
			'vn',
			'ko',
			'br',
		],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'en',
	},
	reloadOnPrerender: isDevelopment,
}
```

3. 在 web types 資料夾中 CurrenciesEnum 新增 Enum CurrencyId 定義檔(key 需根據各國貨幣名去定義，看 PM 給什麼，[參考](https://www.cbc.gov.tw/public/Attachment/992115253671.pdf))

```ts
export enum CurrenciesEnum {
	MYR = 2,
	USD = 3,
	THB = 4,
	CNY = 13,
	IDR = 15,
	VND = 51,
	KRW = 45,
	INR = 61,
	KHM = 72,
	BDT = 74,
	BRL = 82,
	USDT = 96,
}
```

4. 在 web data 資料夾中根據 [Excel](https://docs.google.com/spreadsheets/d/18BIM1lIAWt8WSXjlzyvuzUONopxrNsbAdTXXn1pUU0M/edit#gid=947481786) 加上對應的幣別 (註：在 Header Menu ms-3817 上線後可以考慮把遊戲顯示幣別移除，但有可能會有靜態遊戲需要顯示對應的幣別，所以建議可保留)

```ts
export const ALLOWED_CURRENCIES: IStaticAllowedCurrencies = {
  VIP: [MYR, THB, IDR, VND, KRW, BRL],
  AFFILIATE: [MYR, THB, IDR, CNY, BDT, USD, INR, VND, KHM],
}
```
5. 註冊頁檢查：在 web areaCode 找對應的國際電話區號加到 constants currency，並補上電話號碼長度限制( 電話號碼長度限制需先尋問後端PM )，和電話長度的正規，最後檢查 RealName 是否可以正確輸入

```ts
export const AREA_CODE_BY_CURRENCY: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: '+60',
	[CurrenciesEnum.THB]: '+66',
	[CurrenciesEnum.IDR]: '+62',
	[CurrenciesEnum.INR]: '+91',
	[CurrenciesEnum.BDT]: '+880',
	[CurrenciesEnum.CNY]: '+86',
	[CurrenciesEnum.USD]: '',
	[CurrenciesEnum.KHM]: '+855',
	[CurrenciesEnum.VND]: '+84',
	[CurrenciesEnum.KRW]: '+82',
	[CurrenciesEnum.BRL]: '+55',
}

export const PHONE_DIGITS_LIMIT: { [key: string]: string } = {
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.MYR]]: '9-10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.THB]]: '9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.IDR]]: '10-13',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.INR]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.BDT]]: '10-11',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.CNY]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.KHM]]: '8-9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.VND]]: '9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.KRW]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.BRL]]: '9',
}

export const PHONE_LENGTH_REGEX =
	/^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{10}$|\+855[0-9]{8,9}$|\+84[0-9]{9}$/
	/^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{10}$|\+855[0-9]{8,9}$|\+84[0-9]{9}$|\+82[0-9]{10}$|\+55[0-9]{9}/

export const REALNAME_REGEX =
	/^[\p{L}. \p{Script=Han}\p{Script=Hangul}\p{Script=Thai}\p{Script=Bengali}\p{Script=Devanagari}\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Khmer}\p{Script=Hiragana}\p{Script=Katakana}]+$/u

```
6. 補上相關 mapping 對應檔(constants index.tsx 檔案裡所有相關的部分)

```ts
export const CURRENCY_TO_LANG_KEY: {
	[key: string | number]: string
} = {
	2: 'ch',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	51: 'vn',
	45: 'ko',
	61: 'in',
	72: 'kh',
	74: 'bd',
	82: 'br',
}
```
7. 補相關翻譯 
```
 "Label_General_Currency_45": "KRW"
```
8. footer payment option 定義黨 paymentMethodsByCurrencyId
9. 在 web data index.tsx 補上語系選取下拉單 LANG_GROUPS
```ts
{
	ch: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.MYR,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.MYR,
		},
		{
			displayText: 'Malay',
			value: 'my',
			currencyId: CurrenciesEnum.MYR,
		},
	]
}
```


* 通知 PM 部分

1. 時區

```ts
export const CURRENCY_TO_TIMEZONE: { [key: number]: string } = {
	2: '+08:00',
	4: '+07:00',
	15: '+07:00',
	72: '+07:00',
	74: '+06:00',
	61: '+05:30',
	3: '+00:00',
	13: '+08:00',
	51: '+07:00',
}
```

2. META_DATA 定義檔
```ts
export const META_DATA: IMetaData = {
  [paths.home.root]: {
    en: {
      title: `Nova88 | Nova88 Slot | Nova88 Casino | Nova88 Bet`,
      description: `Nova88 is Most Trusted Sportsbook, Live Casino and Slot Games in Asia. Officially Licensed and Subsidiary of SABA Sports.`,
      keyword: `Asia Most Trusted Sportsbook, Live Casino, Slot Games, SABA Sports, Online Casino, Online Betting`
    }
  }
}
```

3. Join 頁流水 Bonus
```ts
export const FEATURE_BONUS: { [key: number]: string } = {
	[CurrenciesEnum.THB]: '2.0',
	[CurrenciesEnum.MYR]: '2.0',
	[CurrenciesEnum.IDR]: '2.0',
	[CurrenciesEnum.INR]: '1.8',
	[CurrenciesEnum.BDT]: '1.8',
	[CurrenciesEnum.CNY]: '1.8',
	[CurrenciesEnum.USD]: '1.8',
	[CurrenciesEnum.KHM]: '1.8',
}
```
4. Live Chat 是否支援
```ts
export const LIVE_CHAT_ID_BY_LANG_ID: {
	[langId: string]: number
} = {
	en: 1,
	id: 2,
	cs: 3,
	th: 4,
	hi: 8,
}
```

5. 跟 PM 確認是否需補 maintenance 頁
```ts
// maintain 專用的對應表
const CURRENCY_TO_LANG_KEY: { [key: number]: string } = {
	2: 'en',
	3: 'gb',
	4: 'th',
	13: 'cs',
	15: 'id',
	61: 'hi',
	72: 'kh',
	74: 'bd',
}
```
10. 在 public 檔案裡 請市場補 underMaintenance block ip 翻譯
```
<ul>
    <li>Dear Valued Customers,</li>
    <li>
      to present a better experience for valued players,system is
      performing an upgrade.
    </li>
    <li>Hence, it is inaccessible as for the moment.</li>
    <li>
      Kindly bear with us, we will back on track as soon as maintenance is
      complete later.
    </li>
    <li>Your kindest patience and utmost understanding is appreciate.</li>
  </ul>
```
```
  <div class="title">Shoot !</div>
  <div class="stitle">Well,  It is unexpected....</div>
```

* 通知設計部分

1. 下拉選單國旗樣式
```ts
export const FLAG_PREFIX_ICON_BY_CURRENCIES: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: 'ch',
	[CurrenciesEnum.USD]: 'gb',
	[CurrenciesEnum.THB]: 'th',
	[CurrenciesEnum.CNY]: 'cs',
	[CurrenciesEnum.IDR]: 'id',
	[CurrenciesEnum.INR]: 'in',
	[CurrenciesEnum.KHM]: 'kh',
	[CurrenciesEnum.BDT]: 'bd',
	[CurrenciesEnum.VND]: 'vn',
}
```
2. 靜態檔
```ts
export const TERMS_CONDITIONS = ({ langId }: { langId: string }) => {
	const termsConditions = {
		TermsConditions: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/TermsConditions.html`,
		OurPolicies: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`,
		PrivacyPolicy: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PrivacyPolicy.html`,
		CookiePolicy: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/CookiePolicy.html`,
		RuleRegulations: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/RulesandRegulations.html`,
		AccountTerms: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AccountTerms.html`,
		FAQ: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/FAQ.html`,
		AboutUs: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
		Terms: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`,
		ContactUs: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
		ResposibleGaming: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`,
	}

	return termsConditions
}
```
3. 請設計補 public 檔案裡 block ip 樣式，翻譯通知市場補

```
<div class="text">
    <span>Dear Valued Customers:</span>
    The page that you are trying to access has been
    restricted in this location.We apologize for the
    inconvenience. Please contact customer support
    for more details. Thank you for your utmost understanding.
</div>
```



* 通知後端部分

1. 尋問後端 Country Code 代碼
```ts
// * middleware 使用之資源定義在該位置
const countryCodeMap: {
	[countryCode: string]: {
		currencyId: number
		langId: string
	}
} = {
	TH: { currencyId: CurrenciesEnum.THB, langId: 'th' },
	MY: { currencyId: CurrenciesEnum.MYR, langId: 'my' },
	VN: { currencyId: CurrenciesEnum.VND, langId: 'vn' },
	ID: { currencyId: CurrenciesEnum.IDR, langId: 'id' },
	IN: { currencyId: CurrenciesEnum.INR, langId: 'hi' },
	BDT: { currencyId: CurrenciesEnum.BDT, langId: 'bd' },
	BD: { currencyId: CurrenciesEnum.BDT, langId: 'bd' },
	KH: { currencyId: CurrenciesEnum.KHM, langId: 'kh' },
	CNY_CH: { currencyId: CurrenciesEnum.CNY, langId: 'cs' },
	USD: { currencyId: CurrenciesEnum.USD, langId: 'en' },
	CS: { currencyId: CurrenciesEnum.USD, langId: 'en' },
	TW: { currencyId: CurrenciesEnum.USD, langId: 'en' }, // * TW for 前端部門組員測試用
}
```
