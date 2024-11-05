import { IMarqueeConfigs, IMarqueeData } from '@nx-next-app/types'
import ReactMarquee from 'react-fast-marquee'

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
		gradient: false,
	}

	return (
		<ReactMarquee {...defaultConfig} {...configs}>
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
	)
}

export default Marquee
