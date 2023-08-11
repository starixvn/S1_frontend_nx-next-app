import dynamic from 'next/dynamic'
import { LatestVideo } from './LatestVideo'
import { UpComingMatches } from './upComingMatches'

const DynamicHomeJackPot = dynamic(() => import('./homeJackpot/HomeJackPot'), {
	ssr: false,
})

const index = () => {
	return (
		<div className='liveVideo'>
			<LatestVideo />
			<div>
				<UpComingMatches />
				<DynamicHomeJackPot />
			</div>
		</div>
	)
}

export { index as LatestVideAndEvent }
