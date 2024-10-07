import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useTpWalletBalanceListFetcher } from '@nx-next-app/operations'
import { useSetHideBalanceMutation } from '@nx-next-app/service'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/onetwobet'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Fragment, useEffect, useRef } from 'react'
import { useBoolean, useDebounce, useOnClickOutside } from 'usehooks-ts'

const Wallet = () => {
	const { t } = useTranslation()
	const ref = useRef()
	const {
		userInfo: { lastLogin, currencyId, langId, currencyName },
	} = useAuth()
	const {
		isHideBalance: originIsHideBalance,
		totalWalletBalance,
		mainWalletInfo,
		custBonusWalletList,
		tpWalletBalanceList,
		onRefetchAllWallet,
	} = useTpWalletBalanceListFetcher({ langId })
	const [setHideBalance] = useSetHideBalanceMutation()

	const {
		value: isWalletActive,
		setFalse: setWalletActiveFalse,
		toggle: toggleWalletActive,
	} = useBoolean(false)
	const { value: isHideBalance, setValue: setIsHideBalanceValue } =
		useBoolean(originIsHideBalance)
	const debouncedIsHideBalance = useDebounce(isHideBalance, 500)

	// * 使用者快速切換時，讓畫面順利切換，用 debounce 觸發最後的狀態
	useEffect(() => {
		setHideBalance(debouncedIsHideBalance)
	}, [debouncedIsHideBalance])

	// * fetching 結束後給予正確數值
	useEffect(() => {
		setIsHideBalanceValue(originIsHideBalance)
	}, [originIsHideBalance])

	const { balance, lastTransaction } = mainWalletInfo ?? {}
	useOnClickOutside(ref, setWalletActiveFalse)
	return (
		// 新增 .active balance-container會出現
		<div
			ref={ref}
			className={classNames('balance', {
				'active balance-container': isWalletActive,
			})}
			onClick={toggleWalletActive}
			style={{ cursor: 'pointer' }}
		>
			<button className='thrid'>
				<span>My {t('Label_General_Balance')}:</span>
				<span className='mark'>
					${!isHideBalance && numberFormat(totalWalletBalance, currencyId, 2)}
				</span>
			</button>

			{/* <!-- balance下拉選單 --> */}
			<div className='balance-container'>
				<div>
					<div>{currencyName}</div>
					<div>
						{numberFormat(totalWalletBalance, currencyId, 2)}{' '}
						<span className='icon icon-refresh' onClick={onRefetchAllWallet} />
					</div>
				</div>
				<div className='selector-money'>
					<div>{t('Label_Wallet_MainWallet')}</div>
					<div>{numberFormat(balance || 0, currencyId)}</div>
				</div>
				{custBonusWalletList?.map(item => {
					const { turnover, rollover, promoCategoryId, bonus, tpId } = item

					const percentage =
						turnover > rollover ? 100 : ((turnover / rollover) * 100).toFixed(2)
					return (
						<Fragment key={tpId}>
							<div className='bouns'>
								<span>{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}</span>
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

				{tpWalletBalanceList?.map(({ tpName, balance, tpId }) => (
					<div className='selector-money' key={tpId}>
						<span>{tpName}</span>
						<span>{numberFormat(balance, currencyId)}</span>
					</div>
				))}

				<div>
					<Link href={paths.withdrawal.root} passHref>
						<button className='primary'>{t('Label_General_Withdrawal')}</button>
					</Link>
					{includes(ALLOWED_CURRENCIES.TRANSFER, currencyId) && (
						<Link href={paths.transferFunds.root} passHref>
							<button className='primary'>
								{t('Label_General_TransferFunds')}
							</button>
						</Link>
					)}
				</div>
				<div className='selector-time'>
					<div>
						<div>{t('Label_General_LastLogin')}</div>
						<div>{dayjs(lastLogin).format('L LT')}</div>
					</div>
					<div>
						<div>{t('Label_General_LastTransaction')}</div>
						<div>
							{lastTransaction && dayjs(lastTransaction).format('L LT')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Wallet
