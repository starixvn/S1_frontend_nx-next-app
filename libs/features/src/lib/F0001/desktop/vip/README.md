1. 在 getServerSideProps 寫條件 「只允許特地幣別進入頁面」

```tsx
// VipPage getServerSideProps
const currencyId = initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]

if (!includes([CurrenciesEnum.MYR, CurrenciesEnum.IDR, CurrenciesEnum.THB], Number(currencyId))) {
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}
```
