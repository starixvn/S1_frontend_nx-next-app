import { useRetentionEvents } from '@nx-next-app/hooks'
import { find } from 'lodash-es'
import { useRouter } from 'next/router'
import { useState } from 'react'

const RetentionEntry = () => {
	const { push } = useRouter()
	const { events } = useRetentionEvents()
	const [isVisible, setIsVisible] = useState(true)

	const event = find(events, ({ underMaintenance }) => !underMaintenance)

	return isVisible && event ? (
		<div className='eventLink'>
			<button
				type='button'
				aria-label='event-link'
				className='icon icon-close'
				onClick={() => setIsVisible(false)}
			/>
			<div
				onClick={() => push(event.path)}
				className='wheelModule'
				style={{ cursor: 'pointer' }}
			>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/event/retention/eventlink.webp`}
					alt='home-chest'
				/>
			</div>
		</div>
	) : null
}

export default RetentionEntry
