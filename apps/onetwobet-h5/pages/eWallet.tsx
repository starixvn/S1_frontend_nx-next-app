import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import { EWalletProvider } from '@nx-next-app/operations'
import { IWithdrawalSetting, IWithdrawalTypeEnum } from '@nx-next-app/service'
import { find } from 'lodash-es'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EWallet, Layout } from '../components'

interface IEWalletPageProps extends InitialPropsInterface {
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const EWalletPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistStaticFileDomainData,
}: IEWalletPageProps) => {
	const { modal } = useGlobalModal()
	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<EWalletProvider
					withdrawalBlockSetting={withdrawalBlockSetting}
					errorCallback={errorMessage => modal.error(errorMessage)}
				>
					<Layout persistSEOData={persistSEOData}>
						<EWallet />
					</Layout>
				</EWalletProvider>
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

	// 因為手機版要提前在 serverside 做導轉，故將此 api fetching 直接拉到 serverSide 處理
	const withdrawalBlockSetting = await getWithdrawalBlockSetting({
		headers: { cookie: currentHeaderCookies },
	})

	const eWalletAllowed = find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.EWallet
	)?.status

	// eWallet 關閉就導到 bankCard
	if (!eWalletAllowed) {
		return {
			redirect: {
				destination: paths.bankInfo.root,
				permanent: false,
			},
		}
	}

	return {
		props: {
			withdrawalBlockSetting,
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default EWalletPage
