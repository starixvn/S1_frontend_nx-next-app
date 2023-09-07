import { useTranslation } from 'next-i18next'
import { ReactNode, createContext, useContext, useState } from 'react'
import { DeviceTypeEnum } from '@nx-next-app/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	IBankInfoDetail,
	IBankInfoSysData,
	useGetCustBankInfoQuery,
	useDelCustBankInfoMutation,
	useGetBankInfoSysListQuery,
	useSetCustBankInfoMutation,
} from '@nx-next-app/service'

type ISelBank = {
	bankLogo: string
	bankName: string
	sysId: number
}

interface IBankInfoContext {
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
}

interface IBankInfoProviderProps {
	children: ReactNode
}

const BankInfoContext = createContext<IBankInfoContext>(
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	null!
)

export const useBankInfo = () => useContext(BankInfoContext)

export const BankInfoProvider = ({ children }: IBankInfoProviderProps) => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()

	const { data: { data: custBankInfo } = {} } = useGetCustBankInfoQuery()
	const { data: { data: bankInfoSysList = [] } = {} } =
		useGetBankInfoSysListQuery()
	const [setCustBankInfo] = useSetCustBankInfoMutation()
	const [delCustBankInfo] = useDelCustBankInfoMutation()

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
				sysId: sysId ?? (selBank?.sysId as number),
				accountNo,
				accountName: custBankInfo?.accountName as string,
				ifscCode,
			})

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

	const value: IBankInfoContext = {
		step,
		selBank,
		isShowCards,
		bankInfoDetail,
		bankInfoSysList,
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
