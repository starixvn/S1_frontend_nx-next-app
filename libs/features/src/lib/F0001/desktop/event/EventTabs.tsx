import { useRouter } from 'next/router'
import { useRetentionEvents } from '@nx-next-app/hooks'

export const EventTabs = () => {
	const { events } = useRetentionEvents()
	const { pathname, push } = useRouter()
	return events.length > 1 ? (
		<div className='eventpage-tap' style={{ zIndex: 1 }}>
			{events.map(({ name, path, underMaintenance }) => (
				<button
					key={path}
					onClick={() => push(path)}
					className={`${path === pathname ? 'active' : ''}
					${underMaintenance === true ? 'disabled' : ''} `}
					disabled={underMaintenance}
				>
					{name}
				</button>
			))}
		</div>
	) : null
}
