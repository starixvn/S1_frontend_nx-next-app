import Jackpot from './Jackpot'
import MonthlyPicks from './MonthlyPicks'
import NewsFeed from './NewsFeed'

const Information = () => {
	return (
		<div className='home-information'>
			<Jackpot />
			<MonthlyPicks />
			<NewsFeed />
		</div>
	)
}
export default Information
