import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { paths } from '@nx-next-app/constants'
import ReactMarquee from 'react-fast-marquee'
import { isUrl } from '@nx-next-app/utils'
import Image from 'next/future/image'

const PromotionMarquee = () => {
	const { promotionData, handlePromotionClick } = useHome()
	const { t } = useTranslation()

	return (
		<>
			<div className='moduleTitle'>
				{t('Label_General_Promotion')}
				<Link href={paths.promotion.root} passHref>
					<a>{t('Label_General_SeeMore').toUpperCase()}</a>
				</Link>
			</div>
			{promotionData.length > 0 && (
				<ReactMarquee speed={60} className='promos' gradient={false}>
					{promotionData.map(({ banner, title, description, bonusCode }) => (
						<div className='promosModule' key={bonusCode}>
							<div>
								{isUrl(banner) ? (
									<Image src={banner} alt={title} width={1920} height={500} />
								) : (
									<img src={banner} alt={title} />
								)}
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
