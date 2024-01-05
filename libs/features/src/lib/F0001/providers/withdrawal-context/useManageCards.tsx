import { useTranslation } from 'next-i18next'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import {
	IBankInfoData,
	IDeleteBankCardArgs,
	IDeleteEWalletCardArgs,
	IEWalletData,
	IUsdtDetailData,
	useDeleteBankCardMutation,
	useDeleteEWalletCardMutation,
	useLazyGetBankInfoSysListQuery,
	useLazyGetEWalletInfoListQuery,
	useSetEWalletInfoMutation,
	useSetLocalBankInfoMutation,
} from '@nx-next-app/service'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { ISelectProps } from '@nx-next-app/components/D0001'
import dynamic from 'next/dynamic'

const AddBankCardModal = dynamic(
	() =>
		import(
			'@nx-next-app/features/F0001/desktop/withdrawal/modal/AddBankCardModal'
		),
	{ ssr: false }
)

interface IUseManageCardsProps {
	accountName: string
	bankData: {
		custEWalletInfo: IEWalletData[]
		bankInfoDetail: IBankInfoData[]
		usdtDetail: IUsdtDetailData[]
	}
}

// 管理增刪卡片的 hooks
const useManageCards = ({ accountName, bankData }: IUseManageCardsProps) => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	// 新增 local 卡片
	const [setLocalBankInfo] = useSetLocalBankInfoMutation()
	// 新增 EWallet 卡片
	const [setEWalletInfo] = useSetEWalletInfoMutation()
	// 取得可新增的 localBank 列表
	const [getBankInfoSysList] = useLazyGetBankInfoSysListQuery()
	// 取得可新增的 EWallet 列表
	const [getEWalletInfoList] = useLazyGetEWalletInfoListQuery()
	// 刪 LocalBank
	const [deleteBankCard] = useDeleteBankCardMutation()
	// 刪 EWallet
	const [deleteEWalletCard] = useDeleteEWalletCardMutation()

	/* <--用戶卡片管理邏輯--> */
	// 加卡片送出
	const handleSubmitAddCard = async ({
		type,
		value,
	}: {
		type: WithdrawalBankCardEnum
		value: {
			sysId: number
			accountNo: string
			isfcCode?: string
		}
	}) => {
		try {
			if (type === WithdrawalBankCardEnum.LocalBank) {
				const { sysId, accountNo, isfcCode } = value
				await setLocalBankInfo({
					accountName,
					sysId,
					accountNo,
					IFSCCode: isfcCode,
				}).unwrap()
			}
			if (type === WithdrawalBankCardEnum.EWallet) {
				const { accountNo, sysId } = value
				await setEWalletInfo({ accountNo, sysId }).unwrap()
			}
			modal.info(t('Label_General_UpdateSuccessful'), {
				title: t('Label_Withdrawal_AddBankAccount'),
				icon: 'icon icon-library',
			})
		} catch (error) {
			modal.error((error as Error)?.message)
		}
	}

	// 新增 Local Bank
	const handleAddBankCard = async () => {
		try {
			const { data: bankInfo = [] } = await getBankInfoSysList(null).unwrap()
			const dropDownOptions: ISelectProps['options'] = bankInfo.map(
				({ bankName, sysId, bankLogo }) => {
					const logoSrc = bankLogo
						? `${
								process.env['NEXT_PUBLIC_PAYMENT_HOST']
						  }/square/${bankLogo.toLowerCase()}`
						: ''
					return {
						value: sysId,
						label: bankName,
						prefixOptionIcon: <img src={logoSrc} alt='' />,
					}
				}
			)
			modal.open(
				<AddBankCardModal
					type={WithdrawalBankCardEnum.LocalBank}
					bankData={bankData}
					bankDropDown={dropDownOptions}
					onSubmitCard={handleSubmitAddCard}
				/>
			)
		} catch (error) {
			modal.error((error as Error)?.message)
		}
	}

	// 新增 EWallet
	const handleAddEWallet = async () => {
		try {
			const { data: eWalletData = [] } = await getEWalletInfoList(null).unwrap()
			const dropDownOptions: ISelectProps['options'] = eWalletData.map(
				({ eWalletName, sysId, eWalletLogo }) => {
					const logoSrc = eWalletLogo
						? `${
								process.env['NEXT_PUBLIC_PAYMENT_HOST']
						  }/square/${eWalletLogo.toLowerCase()}`
						: ''
					return {
						value: sysId,
						label: eWalletName,
						prefixOptionIcon: <img src={logoSrc} alt='' />,
					}
				}
			)
			modal.open(
				<AddBankCardModal
					type={WithdrawalBankCardEnum.EWallet}
					bankData={bankData}
					bankDropDown={dropDownOptions}
					onSubmitCard={handleSubmitAddCard}
				/>
			)
		} catch (error) {
			modal.error((error as Error)?.message)
		}
	}

	// 加卡片控制, 根據 type 顯示對應彈窗
	const handleAddCards = (type: WithdrawalBankCardEnum) => {
		switch (type) {
			case WithdrawalBankCardEnum.LocalBank:
				handleAddBankCard()
				break
			case WithdrawalBankCardEnum.EWallet:
				handleAddEWallet()
				break
			default:
				break
		}
	}

	// 刪 localBank
	const handleDeleteBankCard = async (args: IDeleteBankCardArgs) => {
		modal.confirm(
			[
				t('Label_Withdrawal_DeleteConfirm1') ?? '',
				t('Label_Withdrawal_DeleteConfirm2') ?? '',
			],
			{
				title: t('Label_General_Oh'),
				onOK: async () => {
					try {
						await deleteBankCard(args).unwrap()
					} catch (error) {
						modal.error((error as Error).message)
					}
				},
				okText: t('Label_General_Yes'),
				cancelText: t('Label_General_No'),
			}
		)
	}

	// 刪 EWallet
	const handleDeleteEWalletCard = async (args: IDeleteEWalletCardArgs) => {
		modal.confirm(
			[
				t('Label_Withdrawal_DeleteConfirm1') ?? '',
				t('Label_Withdrawal_DeleteConfirm2') ?? '',
			],
			{
				title: t('Label_General_Oh'),
				onOK: async () => {
					try {
						await deleteEWalletCard(args).unwrap()
					} catch (error) {
						modal.error((error as Error).message)
					}
				},
				okText: t('Label_General_Yes'),
				cancelText: t('Label_General_No'),
			}
		)
	}
	return { handleAddCards, handleDeleteBankCard, handleDeleteEWalletCard }
}

export { useManageCards }
