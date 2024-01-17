import ReactMarquee from 'react-fast-marquee'
import {
	IMarqueeData,
	IMarqueeConfigs,
} from '@nx-next-app/components/D0001/marquee/type'

interface IMarqueeProps {
	data: IMarqueeData[] | null
	onMarqueeClick: () => void
	configs?: IMarqueeConfigs
}

const Marquee = ({ data, configs, onMarqueeClick }: IMarqueeProps) => {
	const defaultConfig = {
		direction: 'left' as const,
		pauseOnHover: true,
		speed: 50,
		...configs,
	}
	return (
		<div id='Marquee'>
			<div className='marquee-box'>
				<div className='marquee-run' style={{ width: '100%', left: -200 }}>
					<ReactMarquee {...defaultConfig}>
						{data?.map(({ id, subject }) => (
							<button
								className='white'
								key={`announcement-${id}`}
								style={{ paddingLeft: '2rem' }}
								onClick={onMarqueeClick}
							>
								{subject}
							</button>
						))}
					</ReactMarquee>
				</div>
			</div>
		</div>
	)
}

export { Marquee }
