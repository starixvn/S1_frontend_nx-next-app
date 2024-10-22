import { Carousel } from '@12b-h5/components/common'
import { useGlobalData } from '@nx-next-app/data-access'
import { gameProviders } from '@nx-next-app/site/onetwobet'
import { IProvidersDataProps } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import { ReactIdSwiperProps } from 'react-id-swiper'

const ProviderSwiper = () => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()

	const config: ReactIdSwiperProps = {
		slidesPerView: 1,
		loop: false,
		autoplay: false,
		centeredSlides: false,
		spaceBetween: 10,
		navigation: false,
		pagination: false,
	}

	// 一個 slide 固定是9個 provider，這邊用 reduce 處理 array
	const providersData: IProvidersDataProps[][] = gameProviders.reduce(
		(acc, item, index) => {
			const groupIndex = Math.floor(index / 9)
			if (!acc[groupIndex]) acc[groupIndex] = []
			acc[groupIndex].push(item)
			return acc
		},
		[]
	)

	return (
		<div className='providers'>
			<div className='title'>
				{t('Label_General_GameProvider').toUpperCase()}
			</div>
			<div className='content'>
				<div className='providers-swiper'>
					<Carousel {...config}>
						{providersData.map((group, ulIndex) => (
							// eslint-disable-next-line react/no-array-index-key
							<ul className='providers-group' key={`providers-${ulIndex}`}>
								{group.map(({ imgUrl, pathname }) => (
									<li key={imgUrl}>
										<a href={pathname}>
											<img src={getBannerUrl(`/h5/${imgUrl}`)} alt='' />
										</a>
									</li>
								))}
							</ul>
						))}
					</Carousel>
				</div>
			</div>
		</div>
	)
}

export default ProviderSwiper
