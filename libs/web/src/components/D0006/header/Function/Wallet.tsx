import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletInfoData,
} from '@nx-next-app/service'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/yashbet'
import { numFormatToDigits, numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
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
		userInfo: { currencyName, currencyId },
	} = useAuth()

	const {
		value: isWalletActive,
		setFalse: setWalletActiveFalse,
		toggle: toggleWalletActive,
	} = useBoolean(false)
	const {
		userInfo: { lastLogin },
	} = useAuth()

	const {
		value: isHideBalance,
		setValue: setIsHideBalanceValue,
		toggle: toggleHideBalance,
	} = useBoolean(originIsHideBalance)
	const debouncedIsHideBalance = useDebounce(isHideBalance, 500)

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
		<div
			ref={ref}
			className={classNames('wallet icon icon-balance', {
				active: isWalletActive,
			})}
			onClick={toggleWalletActive}
		>
			<span>
				{`${currencyName} `}
				{!isHideBalance && numFormatToDigits(totalWalletBalance)}
			</span>

			<button
				className={classNames('icon', {
					'icon-minus': !isHideBalance,
					'icon-plus': isHideBalance,
				})}
				onClick={e => {
					e.stopPropagation()
					toggleHideBalance()
				}}
			>
				{' '}
			</button>

			<SpinButton onClick={onRefetchAllWallet} />

			<div className='submenu'>
				<div className='balance'>
					<span>{currencyName}</span>
					<span>
						{numberFormat(totalWalletBalance, currencyId, 2)}
						<SpinButton onClick={onRefetchAllWallet} />
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
							<div key={tpId}>
								<div>
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
							</div>
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
					<Link href={paths.deposit.root} passHref>
						<a className='orange'>{t('Label_General_Deposit')}</a>
					</Link>
					{includes(ALLOWED_CURRENCIES.TRANSFER, currencyId) && (
						<Link href={paths.transferFunds.root} passHref>
							<a className='orange'>{t('Label_General_TransferFunds')}</a>
						</Link>
					)}
				</div>
				<div className='loginLog'>
					<span>{t('Label_General_LastLogin')}</span>
					<span>{lastLogin && dayjs(lastLogin).format('L LT')}</span>
				</div>
				<div className='transactionLog'>
					<span>{t('Label_General_LastTransaction')}</span>

					<span>
						{lastTransaction && dayjs(lastTransaction).format('L LT')}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Wallet
