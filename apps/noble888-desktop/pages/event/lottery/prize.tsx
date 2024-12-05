import { AuthProvider } from '@nx-next-app/data-access'
import { LotteryPrizePage } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const LotteryResultsPage = ({
	originIsSignIn,
	originCookies,
}: InitialPropsInterface) => (
	<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
		<LotteryPrizePage />
	</AuthProvider>
)

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		const initialProps = await useServerSideInitialPropsFetcher(context)
		return {
			props: {
				...initialProps,
				...(await serverSideTranslations(context.locale)),
			},
		}
	} catch {
		return { redirect: { destination: '/', permanent: false } }
	}
}

export default LotteryResultsPage
