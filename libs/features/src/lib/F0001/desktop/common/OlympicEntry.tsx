import process from 'process'
import React, { useState } from 'react'
import { paths } from '@nx-next-app/constants'
import { isEventPeriod } from '@nx-next-app/utils'
import { Img } from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { EVENT_PERIOD } from '@nx-next-app/site/nova88'

const OlympicEntry = () => {
	const [display, setDisplay] = useState(true)
	const { push } = useRouter()
	if (!display || !isEventPeriod(EVENT_PERIOD.OLYMPIC)) return null

	return (
		<div className='eventLink olympic'>
			<a>
				<button className='icon icon-close' onClick={() => setDisplay(false)} />
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/olympic/eventlink-paris.gif`}
					alt='olympic-entry'
					onClick={() => push(paths.olympic.root)}
				/>
			</a>
		</div>
	)
}

export default OlympicEntry
