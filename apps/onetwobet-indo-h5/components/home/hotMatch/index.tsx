import { Carousel } from '@12b-indo-h5/components/common'
import { useAuth } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { ReactIdSwiperProps } from 'react-id-swiper'
import HotMatchItem from './HotMatchItem'

const HotMatch = () => {
	const { t } = useTranslation()
	const { hotEventData } = useHome()
	const {
		userInfo: { currencyId },
	} = useAuth()
	const config: ReactIdSwiperProps = {
		slidesPerView: 1.05,
		spaceBetween: 10,
		shouldSwiperUpdate: true,
		loop: false,
		centeredSlides: false,
		autoplay: false,
		pagination: false,
		navigation: false,
		containerClass: 'hotmatch-swiper-container',
	}

	return (
		<div
			className={classNames(
				'home-hotmatch',
				{
					bd: currencyId === CurrenciesEnum.BDT,
				},
				{
					id: currencyId === CurrenciesEnum.IDR,
				}
			)}
		>
			<div className='home-hotmatch-wrapper'>
				<div className='top'>
					<div>{t('Label_General_Sports').toUpperCase()}</div>
				</div>
			</div>
			<div className='home-hotmatch-swiper'>
				<Carousel {...config}>
					{hotEventData?.map(eventData => (
						<HotMatchItem
							key={`${eventData.sportLeaguesTitle}-${eventData.matchId}`}
							data={eventData}
						/>
					))}
				</Carousel>
			</div>
		</div>
	)
}

export default HotMatch
