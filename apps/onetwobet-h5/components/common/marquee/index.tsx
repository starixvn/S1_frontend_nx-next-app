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
		speed: 50,
		className: 'marquee-run',
		style: { zIndex: 0 },
	}

	return (
		<ReactMarquee {...defaultConfig} {...configs}>
			{data?.map(({ id, subject }) => (
				<button
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
