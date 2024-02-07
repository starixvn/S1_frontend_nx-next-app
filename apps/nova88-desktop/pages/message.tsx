import React from 'react'
import { GetServerSideProps } from 'next'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
	Layout,
	LeftMenu,
	PersonalMessage,
} from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'
import { IFooterData } from '@nx-next-app/types'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IWithdrawalSetting } from '@nx-next-app/service'

interface IMessagePageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const MessagePage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	withdrawalBlockSetting,
}: IMessagePageProps) => {
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<Layout
					persistSEOData={persistSEOData}
					footerData={persistFooterData}
					withdrawalBlockSetting={withdrawalBlockSetting}
				>
					<main>
						<section className='inside'>
							<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
							<PersonalMessage />
						</section>
					</main>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

	const langId = initialProps.originCookies[ENV_COOKIE_NAMES.LangId]
	const currencyId = Number(
		initialProps.originCookies[ENV_COOKIE_NAMES.CurrencyId]
	)

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

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
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default MessagePage
