import { useContext } from 'react'
import dynamic from 'next/dynamic'
import { HomeContext } from '../HomeContext'
import { LatestVideo } from './LatestVideo'
import { UpComingMatches } from './upComingMatches'

const DynamicHomeJackPot = dynamic(() => import('./homeJackpot/HomeJackPot'), {
	ssr: false,
})

const index = () => {
	const { latestHighlightVideo } = useContext(HomeContext)

	return (
		<div className='liveVideo'>
			<LatestVideo latestHighlightVideo={latestHighlightVideo} />
			<div>
				<UpComingMatches />
				<DynamicHomeJackPot />
			</div>
		</div>
	)
}

export { index as LatestVideAndEvent }
