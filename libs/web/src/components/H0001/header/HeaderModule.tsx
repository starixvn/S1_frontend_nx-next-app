import Link from 'next/link'
import classNames from 'classnames'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { HTMLAttributes, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useBoolean, useDebounce } from 'usehooks-ts'
import { isEventPeriod, numberFormat } from '@nx-next-app/utils'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletInfoData,
} from '@nx-next-app/service'
import { EUROPE_EVENT_PERIOD } from '@nx-next-app/site/nova88'
import { SpinButton } from '../button'

interface IHeaderModuleProps extends HTMLAttributes<HTMLDivElement> {
	isTpWalletBalanceListLoading: boolean
	originIsHideBalance: boolean
	totalWalletBalance: number
	mainWalletInfo: IMainWalletInfoData | undefined
	custBonusWalletList: ICustBonusWalletData[] | undefined
	tpWalletBalanceList: ITpWalletInfoData[] | undefined
	onRefetchAllWallet: () => void
	onSetHideBalance: (isHideBalance: boolean) => void
}

const HeaderModule = ({
	isTpWalletBalanceListLoading,
	originIsHideBalance,
	totalWalletBalance,
	mainWalletInfo,
	custBonusWalletList,
	tpWalletBalanceList,
	onRefetchAllWallet,
	onSetHideBalance,
	className,
	...props
}: IHeaderModuleProps) => {
	const { t } = useTranslation()

	const {
		auth,
		userInfo: { currencyName, userName, currencyId },
	} = useAuth()

	const {
		value: isHideBalance,
		setValue: setIsHideBalanceValue,
		toggle: toggleHideBalance,
	} = useBoolean(originIsHideBalance)
	const debouncedIsHideBalance = useDebounce(isHideBalance, 500)

	// * 使用者快速切換時，讓畫面順利切換，用 debounce 觸發最後的狀態
	useEffect(() => {
		if (auth.isLogin) {
			onSetHideBalance(debouncedIsHideBalance)
		}
	}, [debouncedIsHideBalance, auth.isLogin])

	// * fetching 結束後給予正確數值
	useEffect(() => {
		setIsHideBalanceValue(originIsHideBalance)
	}, [originIsHideBalance])

	return (
		<div className={classNames('header-module', className)} {...props}>
			{/* 用 a link 讓畫面重新整理 */}
			<a
				href={paths.home.root}
				className={classNames('header-logo', {
					eurocup: isEventPeriod(EUROPE_EVENT_PERIOD),
				})}
			>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/logo_w.png`}
					alt='logo'
				/>
			</a>

			<a className='splogo' />

			{/* 登入前 */}
			{!auth.isLogin && (
				<>
					<div className='home-btn-group header-login'>
						<Link href={paths.login.root} prefetch>
							<a className='btn-login'>{t('Label_General_LogIn')}</a>
						</Link>
						<Link href={paths.join.root} prefetch>
							<a className='btn-register'>{t('Label_General_Register')}</a>
						</Link>
					</div>

					<Link href={paths.setting.root} prefetch>
						<a className='btn-menu'>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/menu.png`}
								alt='setting'
							/>
						</a>
					</Link>
				</>
			)}

			{/* 登入後簡易資訊 */}
			{auth.isLogin && !isTpWalletBalanceListLoading && (
				<div className='header-info'>
					<div>
						{`${t('Label_General_Welcome')}, `}
						<Link href={paths.profile.root}>
							<a className='MemberID'>{userName}</a>
						</Link>
					</div>
					<div className='header-balance'>
						<span>{currencyName}</span>
						<div>
							{!isHideBalance && (
								<>${numberFormat(totalWalletBalance, currencyId)}</>
							)}

							<SpinButton
								className='icon icon-spinner11 clickBtn'
								onClick={onRefetchAllWallet}
							/>
							<button
								onClick={e => {
									e.stopPropagation()
									toggleHideBalance()
								}}
							>
								{isHideBalance ? (
									<img
										className='icon-plus'
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/plus.png`}
										alt='img-icon-plus'
									/>
								) : (
									<img
										className='icon-minus'
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/minus.png`}
										alt='img- icon-minus'
									/>
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default HeaderModule
