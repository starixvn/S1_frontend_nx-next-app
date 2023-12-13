import { useTranslation } from 'next-i18next'
import { createContext, ReactNode, useContext } from 'react'
import { useRouter } from 'next/router'
import {
	IOTPSMSData,
	IUSDTDetail,
	ICryptoNetwork,
	ISetCustCryptoWalletArgs,
	useGetCustBankInfoQuery,
	useLazyGetOTPVerifyInfoQuery,
	useGetSupportCryptoInfoQuery,
	useSetCustCryptoWalletMutation,
	IWithdrawalSetting,
} from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { AddWalletModal as DesktopAddWalletModal } from '@nx-next-app/features/F0001/desktop/crypto-wallet/AddWalletModal'
import { AddWalletModal as H5AddWalletModal } from '@nx-next-app/features/F0001/h5/crypto-wallet/AddWalletModal'
import { useWalletAllowed } from '@nx-next-app/features/F0001/hooks'

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
	handleAddWallet: () => void
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
}: {
	children: ReactNode
	withdrawalBlockSetting: IWithdrawalSetting[]
}) => {
	const { t } = useTranslation()
	const { push } = useRouter()

	const { modal } = useGlobalModal()

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
			modal.error((error as Error).message)
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
			modal.error((error as Error).message)
		}
	}

	const handleAddWallet = () => {
		if (!phoneVerified) {
			modal.confirm(t('Label_CryptoWallet_CryptoOTP'), {
				okText: t('Label_General_UpdatePersonalDetail'),
				onOK: () => {
					push(paths.profile.root)
				},
			})
		} else if (
			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
		) {
			// 避免層級混亂，Modal ( Layout 層 ) 所使用的資料均透過 props 正確傳遞
			modal.open(
				<DesktopAddWalletModal
					handleSetCustCryptoWallet={handleSetCustCryptoWallet}
					cryptoNetworkList={cryptoNetworkList}
					handleGetOtpInfo={handleGetOtpInfo}
					cryptoCurrencyOptions={cryptoCurrencyOptions}
				/>
			)
		} else {
			modal.open(
				<H5AddWalletModal
					handleSetCustCryptoWallet={handleSetCustCryptoWallet}
					cryptoNetworkList={cryptoNetworkList}
					handleGetOtpInfo={handleGetOtpInfo}
					cryptoCurrencyOptions={cryptoCurrencyOptions}
				/>
			)
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
