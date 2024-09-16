import {
	ICustEWalletInfoData,
	IEWalletInfoSysData,
	IWithdrawalSetting,
	useDeleteEWalletCardMutation,
	useGetCustEWalletInfoQuery,
	useGetEWalletInfoListQuery,
	useSetEWalletInfoMutation,
} from '@nx-next-app/service'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useWalletAllowed } from '../../hooks'

interface IEWalletContextValue {
	isShowCards: boolean
	custEWalletList: ICustEWalletInfoData[]
	eWalletInfoSysList: IEWalletInfoSysData[]
	cardAllowed: {
		bankCardAllowed: boolean
		eWalletCardAllowed: boolean
		cryptoCardAllowed: boolean
	}
	setIsShowCards: (isShowCards: boolean) => void
	handleSetCustEWallet: ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => Promise<void>
	onDeleteEWallet: ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => void
}

const EWalletContext = createContext<IEWalletContextValue>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useEWallet = () => useContext(EWalletContext)

export const EWalletProvider = ({
	children,
	withdrawalBlockSetting,
	errorCallback,
}: {
	children: ReactNode
	withdrawalBlockSetting: IWithdrawalSetting[]
	errorCallback: (errorMessage: string) => void
}) => {
	const [isShowCards, setIsShowCards] = useState<boolean>(true)

	const { data: { data: custEWalletList = [] } = {} } =
		useGetCustEWalletInfoQuery(null)
	const { data: { data: eWalletInfoSysList = [] } = {} } =
		useGetEWalletInfoListQuery(null)
	const [setCustEWallet] = useSetEWalletInfoMutation()
	const [delCustEWallet] = useDeleteEWalletCardMutation()

	const handleSetCustEWallet = async ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => {
		try {
			await setCustEWallet({
				sysId,
				accountNo,
			}).unwrap()

			setIsShowCards(true)
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const onDeleteEWallet = async ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => {
		try {
			await delCustEWallet({ sysId, accountNo }).unwrap()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const { cardAllowed } = useWalletAllowed({ withdrawalBlockSetting })

	const value: IEWalletContextValue = {
		isShowCards,
		custEWalletList,
		eWalletInfoSysList,
		cardAllowed,
		setIsShowCards,
		onDeleteEWallet,
		handleSetCustEWallet,
	}

	return (
		<EWalletContext.Provider value={value}>{children}</EWalletContext.Provider>
	)
}
