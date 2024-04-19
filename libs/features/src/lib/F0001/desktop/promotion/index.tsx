import { useTranslation } from 'next-i18next'
import PromotionList from './common/PromotionList'
import PromotionFilter from './common/PromotionFilter'

const Promotion = () => {
	const { t } = useTranslation()

	return (
		<main>
			<section className='inside'>
				<div className='rightModule'>
					<div className='infoModule'>
						<div className='inside-title'>
							<span className='icon icon-gift'>{t('Label_Promotions')}</span>
						</div>
						<PromotionFilter />
						<PromotionList />
					</div>
				</div>
			</section>
		</main>
	)
}

export default Promotion
