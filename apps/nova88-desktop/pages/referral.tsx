import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, LeftMenu, Referral } from '@nx-next-app/features/F0001/desktop'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import ReferralProvider from '@nx-next-app/features/F0001/providers/referral-context'
import { useTranslation } from 'next-i18next'

type IReferralPageProps = InitialPropsInterface

const ReferralPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	footerData,
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
					<Layout persistSEOData={persistSEOData} footerData={footerData}>
						<main>
							<section className='inside'>
								<LeftMenu />
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

export default ReferralPage
