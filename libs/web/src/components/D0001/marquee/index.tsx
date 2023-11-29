import ReactMarquee from 'react-fast-marquee'
import {
	IMarqueeData,
	IMarqueeConfigs,
} from '@nx-next-app/components/D0001/marquee/type'
import { openLiveChat } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'

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
		<div className='home-marquee'>
			<div id='Marquee'>
				<div className='marquee-box'>
					<div className='marquee-run'>
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
			<button className='livechat-btn' onClick={openLiveChat}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/livechat.png`}
					alt=''
				/>
				{t('Label_General_LiveChat')}
			</button>
		</div>
	)
}

export { Marquee }
