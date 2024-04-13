import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'

const AppDownload = () => {
	const {
		userInfo: { langId },
	} = useAuth()
	return (
        <Link href={paths.appDownload.root} legacyBehavior>
			<img
				className='spokesperson'
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/appdownload-${langId}.jpg`}
				alt='Go To Download App'
			/>
		</Link>
    );
}

export { AppDownload }
