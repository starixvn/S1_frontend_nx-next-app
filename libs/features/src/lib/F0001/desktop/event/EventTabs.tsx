import { useRetentionEvents } from '@nx-next-app/hooks'
import { useRouter } from 'next/router'

export const EventTabs = () => {
	const { events } = useRetentionEvents()
	const { pathname, push } = useRouter()

	return events.length > 1 ? (
		<div className='eventpage-tap' style={{ zIndex: 1 }}>
			{events.map(({ name, path }) => (
				<button
					key={path}
					onClick={() => push(path)}
					className={path === pathname ? 'active' : ''}
				>
					{name}
				</button>
			))}
		</div>
	) : null
}
