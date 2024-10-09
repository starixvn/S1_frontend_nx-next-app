import { useState } from 'react'
import { FiMinimize2 } from 'react-icons/fi'
import { ImTv } from 'react-icons/im'
import { MdDragIndicator } from 'react-icons/md'
import { Rnd } from 'react-rnd'

const DragContainer = () => {
	const [isHidden, setIsHidden] = useState(false)
	const [size, setSize] = useState({ width: 560, height: 315 })
	const [position, setPosition] = useState({
		x: window.innerWidth - 560 - 20,
		y: window.innerHeight - 315 - 20,
	})

	if (isHidden) {
		return (
			<div
				onClick={() => setIsHidden(false)}
				style={{
					position: 'fixed',
					bottom: '15px',
					right: '100px',
					width: '60px',
					height: '60px',
					background: 'teal',
					borderRadius: '50%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					zIndex: 1000,
					color: '#fff',
					fontSize: '30px',
				}}
			>
				<ImTv />
			</div>
		)
	}

	return (
		<Rnd
			size={size}
			minWidth={220}
			minHeight={50}
			bounds='window'
			position={position}
			onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
			onResizeStop={(e, direction, ref, delta, position) => {
				setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
				setPosition(position)
			}}
			dragHandleClassName='drag-handle'
			enableUserSelectHack={false}
			style={{
				zIndex: 10001,
				border: '1px solid #ccc',
				background: '#fff',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
				borderRadius: '8px',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				position: 'fixed',
			}}
		>
			<div
				className='drag-handle'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '5px 10px',
					cursor: 'move',
				}}
			>
				<button style={{ pointerEvents: 'none' }}>
					<MdDragIndicator style={{ marginRight: '8px' }} />
				</button>
				<button
					onClick={() => setIsHidden(true)}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						fontSize: '16px',
						color: '#333',
					}}
				>
					<FiMinimize2 />
				</button>
			</div>
			<div style={{ flex: 1 }}>
				<iframe
					src='https://player.twitch.tv/?channel=muse_tw&parent=localhost'
					title='twitch'
					height='100%'
					width='100%'
					allowFullScreen
					style={{ border: 'none' }}
				/>
			</div>
		</Rnd>
	)
}

export default DragContainer
