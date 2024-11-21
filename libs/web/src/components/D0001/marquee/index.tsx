import { HomeMarquee } from "@nx-next-app/components/D0001/marquee/styles";
import { IMarqueeConfigs, IMarqueeData } from "@nx-next-app/components/D0001/marquee/type";
import { openLiveChat } from "@nx-next-app/utils";
import { useTranslation } from "next-i18next";
import ReactMarquee from "react-fast-marquee";

interface IMarqueeProps {
	data: IMarqueeData[] | null
	onMarqueeClick: () => void
	configs?: IMarqueeConfigs
}

const Marquee = ({ data, configs, onMarqueeClick }: IMarqueeProps) => {
	const { t } = useTranslation()
	const defaultConfig = {
		direction: 'left' as const,
		pauseOnHover: true,
		speed: 50,
		gradient: false,
		...configs,
	}

	return (
		<HomeMarquee>
			<div className='marquee' id='Marquee'>
				<div className='marquee-box'>
					<div className='marquee-run' style={{ width: '100%' }}>
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
			<button className='live-chat' onClick={openLiveChat}>
				<span className='icon icon-chat-smile-fill' />
				{t('Label_General_LiveChat')}
			</button>
		</HomeMarquee>
	)
}

export { Marquee }
