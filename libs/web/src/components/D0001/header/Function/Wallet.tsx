import Link from 'next/link'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useBoolean, useDebounce, useOnClickOutside } from 'usehooks-ts'
import { useEffect, useRef } from 'react'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletInfoData,
} from '@nx-next-app/service'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { SpinButton } from '../../button'

interface IWalletProps {
	totalWalletBalance: number
	mainWalletInfo: IMainWalletInfoData | undefined
	custBonusWalletList: ICustBonusWalletData[] | undefined
	tpWalletBalanceList: ITpWalletInfoData[] | undefined
	onRefetchAllWallet: () => void
	onSetHideBalance: (isHideBalance: boolean) => void
}

const Wallet = ({
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
		userInfo: { currencyName },
	} = useAuth()

	const {
		value: isWalletActive,
		setFalse: setWalletActiveFalse,
		toggle: toggleWalletActive,
	} = useBoolean(false)
	const {
		userInfo: { lastLogin },
	} = useAuth()

	const { value: isHideBalance, toggle: toggleHideBalance } = useBoolean()
	const debouncedIsHideBalance = useDebounce(isHideBalance, 500)

	const handleToggleHideBalance = () => {
		toggleHideBalance()
	}

	useOnClickOutside(ref, setWalletActiveFalse)

	// * 使用者快速切換時，讓畫面順利切換，用 debounce 觸發最後的狀態
	useEffect(() => {
		onSetHideBalance(!isHideBalance)
	}, [debouncedIsHideBalance])

	const { balance, lastTransaction } = mainWalletInfo ?? {}

	return (
		<div
			ref={ref}
			className={classNames('wallet icon icon-balance', {
				active: isWalletActive,
			})}
			onClick={toggleWalletActive}
		>
			<span>{totalWalletBalance} ('000)</span>

			<button
				className={classNames('icon', {
					'icon-minus': isHideBalance,
					'icon-plus': !isHideBalance,
				})}
				onClick={e => {
					e.stopPropagation()
					handleToggleHideBalance()
				}}
			>
				{' '}
			</button>

			<SpinButton onClick={onRefetchAllWallet} />

			<div className='submenu'>
				<div className='balance'>
					<span>{currencyName}</span>
					<span>
						{totalWalletBalance} ('000)
						<SpinButton onClick={onRefetchAllWallet} />
					</span>
				</div>

				<div className='walletBalance'>
					<div className='walletName'>
						<span>Main Wallet</span>
						<span>{balance} ('000)</span>
					</div>
					{custBonusWalletList?.map(item => {
						const { turnover, rollover } = item
						const percentage =
							turnover > rollover
								? 100
								: ((turnover / rollover) * 100).toFixed(2)
						return (
							<div>
								<div>
									<span>{item.promoCategoryId}</span>
									<span>{item.bonus}</span>
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
							</div>
						)
					})}
				</div>

				{tpWalletBalanceList?.map(item => (
					<div className='walletBalance'>
						<div className='walletName'>
							<span>{item.tpName}</span>
							<span>{item.balance} ('000)</span>
						</div>
					</div>
				))}

				<div className='btnGroup'>
					<Link href={paths.deposit.root}>
						<a className='orange'>Deposit</a>
					</Link>
					<Link href={paths.transferFunds.root}>
						<a className='orange'>Transfer Funds</a>
					</Link>
				</div>
				<div className='loginLog'>
					<span>{t('Label_LastLogin')}</span>
					<span>{dayjs(lastLogin).format('L LT')}</span>
				</div>
				<div className='transactionLog'>
					<span>{t('Label_LastTransaction')}</span>

					<span>
						{lastTransaction && dayjs(lastTransaction).format('L LT')}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Wallet
