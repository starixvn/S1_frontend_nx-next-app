import { NovaAuthProvider } from '@nova88-h5/providers'
import { DepositProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Deposit, Layout } from '@nx-next-app/features/F0001/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	DEPOSIT_PAYMENT_OPTIONS,
	DEPOSIT_PAYMENT_ORDERS,
} from '@nx-next-app/site/nova88'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const DepositPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: InitialPropsInterface) => {
	return (
		<NovaAuthProvider
			originIsSignIn={originIsSignIn}
			originCookies={originCookies}
		>
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
		</NovaAuthProvider>
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
