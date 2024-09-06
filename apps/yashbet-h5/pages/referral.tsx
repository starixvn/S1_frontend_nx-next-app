import { Header } from '@nx-next-app/components/H0001'
import { paths } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import { Layout, Referral } from '@nx-next-app/features/F0006/h5'
import { ReferralProvider } from '@nx-next-app/features/F0006/providers'
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
	const referralInfoList: {
		img: string
		url: string
	}[] = []

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
