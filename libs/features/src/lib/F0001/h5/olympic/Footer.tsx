const Footer = () => {
	return (
		<div className='olympic-footer'>
			<img
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/olympic/footer-decorate.jpg`}
				alt='footer decorate'
			/>
			<div>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/olympic/footer-logo.png`}
					alt='footer logo'
				/>
			</div>
		</div>
	)
}

export default Footer
