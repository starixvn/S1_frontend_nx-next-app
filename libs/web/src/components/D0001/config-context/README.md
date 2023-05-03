### Global Modal Setting

將 GlobalModal 配置在 Layout

```tsx
export function Layout({ children }: ILayoutProps) {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	const { auth } = useAuth()
	const { globalModal, resetModal, modal } = useGlobalModal()

	return (
		<>
			<Header>...</Header>

			{children}

			{/* 只需放在 Layout 來渲染全域彈窗 */}
			<GlobalModal {...globalModal} resetModal={resetModal} />

			<Footer />
		</>
	)
}

export default Layout
```
