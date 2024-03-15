import { useTranslation } from 'next-i18next'
import ReactMarquee from 'react-fast-marquee'
import { paths } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { toUpper } from 'lodash-es'
import { useRouter } from 'next/router'

const PromotionMarquee = () => {
	const { promotionData, handlePromotionClick } = useHome()
	const { push } = useRouter()
	const { t } = useTranslation()

	return (
		<div className='projpot'>
			<div className='promos'>
				<div className='moduleTitle'>
					{t('Label_General_Promotion')}
					<a
						role='link'
						aria-hidden
						className='more'
						onClick={() => push(paths.promotion.root)}
					>
						{toUpper(t('Label_General_SeeMore') || '')}
					</a>
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
													<img src={banner} alt={title} />
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
