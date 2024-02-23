import { useTranslation } from 'next-i18next'
import { ReactNode, createContext, useContext, useState } from 'react'
import {
	IBankInfoDetail,
	useGetCustBankInfoQuery,
	useGetBankInfoSysListQuery,
	useSetLocalBankInfoMutation,
	useDeleteBankCardMutation,
	IBankInfoSysData,
	IWithdrawalSetting,
} from '@nx-next-app/service'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useWalletAllowed } from '@nx-next-app/features/F0006/hooks'

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
	handleDeleteCard: ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => void
	handleSetCustBankInfo: ({
		sysId,
		ifscCode,
		accountNo,
	}: {
		sysId?: number
		ifscCode?: string
		accountNo: string
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
}

const BankInfoContext = createContext<IBankInfoContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useBankInfo = () => useContext(BankInfoContext)

export const BankInfoProvider = ({
	children,
	withdrawalBlockSetting,
}: IBankInfoProviderProps) => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()

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
	}: {
		sysId?: number
		ifscCode?: string
		accountNo: string
	}) => {
		try {
			await setCustBankInfo({
				accountNo,
				sysId: sysId ?? (selBank?.sysId as number),
				accountName: custBankInfo?.accountName as string,
				IFSCCode: ifscCode,
			}).unwrap()

			Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']) === DeviceTypeEnum.Desktop
				? setStep(1)
				: setIsShowCards(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleDeleteCard = async ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => {
		const deleteCard = async () => {
			try {
				await delCustBankInfo({
					sysId,
					accountNo,
					accountName: custBankInfo?.accountName as string,
				}).unwrap()
			} catch (error) {
				modal.error((error as Error).message)
			}
		}

		modal.confirm(
			<div>
				{t('Label_BankInfo_AreYouSureDelete')}
				<br />
				{t('Label_BankInfo_CantBeRestore')}
			</div>,
			{ onOK: deleteCard }
		)
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
		handleDeleteCard,
		handleSetCustBankInfo,
	}

	return (
		<BankInfoContext.Provider value={value}>
			{children}
		</BankInfoContext.Provider>
	)
}
