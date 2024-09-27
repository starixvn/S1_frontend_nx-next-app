import { Loading } from '@nx-next-app/components/D0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useBankInfo, useCheckUserInfo } from '@nx-next-app/operations'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CardList } from './CardList'
import { StepBar } from './StepBar'
import { AddCardPanel } from './addCardPanel'

const UpdateProfileModal = dynamic(
	() => import('../modal/UpdateProfileModal'),
	{ ssr: false }
)

const BankInfo = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { checkUserInfo } = useCheckUserInfo()

	const {
		userInfo: { accountName },
	} = useAuth()

	const { loading } = useBankInfo()

	const [tip, setTip] = useState<boolean>(false)

	useEffect(() => {
		checkUserInfo({
			onInfoRequired: () =>
				modal.open(<UpdateProfileModal prevPage={paths.deposit.root} />),
		})
	}, [])

	if (loading) return <Loading />

	return (
		<div className='rightModule'>
			<div className='infoModule'>
				<div className='inside-title'>
					<span className='icon icon-icon32px_bank-account'>
						{t('Label_General_BankInfo')}
					</span>
					<div>{t('Label_BankInfo_UpdateBankInfo')}</div>
				</div>
				<StepBar />
				{accountName && (
					<div className='accountName'>
						{t('Label_BankInfo_BankAccountName')}
						<span>{accountName}</span>
						<button
							className='icon icon-error'
							onClick={() => setTip(prev => !prev)}
						/>
						<div className={classNames('tip', { active: tip })}>
							{t('Label_BankInfo_BankAccountHint')}
						</div>
					</div>
				)}
				<AddCardPanel />
			</div>
			<CardList />
		</div>
	)
}

export default BankInfo
