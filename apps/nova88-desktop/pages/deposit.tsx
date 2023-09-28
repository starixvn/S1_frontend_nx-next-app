import React from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	AuthProvider,
	DepositProvider,
	GlobalDataProvider,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { Deposit, Layout } from '@nx-next-app/features/F0001/desktop'
import {
	DEPOSIT_CHANNEL_OPTIONS,
	DEPOSIT_PAYMENT_OPTIONS,
	DEPOSIT_PAYMENT_ORDERS,
} from '@nx-next-app/site/nova88'

const DepositPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
}: InitialPropsInterface) => {
	const { t } = useTranslation()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout persistSEOData={persistSEOData} footerData={footerData}>
					<DepositProvider
						DEPOSIT_PAYMENT_OPTIONS={DEPOSIT_PAYMENT_OPTIONS}
						DEPOSIT_CHANNEL_OPTIONS={DEPOSIT_CHANNEL_OPTIONS({ t })}
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
