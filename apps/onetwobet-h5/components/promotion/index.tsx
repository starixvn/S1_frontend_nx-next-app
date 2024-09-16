import { Header } from '@nx-next-app/components/H0001'
import PromotionCode from './common/PromotionCode'
import PromotionFilter from './common/PromotionFilter'
import PromotionList from './common/PromotionList'

const Promotion = () => {
	return (
		<>
			<Header className='header'>
				<PromotionFilter />
			</Header>

			<main className='main promotions'>
				<PromotionCode />
				<PromotionList />
			</main>
		</>
	)
}

export default Promotion
