import {
	Grade,
	HomeProfile,
} from '@nx-next-app/components/D0001/header/Function/styles'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { useGetCustVIPProgressQuery } from '@nx-next-app/service'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { find, head, includes } from 'lodash'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

import { Img } from '../../image'
import Country from './Country'

interface IMemberFileProps {
	onSignOut: () => void
}

const MemberFile = ({ onSignOut }: IMemberFileProps) => {
	const ref = useRef(null)
	const { t } = useTranslation()
	const { pathname } = useRouter()
	const {
		userInfo: { userName, currencyId, langId, currencyName },
		auth: { isLogin },
	} = useAuth()
	const { value: isActive, toggle, setFalse } = useBoolean(false)

	const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
	const { value: isLangActive, toggle: toggleIsLangActive } = useBoolean(false)
	const selectedLangText = find(head(Object.values(languageGroup)), {
		value: langId,
	})?.displayText

	const { ALLOWED_CURRENCIES, VIP_CLUB_IMAGES } = useStaticData()

	const { data: { data: custVIPProgress } = {} } = useGetCustVIPProgressQuery(
		null,
		{ refetchOnMountOrArgChange: true }
	)

	const {
		upDeposit = 0,
		currentVipLevel = 0,
		actualDeposit = 0,
	} = custVIPProgress || {}
	// * upDeposit = null 代表該會員已經是最高等級
	const isVipLevelHighest = upDeposit === null

	// * 當前 VIP 等級資訊
	const currentVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel - 1]
	// * 下一階 VIP 等級資訊
	const nextVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel]

	// * Vip 進度條百分比
	const progress = Math.floor((actualDeposit / Number(upDeposit)) * 100)

	const { headerUrl, displayKey, levelTabsName } = currentVipLevelInfo || {}
	const levelText = t(displayKey || '').replace('CLUB', '')
	const isShowVip = ALLOWED_CURRENCIES.VIP?.includes(currencyId)

	useOnClickOutside(ref, setFalse)

	return (
		<>
			<Link href={paths.profile.root}>
				<a className='member-info'>
					<Img src={headerUrl} alt='img-vip' />
				</a>
			</Link>

			<Grade
				ref={ref}
				className={classNames('grade', levelTabsName || '', {
					active: isActive,
				})}
				onClick={toggle}
			>
				<a className='grade-text'>
					{/* Hello 不用做多語系 */}
					{t('Label_General_Hello')}, {userName}
					<span className='icon icon-chevron_down' />
				</a>
				<div className='grade-color'>{levelText}</div>
				<HomeProfile
					className={classNames({
						highest: isVipLevelHighest,
					})}
				>
					{isShowVip && (
						<div
							className={`home-profile-top ${
								isVipLevelHighest ? 'vip-level-highest' : ''
							}`}
						>
							<div className='vip-img'>
								<Img
									src={currentVipLevelInfo?.headerUrl}
									alt='img-current-vip'
								/>
								{!isVipLevelHighest && (
									<img
										src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/themes/${process.env['NEXT_PUBLIC_THEME_TYPE']}/dot-2.webp`}
										alt='img-dot'
									/>
								)}

								{!isVipLevelHighest && (
									<Img src={nextVipLevelInfo?.headerUrl} alt='img-next-vip' />
								)}
							</div>

							{/* // * vip 等級最高時顯示 ReachedTheHighestLevel */}
							{isVipLevelHighest ? (
								<Link href={paths.vip.root}>
									<a className='highest-text'>
										{t('Label_Vip_ReachedTheHighestLevel')}
										<span className='icon icon-share-box-fill' />
									</a>
								</Link>
							) : (
								<>
									<div className='progress'>
										<div
											className='progress-bar'
											style={{ width: `${Math.min(progress, 100)}%` }}
										/>
									</div>
									<div className='progress-number'>
										<div>
											{numberFormat(actualDeposit, currencyId)}/{' '}
											{numberFormat(upDeposit, currencyId)}
										</div>
										<Link href={paths.vip.root}>
											<a>
												{t('Label_Vip_NextMilestone')}
												<span className='icon icon-arrow-right-line' />
											</a>
										</Link>
									</div>
								</>
							)}
						</div>
					)}

					<div className='home-profile-bottom'>
						<Link href={paths.profile.root} passHref>
							<a className='item'>
								<span className='icon icon-user-line' />
								{t('Label_General_Profile')}
							</a>
						</Link>

						{includes(ALLOWED_CURRENCIES['BANK_INFO'], currencyId) && (
							<Link href={paths.bankInfo.root} passHref>
								<a className='item'>
									<span className='icon icon-bank-fill' />
									{t('Label_General_BankInfo')}
								</a>
							</Link>
						)}

						{/* Loki Comment: Use for next phase */}
						{/* <Link href={paths.cryptoWallet.root} passHref>
							<a>
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/cryptowallet.png`}
									alt='img-crypto-wallet'
								/>
								{t('Label_General_CryptoWallet')}
							</a>
						</Link> */}

						<Link href={paths.referral.root} passHref>
							<a className='item'>
								<span className='icon icon-profile-2user' />
								{t('Label_General_ReferFriends')}
							</a>
						</Link>

						<Link href={paths.changePassword.root} passHref>
							<a className='item'>
								<span className='icon icon-lock-2-fill' />
								{t('Label_General_ChangePassword')}
							</a>
						</Link>

						<div
							className='item home-profile-country'
							onClick={e => {
								// * 停止 toggle
								if (!includes(pathname, paths.profile.root)) {
									e.stopPropagation()
								}
							}}
						>
							<Country
								icon={icon}
								isLogin={isLogin}
								isActive={isLangActive}
								langGroup={languageGroup}
								selectedText={`${selectedLangText} (${currencyName})`}
								toggle={toggleIsLangActive}
								onSetLanguage={onSetLanguage}
							/>
						</div>
						<button className='item logout-btn' onClick={onSignOut}>
							<span className='icon icon-logout' />
							{t('Label_General_LogOut')}
						</button>
					</div>
				</HomeProfile>
			</Grade>

			{/* <Country /> */}
		</>
	)
}

export default MemberFile
