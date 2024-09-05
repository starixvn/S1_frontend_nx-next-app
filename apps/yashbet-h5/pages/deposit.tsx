import {
	AuthProvider,
	DepositProvider,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import { Deposit } from '@nx-next-app/features/F0001/h5'
import { Layout } from '@nx-next-app/features/F0006/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	DEPOSIT_PAYMENT_OPTIONS,
	DEPOSIT_PAYMENT_ORDERS,
} from '@nx-next-app/site/yashbet'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const DepositPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<DepositProvider
						DEPOSIT_PAYMENT_OPTIONS={DEPOSIT_PAYMENT_OPTIONS}
						// * 排序與開關
						depositPaymentOrders={DEPOSIT_PAYMENT_ORDERS}
					>
						<Deposit />
					</DepositProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default DepositPage
