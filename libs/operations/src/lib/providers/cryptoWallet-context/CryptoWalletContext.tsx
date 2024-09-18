import { useAuth } from '@nx-next-app/data-access'
import { useWalletAllowed } from '@nx-next-app/operations'
import {
	ICryptoNetwork,
	IOTPSMSData,
	ISetCustCryptoWalletArgs,
	IUSDTDetail,
	IWithdrawalSetting,
	useGetCustBankInfoQuery,
	useGetSupportCryptoInfoQuery,
	useLazyGetOTPVerifyInfoQuery,
	useSetCustCryptoWalletMutation,
} from '@nx-next-app/service'
import { ReactNode, createContext, useContext } from 'react'
import { IAddWalletModalArgs } from './types'

interface ICryptoWalletContextValue {
	loading: boolean
	USDTDetail: IUSDTDetail[]
	cardAllowed: {
		bankCardAllowed: boolean
		eWalletCardAllowed: boolean
		cryptoCardAllowed: boolean
	}
	cryptoNetworkList: ICryptoNetwork[]
	cryptoCurrencyOptions: { value: number; label: string }[]
	handleAddWallet: ({
		phoneVerifiedCallBack,
		onAddWalletModal,
	}: {
		phoneVerifiedCallBack: () => void
		onAddWalletModal: (props: IAddWalletModalArgs) => void
	}) => void
	handleGetOtpInfo: () => Promise<IOTPSMSData | undefined>
	handleSetCustCryptoWallet: (args: ISetCustCryptoWalletArgs) => Promise<void>
}

const CryptoWalletContext = createContext<ICryptoWalletContextValue>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useCryptoWallet = () => useContext(CryptoWalletContext)

export const CryptoWalletProvider = ({
	children,
	withdrawalBlockSetting,
	errorCallback,
}: {
	children: ReactNode
	withdrawalBlockSetting: IWithdrawalSetting[]
	errorCallback: (errorMessage: string) => void
}) => {
	const {
		userInfo: { phoneVerified },
	} = useAuth()

	const {
		data: { data: custBankInfo } = {},
		isFetching: isGetCustBankInfoFetching,
	} = useGetCustBankInfoQuery()

	const {
		data: { data: supportCryptoInfo } = {},
		isFetching: isGetSupportCryptoInfoFetching,
	} = useGetSupportCryptoInfoQuery()

	// * 不加入此 loading 避免每次打開彈窗都出現 loading 動畫
	const [getOtpInfo] = useLazyGetOTPVerifyInfoQuery()

	const [setCustCryptoWallet, { isLoading: isSetCustCryptoWalletLoading }] =
		useSetCustCryptoWalletMutation()

	const { uSDTDetail: USDTDetail = [] } = custBankInfo ?? {}
	const { cryptoCurrency = [], cryptoNetwork: cryptoNetworkList = [] } =
		supportCryptoInfo ?? {}

	const cryptoCurrencyOptions = cryptoCurrency.map(
		({ currencyId, currencyName }) => ({
			value: currencyId,
			label: currencyName,
		})
	)

	const handleGetOtpInfo = async () => {
		let otpInfo
		try {
			const { data } = await getOtpInfo().unwrap()
			otpInfo = data
		} catch (error) {
			errorCallback((error as Error).message)
		}
		return otpInfo
	}

	const handleSetCustCryptoWallet = async ({
		address,
		network,
		nickName,
		currencyId,
	}: ISetCustCryptoWalletArgs) => {
		try {
			await setCustCryptoWallet({
				address,
				network,
				nickName,
				currencyId,
			}).unwrap()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const handleAddWallet = ({
		phoneVerifiedCallBack,
		onAddWalletModal,
	}: {
		phoneVerifiedCallBack: () => void
		onAddWalletModal: (props: IAddWalletModalArgs) => void
	}) => {
		if (!phoneVerified) {
			phoneVerifiedCallBack()
		}
		if (onAddWalletModal) {
			onAddWalletModal({
				handleSetCustCryptoWallet,
				cryptoNetworkList,
				handleGetOtpInfo,
				cryptoCurrencyOptions,
			})
		}
	}
	const { cardAllowed } = useWalletAllowed({ withdrawalBlockSetting })

	const loading =
		isGetCustBankInfoFetching ||
		isGetSupportCryptoInfoFetching ||
		isSetCustCryptoWalletLoading

	const value: ICryptoWalletContextValue = {
		loading,
		USDTDetail,
		cryptoNetworkList,
		cryptoCurrencyOptions,
		cardAllowed,
		handleAddWallet,
		handleGetOtpInfo,
		handleSetCustCryptoWallet,
	}

	return (
		<CryptoWalletContext.Provider value={value}>
			{children}
		</CryptoWalletContext.Provider>
	)
}
