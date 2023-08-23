import Link from 'next/link'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import ReactMarquee from 'react-fast-marquee'
import { paths } from '@nx-next-app/constants'
import { isUrl } from '@nx-next-app/utils'
import { useHome } from '@nx-next-app/features/F0001/providers'

const PromotionMarquee = () => {
	const { promotionData, handlePromotionClick } = useHome()
	const { t } = useTranslation()

	return (
		<div className='projpot'>
			<div className='promos'>
				<div className='moduleTitle'>
					{t('Label_General_Promotion')}
					<Link href={paths.promotion.root} passHref>
						<a className='more'>{t('Label_General_SeeMore').toUpperCase()}</a>
					</Link>
				</div>
				{promotionData?.length > 0 && (
					<div className='swiper-container promosSwiper'>
						<ReactMarquee speed={80} pauseOnHover>
							<div className='swiper-container'>
								<div className='swiper-wrapper' style={{ display: 'flex' }}>
									{promotionData.map(
										({ bonusCode, categoryId, tpId, banner, title }) => (
											<div
												key={`promotion.list-${bonusCode}-${categoryId}-${tpId}`}
												style={{
													width: '300px',
													margin: '0 15px',
												}}
											>
												<div>
													{isUrl(banner) ? (
														<Image
															src={banner}
															alt={title}
															width={1920}
															height={500}
														/>
													) : null}
												</div>
												<div className='title'>{title}</div>
												<div className='btnGroup'>
													<button
														className='lightblue'
														onClick={() => handlePromotionClick(bonusCode)}
													>
														{t('Label_Promotion_MoreInfo')}
													</button>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</ReactMarquee>
					</div>
				)}
			</div>
		</div>
	)
}

export { PromotionMarquee }
