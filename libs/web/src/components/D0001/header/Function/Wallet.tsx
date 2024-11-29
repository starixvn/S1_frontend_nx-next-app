import { HomeBalance } from '@nx-next-app/components/D0001/header/Function/styles'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletInfoData,
} from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Fragment, useEffect, useRef } from 'react'
import { useBoolean, useDebounce, useOnClickOutside } from 'usehooks-ts'

import { SpinButton } from '../../button'

interface IWalletProps {
	originIsHideBalance: boolean
	totalWalletBalance: number
	mainWalletInfo: IMainWalletInfoData | undefined
	custBonusWalletList: ICustBonusWalletData[] | undefined
	tpWalletBalanceList: ITpWalletInfoData[] | undefined
	onRefetchAllWallet: () => void
	onSetHideBalance: (isHideBalance: boolean) => void
}

const Wallet = ({
	originIsHideBalance,
	totalWalletBalance,
	mainWalletInfo,
	custBonusWalletList,
	tpWalletBalanceList,
	onRefetchAllWallet,
	onSetHideBalance,
}: IWalletProps) => {
	const ref = useRef(null)
	const { t } = useTranslation()
	const {
		userInfo: { lastLogin, currencyName, currencyId },
	} = useAuth()

	const {
		value: isWalletActive,
		setFalse: setWalletActiveFalse,
		toggle: toggleWalletActive,
	} = useBoolean(false)

	const {
		value: isHideBalance,
		setValue: setIsHideBalanceValue,
		toggle: toggleHideBalance,
	} = useBoolean(originIsHideBalance)
	const debouncedIsHideBalance = useDebounce(isHideBalance, 500)

	const { ALLOWED_CURRENCIES } = useStaticData()

	// * 使用者快速切換時，讓畫面順利切換，用 debounce 觸發最後的狀態
	useEffect(() => {
		onSetHideBalance(debouncedIsHideBalance)
	}, [debouncedIsHideBalance])

	// * fetching 結束後給予正確數值
	useEffect(() => {
		setIsHideBalanceValue(originIsHideBalance)
	}, [originIsHideBalance])

	useOnClickOutside(ref, setWalletActiveFalse)

	const { balance, lastTransaction } = mainWalletInfo ?? {}

	return (
		<HomeBalance
			ref={ref}
			className={classNames({
				active: isWalletActive,
			})}
			onClick={toggleWalletActive}
		>
			<a className='wallet'>
				{' '}
				{t('Label_General_Balance')}
				<span className='icon icon-chevron_down' />
			</a>
			<div className='balance-money'>
				<SpinButton className='icon-spinner' onClick={onRefetchAllWallet}>
					<span className='icon icon-refresh-fill' />
				</SpinButton>
				{`${currencyName} `}
				{!isHideBalance && numberFormat(totalWalletBalance, currencyId, 2)}

				<span
					onClick={e => {
						e.stopPropagation()
						toggleHideBalance()
					}}
					className={`icon ${
						!isHideBalance ? 'icon-minus_circle' : 'icon-plus-circle'
					}`}
				/>
			</div>

			<div className='balance-submenu'>
				<div className='balance'>
					<span>{currencyName}</span>
					<span>
						{numberFormat(totalWalletBalance, currencyId, 2)}
						<SpinButton onClick={onRefetchAllWallet}>
							<span className='icon icon-refresh-fill' />
						</SpinButton>
					</span>
				</div>

				<div className='walletBalance'>
					<div className='walletName'>
						<span>{t('Label_Wallet_MainWallet')}</span>
						<span>{numberFormat(balance || 0, currencyId)}</span>
					</div>
					{custBonusWalletList?.map(item => {
						const { turnover, rollover, promoCategoryId, bonus, tpId } = item

						const percentage =
							turnover > rollover
								? 100
								: ((turnover / rollover) * 100).toFixed(2)
						return (
							<Fragment key={tpId}>
								<div className='bouns'>
									<span>
										{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}
									</span>
									<span>{bonus}</span>
								</div>
								<div className='progressBar'>
									<div className='bar'>
										<div
											className='progress'
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<div className='percentage'>{percentage}%</div>
								</div>
							</Fragment>
						)
					})}
				</div>

				{tpWalletBalanceList?.map(({ tpName, balance, tpId }) => (
					<div className='walletBalance' key={tpId}>
						<div className='walletName'>
							<span>{tpName}</span>
							<span>{numberFormat(balance, currencyId)}</span>
						</div>
					</div>
				))}

				<div className='btnGroup'>
					<Link href={paths.withdrawal.root} passHref>
						<a className='button btn-secondary'>
							{t('Label_General_Withdrawal')}
						</a>
					</Link>

					{includes(ALLOWED_CURRENCIES.TRANSFER, currencyId) && (
						<Link href={paths.transferFunds.root} passHref>
							<a className='button btn-secondary'>
								{t('Label_General_TransferFunds')}
							</a>
						</Link>
					)}
				</div>
				<div className='loginLog'>
					<span>{t('Label_General_LastLogin')}</span>
					<span>{dayjs(lastLogin).format('L LT')}</span>
				</div>
				<div className='transactionLog'>
					<span>{t('Label_General_LastTransaction')}</span>

					<span>
						{lastTransaction && dayjs(lastTransaction).format('L LT')}
					</span>
				</div>
			</div>
		</HomeBalance>
	)
}

export default Wallet
