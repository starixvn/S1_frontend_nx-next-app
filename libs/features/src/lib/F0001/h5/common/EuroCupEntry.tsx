import process from 'process'
import React, { useState } from 'react'
import { paths } from '@nx-next-app/constants'
import { isEventPeriod } from '@nx-next-app/utils'
import { Img } from '@nx-next-app/components/D0001'
import { useRouter } from 'next/router'
import { EUROPE_EVENT_PERIOD } from '@nx-next-app/site/nova88'

const EuropeCupEntry = () => {
	const [display, setDisplay] = useState(true)
	const { push } = useRouter()
	if (!display || !isEventPeriod(EUROPE_EVENT_PERIOD)) return null

	return (
		<div className='eventLink eurocup'>
			<a>
				<button className='icon icon-close' onClick={() => setDisplay(false)} />
				<Img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/event/eurocup/eventlink.gif`}
					alt='eurocup-entry'
					onClick={() => push(paths.europeCup.root)}
				/>
			</a>
		</div>
	)
}

export default EuropeCupEntry
