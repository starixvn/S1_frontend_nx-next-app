> StaticDataProvider 存放靜態資料供全局使用

StaticDataProvider 只存放靜態資料，強制提供，且不需要跟著 `re-render` 更新，因此放在 `_app` 讓每個 app 再開專案時就需強制提供給專案使用

```tsx
const HomePage = ({ originIsSignIn, originCookies, persistSEOData }: IHomePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData}>
					<Home />
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}
```
