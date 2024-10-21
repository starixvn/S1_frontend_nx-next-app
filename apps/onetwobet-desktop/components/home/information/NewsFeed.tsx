import Carousel from '@12b-desktop/components/common/carousel'
import { paths } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/operations'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ReactIdSwiperProps } from 'react-id-swiper'

const NewsFeed = () => {
	const { t } = useTranslation()
	const { newsData = [] } = useHome()

	const config: ReactIdSwiperProps = {
		direction: 'vertical',
		centeredSlides: false,
		loop: newsData.length > 3,
		autoplay: {
			delay: 4000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		spaceBetween: 0,
		slidesPerView: 3,
		allowTouchMove: false,
		rebuildOnUpdate: false,
		pagination: false,
		navigation: false,
	}

	return (
		<div className='home-news'>
			<div className='title'>
				{t('Label_General_News_Feed').toUpperCase()}
				{/*  TODO: 導向 news 頁面 */}
				<Link href={paths.home.root} passHref>
					<a className='see-all'>
						<i className='icon icon-keyboard_arrow_right1' />
						{t('Label_General_SeeMore').toUpperCase()}
					</a>
				</Link>
			</div>
			{newsData.length > 0 && (
				<div className='content'>
					<div className='news-swiper'>
						<Carousel {...config}>
							{newsData.map(({ newsId, title, content }) => (
								<div className='swiper-slide' key={title}>
									<div className='news-list'>
										<Link href={`${paths.newsInfo.root}/${newsId}`} passHref>
											<a className='news-title'>
												<span className='news-tag'>
													{t('Label_General_New')}&nbsp;
												</span>
												{title}
											</a>
										</Link>
										<div className='news-blurb'>{content}</div>
									</div>
								</div>
							))}
						</Carousel>
					</div>
				</div>
			)}
		</div>
	)
}

export default NewsFeed
