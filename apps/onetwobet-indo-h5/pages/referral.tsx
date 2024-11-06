import { Header } from '@12b-indo-h5/components/common'
import { Layout, Referral } from '@12b-indo-h5/components/index'
import { paths } from '@nx-next-app/constants'
import { AuthProvider, GlobalDataProvider } from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { ReferralProvider } from '@nx-next-app/operations'
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

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<ReferralProvider>
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
