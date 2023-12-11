import { useTranslation } from 'next-i18next'
import { createContext, ReactNode, useContext, useState } from 'react'
import {
	IEWalletInfoSysData,
	ICustEWalletInfoData,
	useGetCustEWalletInfoQuery,
	useDeleteEWalletCardMutation,
	useGetEWalletInfoListQuery,
	useSetEWalletInfoMutation,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

interface IEWalletContextValue {
	isShowCards: boolean
	custEWalletList: ICustEWalletInfoData[]
	eWalletInfoSysList: IEWalletInfoSysData[]
	setIsShowCards: (isShowCards: boolean) => void
	handleSetCustEWallet: ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => Promise<void>
	handleDeleteEWallet: ({
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

export const EWalletProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation()

	const { modal } = useGlobalModal()

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
			modal.error((error as Error).message)
		}
	}

	const handleDeleteEWallet = async ({
		sysId,
		accountNo,
	}: {
		sysId: number
		accountNo: string
	}) => {
		const deleteWallet = async () => {
			try {
				await delCustEWallet({ sysId, accountNo }).unwrap()
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
			{ onOK: deleteWallet }
		)
	}

	const value: IEWalletContextValue = {
		isShowCards,
		custEWalletList,
		eWalletInfoSysList,
		setIsShowCards,
		handleDeleteEWallet,
		handleSetCustEWallet,
	}

	return (
		<EWalletContext.Provider value={value}>{children}</EWalletContext.Provider>
	)
}
