const AppLauncherScreen = () => (
	<div
		style={{
			position: 'fixed',
			inset: 0,
			backgroundColor: '#0a1b38',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<img
			src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/logo_w.png`}
			alt='logo'
			style={{ maxWidth: '90%' }}
		/>
	</div>
)

export default AppLauncherScreen
