import { Img } from '@nx-next-app/components/D0001'
import { EVENT_PERIOD, paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

const OlympicEntry = () => {
	const [display, setDisplay] = useState(true)
	const { getBannerUrl } = useGlobalData()
	const { push } = useRouter()
	if (!display || !isEventPeriod(EVENT_PERIOD.OLYMPIC)) return null

	return (
		<div className='eventLink olympic'>
			<a>
				<button className='icon icon-close' onClick={() => setDisplay(false)} />
				<Img
					src={getBannerUrl('/h5/img/event/olympic/eventlink-paris.gif')}
					alt='olympic-entry'
					onClick={() => push(paths.olympic.root)}
				/>
			</a>
		</div>
	)
}

export default OlympicEntry
