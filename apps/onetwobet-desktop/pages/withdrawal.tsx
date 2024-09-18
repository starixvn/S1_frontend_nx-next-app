import { Layout, Withdrawal } from '@12b-desktop/components/index'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ENV_COOKIE_NAMES } from '@nx-next-app/constants'
import {
	AuthProvider,
	GlobalDataProvider,
	getWithdrawalBlockSetting,
} from '@nx-next-app/data-access'
import {
	InitialPropsInterface,
	useServerSideInitialPropsFetcher,
} from '@nx-next-app/hooks'
import {
	CryptoWalletProvider,
	WithdrawalProvider,
	type IAddBankCardModalProps,
} from '@nx-next-app/operations'
import { IWithdrawalSetting } from '@nx-next-app/service'
import { FOOTER_DATA } from '@nx-next-app/site/onetwobet'
import { IFooterData } from '@nx-next-app/types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const AddBankCardModal = dynamic(
	() => import('../components/modal/AddBankCardModal'),
	{
		ssr: false,
	}
)

interface IWithdrawalPageProps extends InitialPropsInterface {
	persistFooterData: IFooterData
	withdrawalBlockSetting: IWithdrawalSetting[]
}

const WithdrawalPage = ({
	withdrawalBlockSetting,
	originIsSignIn,
	originCookies,
	persistSEOData,
	persistFooterData,
	persistStaticFileDomainData,
}: IWithdrawalPageProps) => {
	const { modal } = useGlobalModal()

	const addBankCardModalCallBack = ({
		type,
		bankData,
		bankDropDown,
		onSubmitCard,
	}: IAddBankCardModalProps) => {
		modal.open(
			<AddBankCardModal
				type={type}
				bankData={bankData}
				bankDropDown={bankDropDown}
				onSubmitCard={onSubmitCard}
			/>
		)
	}

	return (
		<AuthProvider originIsSignIn={originIsSignIn} originCookies={originCookies}>
			<GlobalDataProvider
				persistStaticFileDomainData={persistStaticFileDomainData}
			>
				<Layout persistSEOData={persistSEOData} footerData={persistFooterData}>
					<WithdrawalProvider
						withdrawalBlockSetting={withdrawalBlockSetting}
						addBankCardModalCallBack={addBankCardModalCallBack}
						errorCallback={errorMessage => modal.error(errorMessage)}
					>
						{/* 因為需使用 cryptoWallet 的 hooks ,故需多包此層 */}
						<CryptoWalletProvider
							withdrawalBlockSetting={withdrawalBlockSetting}
							errorCallback={errorMessage => modal.error(errorMessage)}
						>
							<Withdrawal withdrawalBlockSetting={withdrawalBlockSetting} />
						</CryptoWalletProvider>
					</WithdrawalProvider>
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
			persistFooterData: FOOTER_DATA({ langId, currencyId }),
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}

export default WithdrawalPage
