import { paths } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import { useHeaderLogo } from "@nx-next-app/hooks";
import { ICustBonusWalletData, IMainWalletInfoData, ITpWalletInfoData } from "@nx-next-app/service";
import { numberFormat } from "@nx-next-app/utils";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { HTMLAttributes, useEffect } from "react";
import { useBoolean, useDebounce } from "usehooks-ts";

import { SpinButton } from "../button";

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
	const { logoUrl, showSpLogo } = useHeaderLogo({
		mainLogoUrl: {
			original: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/logo_w.png`,
			special: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/new-ui/logo_w.png`,
		},
	})

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

	// TODO: 沒有贊助球隊時可能會有暫時沒有spLogo的情況，這時主Logo要改用沒有右邊分隔線的圖
	const noSpLogoUrl = `${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/logo_w_noline.png`

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
			{/* 用 a link 讓畫面重新整理，僅有巴西沒有贊助球隊，所以秀 nova 原始 Logo */}
			<Link href={paths.home.root}>
				<a className='header-logo'>
					<img src={showSpLogo ? logoUrl : noSpLogoUrl} alt='logo' />
				</a>
			</Link>

			{/* 登入前 */}
			{!auth.isLogin && (
				<div className='btn-groups'>
					<div className='header-login'>
						<Link href={paths.login.root} prefetch>
							<a className='btn-login button btn-primary'>
								{t('Label_General_LogIn')}
							</a>
						</Link>
						<Link href={paths.join.root} prefetch>
							<a className='btn-register button btn-secondary'>
								{t('Label_General_Register')}
							</a>
						</Link>
					</div>

					<Link href={paths.setting.root} prefetch>
						<a className='btn-menu'>
							<span className='icon icon-hamburger' />
						</a>
					</Link>
				</div>
			)}

			{/* 登入後簡易資訊 */}
			{auth.isLogin && !isTpWalletBalanceListLoading && (
				<div className='header-info'>
					<div>
						{`${t('Label_General_Hello')}, `}
						<Link href={paths.profile.root}>
							<a className='MemberID'>{userName}</a>
						</Link>
					</div>
					<div className='header-balance'>
						<span>{currencyName}</span>
						<div>
							{!isHideBalance && (
								<>${numberFormat(totalWalletBalance, currencyId, 2)}</>
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
