import React from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import { IFooterData } from '@nx-next-app/types'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { Layout, LeftMenu, Referral } from '@nx-next-app/features/F0001/desktop'
import { ReferralProvider } from '@nx-next-app/features/F0001/providers'
import { FOOTER_DATA } from '@nx-next-app/site/nova88'

interface IReferralPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const ReferralPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	withdrawalBlockSetting,
}: IReferralPageProps) => {
	const { t } = useTranslation()

	// 使用 i18n, 因此需放在此處跟著 re-render 更新
	const referralInfoList = [
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Facebook.png`,
			hoverImg: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Facebook-1.png`,
			url: `https://www.facebook.com/sharer/sharer.php?u=${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}&quote=${t('Label_Referral_Welcome')}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-WhatsApp.png`,
			hoverImg: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-WhatsApp-1.png`,
			url: `https://wa.me/?&text=${t('Label_Referral_Welcome')} ${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Telegram.png`,
			hoverImg: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Telegram-1.png`,
			url: `https://t.me/share/url?url=${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}&text=${t('Label_Referral_Welcome')}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Line.png`,
			hoverImg: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/icon-Line-1.png`,
			url: `http://line.naver.jp/R/msg/text/?${t(
				'Label_Referral_Welcome'
			)}%0D%0A${process.env['NEXT_PUBLIC_ENV_DB_HOST']}`,
		},
	]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<ReferralProvider referralInfoList={referralInfoList}>
					<Layout
						persistSEOData={persistSEOData}
						footerData={persistFooterData}
					>
						<main>
							<section className='inside'>
								<LeftMenu withdrawalBlockSetting={withdrawalBlockSetting} />
								<Referral />
							</section>
						</main>
					</Layout>
				</ReferralProvider>
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

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	return {
		props: {
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default ReferralPage
