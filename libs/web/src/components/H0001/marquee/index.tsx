import { IMarqueeConfigs, IMarqueeData } from "@nx-next-app/components/D0001/marquee/type";
import { HomeMarquee } from "@nx-next-app/components/H0001/marquee/styles";
import ReactMarquee from "react-fast-marquee";

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
		className: 'marquee-run',
		style: { zIndex: 0 },
		...configs,
	}
	return (
		<HomeMarquee id='Marquee'>
			<div className='marquee-box'>
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
		</HomeMarquee>
	)
}

export { Marquee }
