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
			{/* 為了不要被強制帶語系，所以用一般的<a></a> 而非<Link></Link> */}
			<a href={paths.rewards.root}>
				<img
					style={{ cursor: 'pointer' }}
					src={getBannerUrl('/desktop/img/12reward-logo.png')}
					alt='rewards Logo'
				/>
			</a>
		</div>
	)
}

export default Logo
