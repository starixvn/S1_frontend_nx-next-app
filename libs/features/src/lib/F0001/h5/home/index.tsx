import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { useRouter } from 'next/router'

const Home = () => {
	const { pathname } = useRouter()
	return (
		<>
			<Header>
				{pathname === paths.home.root && <Header.AppDownLoad />}

				<Header.HeaderModule />
			</Header>

			<main className='active'>home</main>
		</>
	)
}

export default Home
