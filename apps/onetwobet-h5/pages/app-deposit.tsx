import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { DepositProvider } from '@nx-next-app/operations'
import {
	DEPOSIT_PAYMENT_OPTIONS,
	DEPOSIT_PAYMENT_ORDERS,
} from '@nx-next-app/site/onetwobet'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AppDeposit from '../components/app-deposit'

const DepositPage = ({
	originIsSignIn,
	originCookies,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<DepositProvider
					DEPOSIT_PAYMENT_OPTIONS={DEPOSIT_PAYMENT_OPTIONS}
					// * 排序與開關
					depositPaymentOrders={DEPOSIT_PAYMENT_ORDERS}
				>
					<AppDeposit />
				</DepositProvider>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default DepositPage
