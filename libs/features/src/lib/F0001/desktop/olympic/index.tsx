import Banner from './Banner'
import Terms from './Terms'
import RedemptionHistory from './RedemptionHistory'
import Footer from './Footer'
import Reward from './Reward'

const Olympic = () => {
	return (
		<main className='olympic'>
			<Banner />
			<Reward />
			<div className='olympic-bottom'>
				<div className='olympic-bottom-wrapper'>
					<RedemptionHistory />
					<Terms />
				</div>
			</div>
			<Footer />
		</main>
	)
}

export default Olympic
