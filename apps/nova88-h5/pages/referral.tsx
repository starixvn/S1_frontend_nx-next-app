import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, Referral } from '@nx-next-app/features/F0001/h5'
import { ReferralProvider } from '@nx-next-app/features/F0001/providers'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type IReferralPageProps = InitialPropsInterface

const ReferralPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IReferralPageProps) => {
	const { t } = useTranslation()

	// 使用 i18n, 因此需放在此處跟著 re-render 更新
	// URL 內的 {{ref_url}} 會被替換為推薦連結
	const referralInfoList = [
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-Facebook-1.png`,
			url: `https://www.facebook.com/sharer/sharer.php?u={{ref_url}}&quote=${t(
				'Label_Referral_Welcome'
			)}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-WhatsApp-1.png`,
			url: `https://wa.me/?&text=${t('Label_Referral_Welcome')} {{ref_url}}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-Telegram-1.png`,
			url: `https://t.me/share/url?url={{ref_url}}&text=${t(
				'Label_Referral_Welcome'
			)}`,
		},
		{
			img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/icon-Line-1.png`,
			url: `http://line.naver.jp/R/msg/text/?${t(
				'Label_Referral_Welcome'
			)}%0D%0A{{ref_url}}`,
		},
	]

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
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
