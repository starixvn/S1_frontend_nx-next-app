> GlobalDataProvider 存放來自 api 的 global data

GlobalDataProvider 因需享有 AuthProvider 的業務邏輯，以及需要 fetch api ，因此需放置在每個 page 的 `AuthProvider` 之中

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
