import { WrapperPromotion } from '@nx-next-app/features/F0001/desktop/promotion/styles'
import { useTranslation } from 'next-i18next'
import PromotionFilter from './common/PromotionFilter'
import PromotionList from './common/PromotionList'

const Promotion = () => {
	const { t } = useTranslation()

	return (
		<main>
			<WrapperPromotion>
				<section className='inside promotion'>
					<div className='wraper-client'>
						<div className='title-client'>{t('Label_Promotions')}</div>
						<div className='body-client'>
							<div className='tabs-list'>
								<div className='tabs-list-control'>
									<PromotionFilter />
								</div>
								<div className='tabs-list-body'>
									<PromotionList />
								</div>
							</div>
						</div>
					</div>
				</section>
			</WrapperPromotion>
		</main>
	)
}

export default Promotion
