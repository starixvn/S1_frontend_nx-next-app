import { Loading } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	KycStatusEnum,
	useCheckUserInfo,
	useWithdrawal,
} from '@nx-next-app/operations'
import { CurrenciesEnum } from '@nx-next-app/types'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
	BalanceInfo,
	BankSelect,
	ImportantNotice,
	RecentHistory,
	SubmitAmount,
	WalletInfo,
	WithdrawalHeader,
} from './common/components'

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const Withdrawal = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const { loading, checkKyc, kycStatus } = useWithdrawal()
	const { modal } = useGlobalModal()
	const { userInfo } = useAuth()
	const { checkUserInfo } = useCheckUserInfo()
	const { currencyId } = userInfo

	useEffect(() => {
		checkUserInfo({
			onSuccessCallback: () =>
				modal.open(<UpdateProfileModal prevPage={paths.withdrawal.root} />),
			optionalPhoneVerifiedCallback: () => {
				// INR 才回傳 PhoneVerifiedCallback
				if (currencyId === CurrenciesEnum.INR) {
					return () =>
						modal.confirm(t('Label_Withdrawal_PhoneVerificationHint'), {
							title: t('Label_General_Withdrawal'),
							icon: 'icon icon-icon32px_Profile',
							okText: t('Label_Profile_VertifyNow'),
							cancelText: t('Label_Profile_Later'),
							onOK: () => push(paths.profile.root),
						})
				}
				return undefined
			},
		})
	}, [])

	useEffect(() => {
		if (kycStatus === KycStatusEnum.KycUpload) {
			push(paths.kyc.root)
		}
		checkKyc()
	}, [kycStatus])

	if (loading) return <Loading />

	return (
		<>
			<WithdrawalHeader />
			<main className='main withdrawal'>
				<WalletInfo />
				<BankSelect />
				<BalanceInfo />
				<SubmitAmount />
				<RecentHistory />
				<ImportantNotice />
			</main>
		</>
	)
}

export default Withdrawal
