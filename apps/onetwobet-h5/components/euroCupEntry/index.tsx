import { Img } from '@12b-h5/components/common'
import { EVENT_PERIOD, paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { isEventPeriod } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

const EuropeCupEntry = () => {
	const [display, setDisplay] = useState<boolean>(true)
	const { getBannerUrl } = useGlobalData()
	const { push } = useRouter()
	if (!display || !isEventPeriod(EVENT_PERIOD.EUROPE_CUP)) return null

	return (
		<div className='eventLink eurocup'>
			<a>
				<button className='icon icon-close' onClick={() => setDisplay(false)} />
				<Img
					src={getBannerUrl('/h5/img/event/eurocup/eventlink.gif')}
					alt='eurocup-entry'
					onClick={() => push(paths.europeCup.root)}
				/>
			</a>
		</div>
	)
}

export default EuropeCupEntry
