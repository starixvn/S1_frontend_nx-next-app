import Link from 'next/link'
import Image from 'next/future/image'
import classNames from 'classnames'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { HTMLAttributes, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useBoolean, useDebounce } from 'usehooks-ts'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletInfoData,
} from '@nx-next-app/service'
import { numFormatToDigits } from '@nx-next-app/utils'
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
	const { auth, userInfo } = useAuth()

	const {
		userInfo: { currencyName },
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

	return (
		<div className={classNames('headerModule dragon', className)} {...props}>
			{/* 用 a link 讓畫面重新整理 */}
			<a href='/'>
				<Image
					className='dragonlogo'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dragon-logo.png`}
					alt='logo'
					height={55}
					width={107}
					style={{ height: 55, width: 107 }}
				/>
				<Image
					className='dragon-light'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/dragon-light.png`}
					alt='logo-light'
					height={42}
					width={26}
					style={{ height: 42, width: 26 }}
				/>
			</a>

			{auth.isLogin && !isTpWalletBalanceListLoading && (
				<div>
					<div className='headerInfo'>
						{t('Label_General_Welcome')}
						<Link href={paths.profile.root}>
							<a className='MemberID'>{userInfo.userName}</a>
						</Link>
					</div>
					<div className='Balance'>
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
							{currencyName}
						</button>
						<div>
							{!isHideBalance && (
								<>
									{numFormatToDigits(totalWalletBalance)}
									<SpinButton onClick={onRefetchAllWallet} />
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default HeaderModule
