import { paths } from '@nx-next-app/constants'
import { useHeaderLogo } from '@nx-next-app/hooks'
import classNames from 'classnames'
import Link from 'next/link'

interface ILogoProps {
	rewardsUrl: string
}

const Logo = ({ rewardsUrl }: ILogoProps) => {
	const { logoUrl, showSpLogo } = useHeaderLogo({
		mainLogoUrl: {
			original: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo_w.png`,
			special: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo-mid.png`,
		},
	})

	// TODO: 沒有贊助球隊時可能會有暫時沒有spLogo的情況，這時主Logo要改用沒有右邊分隔線的圖
	const noSpLogoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo_w_noline.png`

	return (
		<div className={classNames('logo')}>
			<Link href={paths.home.root} style={{ cursor: 'pointer' }}>
				<a>
					<img src={showSpLogo ? logoUrl : noSpLogoUrl} alt='logo' />
				</a>
			</Link>

			{process.env['NEXT_PUBLIC_SHOW_REWARD'] === 'true' && (
				<Link href='/rewards' className='logo' passHref>
					<a target='_blank' rel='noopener noreferrer' className='rewardsLogo'>
						<img src={rewardsUrl} alt='88reward' />
					</a>
				</Link>
			)}
		</div>
	)
}

export default Logo
