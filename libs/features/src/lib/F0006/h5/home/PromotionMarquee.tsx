import { useTranslation } from 'next-i18next'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { paths } from '@nx-next-app/constants'
import ReactMarquee from 'react-fast-marquee'
import { useRouter } from 'next/router'

const PromotionMarquee = () => {
	const { promotionData, handlePromotionClick } = useHome()
	const { push } = useRouter()
	const { t } = useTranslation()

	return (
		<>
			<div className='moduleTitle'>
				{t('Label_General_Promotion')}

				<a role='link' aria-hidden onClick={() => push(paths.promotion.root)}>
					{t('Label_General_SeeMore').toUpperCase()}
				</a>
			</div>
			{promotionData.length > 0 && (
				<ReactMarquee speed={60} className='promos' gradient={false}>
					{promotionData.map(({ banner, title, description, bonusCode }) => (
						<div className='promosModule' key={bonusCode}>
							<div>
								<img src={banner} alt={title} />
							</div>
							<div>{title}</div>
							<div>{description}</div>
							<div className='btn-group'>
								<button
									className='blue'
									onClick={() => handlePromotionClick(bonusCode)}
								>
									{t('Label_Promotion_MoreInfo')}
								</button>
							</div>
						</div>
					))}
				</ReactMarquee>
			)}
		</>
	)
}

export { PromotionMarquee }
