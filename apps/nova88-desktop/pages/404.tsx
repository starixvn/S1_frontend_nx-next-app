import { WrapperErrorPage } from '@nx-next-app/features/F0001/desktop/promotion/styles'

export default function Page404() {
	return (
		<WrapperErrorPage>
			<div className='page-error page-error-404'>
				<div className='page-error-group'>
					<div className='page-error-img'>
						<div className='logo-page'>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/logo_w.webp`}
								alt=''
							/>
						</div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/error-404.webp`}
							alt=''
						/>
					</div>
					{/* <div className='page-error-box'>
						<div className='page-error-box-title'>404</div>
						<div className='page-error-box-content'>
							Dear Valued Customers, To present a better experience for valued
							players, system is performing an upgrade. Hence, it is
							inaccessible as for the moment. Kindly bear with us, we will back
							on track as soon as maintenance is complete later. Your kindest
							patience and utmost understanding is appreciate.
						</div>
						<div className='hour'>24/7 Customer Support</div>
					</div> */}
				</div>
			</div>
		</WrapperErrorPage>
	)
}
