import { paths } from '@nx-next-app/constants'
import { WrapperErrorPage } from '@nx-next-app/features/F0001/desktop/promotion/styles'
import { useRouter } from 'next/router'
import { useLayoutEffect } from 'react'
export default function Page404() {
	const { push } = useRouter()
	useLayoutEffect(() => {
		push(paths.home.root)
	}, [])
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
				</div>
			</div>
		</WrapperErrorPage>
	)
}
