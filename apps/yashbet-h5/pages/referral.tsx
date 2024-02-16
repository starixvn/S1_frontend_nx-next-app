import React from 'react'
import { GetServerSideProps } from 'next'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Referral } from '@nx-next-app/features/F0006/h5'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ReferralProvider } from '@nx-next-app/features/F0006/providers'
import { useTranslation } from 'next-i18next'
import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'

type IReferralPageProps = InitialPropsInterface

const ReferralPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
}: IReferralPageProps) => {
	const { t } = useTranslation()

	// 使用 i18n, 因此需放在此處跟著 re-render 更新
	const referralInfoList = [
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-facebook-a.svg`,
			url: `https://www.facebook.com/sharer/sharer.php?u=${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}&quote=${t('Label_Referral_Welcome')}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-whatsapp-a.svg`,
			url: `https://wa.me/?&text=${t('Label_Referral_Welcome')} ${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-telegram-a.svg`,
			url: `https://t.me/share/url?url=${
				process.env['NEXT_PUBLIC_ENV_DB_HOST']
			}&text=${t('Label_Referral_Welcome')}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-line-a.svg`,
			url: `http://line.naver.jp/R/msg/text/?${t(
				'Label_Referral_Welcome'
			)}%0D%0A${process.env['NEXT_PUBLIC_ENV_DB_HOST']}`,
		},
	]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider>
				<ReferralProvider referralInfoList={referralInfoList}>
					<Layout persistSEOData={persistSEOData}>
						<Header className='header'>
							<Header.Tags
								tags={[
									{
										href: paths.referral.root,
										label: t('Label_General_ReferFriends'),
									},
									{
										href: paths.referralHistory.root,
										label: t('Label_General_ReferralHistory'),
									},
								]}
							/>
						</Header>

						<Referral />
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
