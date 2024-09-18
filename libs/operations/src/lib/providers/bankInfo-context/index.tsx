import {
	IBankInfoDetail,
	IBankInfoSysData,
	IWithdrawalSetting,
	useDeleteBankCardMutation,
	useGetBankInfoSysListQuery,
	useGetCustBankInfoQuery,
	useSetLocalBankInfoMutation,
} from '@nx-next-app/service'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useWalletAllowed } from '../../hooks'

type ISelBank = {
	sysId: number
	bankLogo: string
	bankName: string
}

interface IBankInfoContext {
	loading: boolean
	step: number
	selBank?: ISelBank
	isShowCards: boolean
	bankInfoDetail: IBankInfoDetail[]
	bankInfoSysList: IBankInfoSysData[]
	setStep: (step: number) => void
	setSelBank: (selBank: ISelBank) => void
	setIsShowCards: (isShowCards: boolean) => void
	onDeleteCard: ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => Promise<void>
	handleSetCustBankInfo: ({
		sysId,
		ifscCode,
		accountNo,
		successCallback,
	}: {
		sysId?: number
		ifscCode?: string
		accountNo: string
		successCallback: () => void
	}) => void
	cardAllowed: {
		bankCardAllowed: boolean
		eWalletCardAllowed: boolean
		cryptoCardAllowed: boolean
	}
}

interface IBankInfoProviderProps {
	children: ReactNode
	withdrawalBlockSetting: IWithdrawalSetting[]
	errorCallback: (errorMessage: string) => void
}

const BankInfoContext = createContext<IBankInfoContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useBankInfo = () => useContext(BankInfoContext)

const BankInfoProvider = ({
	children,
	withdrawalBlockSetting,
	errorCallback,
}: IBankInfoProviderProps) => {
	const {
		data: { data: custBankInfo } = {},
		isFetching: isGetCustBankInfoFetching,
	} = useGetCustBankInfoQuery()
	const {
		data: { data: bankInfoSysList = [] } = {},
		isFetching: isGetBankInfoSysListFetching,
	} = useGetBankInfoSysListQuery(null)
	const [setCustBankInfo, { isLoading: isSetLocalBankInfoLoading }] =
		useSetLocalBankInfoMutation()
	const [delCustBankInfo, { isLoading: isDeleteBankCardLoading }] =
		useDeleteBankCardMutation()

	const [step, setStep] = useState<number>(1) // Desktop
	const [isShowCards, setIsShowCards] = useState<boolean>(true) // Mobile

	const [selBank, setSelBank] = useState<ISelBank>()

	const handleSetCustBankInfo = async ({
		sysId,
		ifscCode,
		accountNo,
		successCallback,
	}: {
		sysId?: number
		ifscCode?: string
		accountNo: string
		successCallback: () => void
	}) => {
		try {
			await setCustBankInfo({
				accountNo,
				sysId: sysId ?? (selBank?.sysId as number),
				accountName: custBankInfo?.accountName as string,
				IFSCCode: ifscCode,
			}).unwrap()
			successCallback()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const onDeleteCard = async ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => {
		try {
			await delCustBankInfo({
				sysId,
				accountNo,
				accountName: custBankInfo?.accountName as string,
			}).unwrap()
		} catch (error) {
			errorCallback((error as Error).message)
		}
	}

	const { bankInfoDetail = [] } = custBankInfo ?? {}

	const { cardAllowed } = useWalletAllowed({ withdrawalBlockSetting })

	const loading =
		isGetCustBankInfoFetching ||
		isGetBankInfoSysListFetching ||
		isSetLocalBankInfoLoading ||
		isDeleteBankCardLoading

	const value: IBankInfoContext = {
		loading,
		step,
		selBank,
		isShowCards,
		bankInfoDetail,
		bankInfoSysList,
		cardAllowed,
		setStep,
		setSelBank,
		setIsShowCards,
		onDeleteCard,
		handleSetCustBankInfo,
	}

	return (
		<BankInfoContext.Provider value={value}>
			{children}
		</BankInfoContext.Provider>
	)
}

export { BankInfoProvider }
