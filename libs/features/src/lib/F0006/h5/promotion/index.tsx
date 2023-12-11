import { Header } from '@nx-next-app/components/H0006'
import PromotionCode from './PromotionCode'
import PromotionFilter from './PromotionFilter'
import PromotionList from './PromotionList'

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
