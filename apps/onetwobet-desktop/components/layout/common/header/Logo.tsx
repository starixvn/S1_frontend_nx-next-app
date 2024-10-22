import { paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import Link from 'next/link'

const Logo = () => {
	const { getBannerUrl } = useGlobalData()
	return (
		<div className='logo'>
			<Link href={paths.home.root}>
				<img
					style={{ cursor: 'pointer' }}
					src={getBannerUrl('/desktop/img/12bet-logo.png')}
					alt='12Bet Logo'
				/>
			</Link>
			<Link href={paths.rewards.root}>
				<img
					style={{ cursor: 'pointer' }}
					src={getBannerUrl('/desktop/img/12reward-logo.png')}
					alt='rewards Logo'
				/>
			</Link>
		</div>
	)
}

export default Logo
