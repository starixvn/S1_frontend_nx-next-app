import { ISelectProps } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { WithdrawalBankCardEnum } from '@nx-next-app/features/F0001/types'
import {
	useLazyGetBankInfoSysListQuery,
	useLazyGetEWalletInfoListQuery,
	useSetEWalletInfoMutation,
	useSetLocalBankInfoMutation,
	type IBankInfoData,
	type IEWalletData,
	type IPaymentCustBankInfoData,
	type IUsdtDetailData,
} from '@nx-next-app/service'
import { useTranslation } from 'next-i18next'
import { IAddBankCardModalProps } from './types'

interface IUseManageCardsProps {
	accountName: string
	bankData: {
		custEWalletInfo?: IEWalletData[]
		bankInfoDetail?: IBankInfoData[] | IPaymentCustBankInfoData[]
		usdtDetail?: IUsdtDetailData[]
	}
	addBankCardModalCallBack?: ({
		type,
		bankData,
		bankDropDown,
		onSubmitCard,
	}: IAddBankCardModalProps) => void
}

// 管理增刪卡片的 hooks
const useManageCards = ({
	accountName,
	bankData,
	addBankCardModalCallBack,
}: IUseManageCardsProps) => {
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

	/* <--用戶卡片管理邏輯--> */
	// 加卡片送出
	const handleSubmitAddCard = async ({
		type,
		value,
		successCallback,
		errorCallback,
	}: {
		type: WithdrawalBankCardEnum
		value: {
			sysId: number
			accountNo: string
			isfcCode?: string
		}
		successCallback: () => void
		errorCallback: (errorMessage: string) => void
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
			successCallback()
			modal.info(t('Label_General_UpdateSuccessful'), {
				title: t('Label_Withdrawal_AddBankAccount'),
				icon: 'icon icon-library',
			})
		} catch (error) {
			errorCallback((error as Error)?.message)
		}
	}

	// 新增 Local Bank
	const handleAddBankCard = async ({
		errorCallback,
	}: {
		errorCallback: (errorMessage: string) => void
	}) => {
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
			if (addBankCardModalCallBack) {
				addBankCardModalCallBack({
					type: WithdrawalBankCardEnum.LocalBank,
					bankData,
					bankDropDown: dropDownOptions,
					onSubmitCard: handleSubmitAddCard,
				})
			}
		} catch (error) {
			errorCallback((error as Error)?.message)
		}
	}

	// 新增 EWallet
	const handleAddEWallet = async ({
		errorCallback,
	}: {
		errorCallback: (errorMessage: string) => void
	}) => {
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
			if (addBankCardModalCallBack) {
				addBankCardModalCallBack({
					type: WithdrawalBankCardEnum.EWallet,
					bankData,
					bankDropDown: dropDownOptions,
					onSubmitCard: handleSubmitAddCard,
				})
			}
		} catch (error) {
			errorCallback((error as Error)?.message)
		}
	}

	return {
		handleAddBankCard,
		handleAddEWallet,
	}
}

export { useManageCards }
