import ESportBanner from './ESportBanner'
import ESportFooterList from './ESportFooterList'
import ESportList from './ESportList'

const ESport = () => {
	return (
		<main className='lobby'>
			<ESportBanner />
			<ESportList />
			<ESportFooterList />
		</main>
	)
}

export default ESport
