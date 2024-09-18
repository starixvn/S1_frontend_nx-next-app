import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { WithdrawalProvider } from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '../components'
import { Kyc } from '../components/withdrawal/kyc'

interface IKycPageProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const KycPage = ({
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
	withdrawalBlockSetting,
}: IKycPageProps) => {
	const { modal } = useGlobalModal()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData}>
					<WithdrawalProvider
						withdrawalBlockSetting={withdrawalBlockSetting}
						errorCallback={errorMessage => modal.error(errorMessage)}
					>
						<Kyc />
					</WithdrawalProvider>
				</Layout>
			</GlobalDataProvider>
		</AuthProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)
	const { currentHeaderCookies } = initialProps

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
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default KycPage
