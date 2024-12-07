import { Header } from '@nx-next-app/components/H0001'
import { PromotionPage } from '@nx-next-app/features/F0001/h5/promotion/styles'

import PromotionCode from './common/PromotionCode'
import PromotionFilter from './common/PromotionFilter'
import PromotionList from './common/PromotionList'

const Promotion = () => {
	return (
		<>
			<Header>
				<PromotionFilter />
			</Header>

			<PromotionPage className='main'>
				<PromotionCode />
				<PromotionList />
			</PromotionPage>
		</>
	)
}

export default Promotion
