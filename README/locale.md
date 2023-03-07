## Locale 設定 

因應 SSR，Locale 需有兩種初始化手段，分別為 Client side / Server Side 

### Client Side 

`useInitLocaleEffect` usage : 

```tsx
// _app.tsx
const router = useRouter()
const { initLocale } = useInitLocaleEffect()

useEffect(() => {
  // 到 client side 才做
  if (window !== undefined) {
    // 傳入當前 router , 與 site default locale
    initLocale(router, 'en')
  }}, [])
```

統一寫在 `_app.tsx`，在 client side 進行初始化，主要處理 localStorage 儲存的語系資料，以及給予 locale default 值。


### Server Side 

需寫 middleware 在 serverside 時就根據 cookie 導轉 (未開發)
