import { paths } from '@nx-next-app/constants'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { useGetCustVIPProgressQuery } from '@nx-next-app/service'
import { ALLOWED_CURRENCIES } from '@nx-next-app/site/onetwobet-indo'
import { numberFormat } from '@nx-next-app/utils'
import classNames from 'classnames'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const UserProfile = () => {
	const { t } = useTranslation()
	const ref = useRef()
	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const { getBannerUrl } = useGlobalData()
	const {
		userInfo: { currencyId },
	} = useAuth()

	const { data: { data: custVIPProgress } = {} } = useGetCustVIPProgressQuery(
		null,
		{ refetchOnMountOrArgChange: true }
	)

	const { upDeposit = 0, actualDeposit = 0 } = custVIPProgress || {}
	// * upDeposit = null 代表該會員已經是最高等級
	const isVipLevelHighest = upDeposit === null

	// * Vip 進度條百分比
	const progress = Math.floor((actualDeposit / Number(upDeposit)) * 100)

	const isShowVip = ALLOWED_CURRENCIES.VIP?.includes(currencyId)

	useOnClickOutside(ref, setFalse)

	return (
		//  <!-- 新增 .active profile-selector會出現-->
		<div
			ref={ref}
			className={classNames('user-profile', {
				'active profile-selector': isActive,
			})}
			onClick={toggle}
			style={{ cursor: 'pointer' }}
		>
			<button>
				<img
					className='icon'
					src={getBannerUrl('/desktop/img/user-icon.png')}
					alt='User Icon'
				/>
			</button>

			<div className='profile-selector'>
				{isShowVip && (
					<div className='selector-top'>
						<div className='progress-img'>
							<img
								src={getBannerUrl('/desktop/img/vip1.svg')}
								alt='vip level img'
							/>
							<img
								className='dot-line'
								src={getBannerUrl('/desktop/img/4.0/dot-2.png')}
								alt='dot line'
							/>
							<img
								src={getBannerUrl('/desktop/img/vip2.svg')}
								alt='vip level img'
							/>
						</div>
						{/* --- */}

						{/* // * vip 等級最高時顯示 ReachedTheHighestLevel */}
						{isVipLevelHighest ? (
							<Link href={paths.vip.root} className='highest-text'>
								<a>{t('Label_Vip_ReachedTheHighestLevel')}</a>
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
											{t('Label_Vip_NextMilestone')}{' '}
											<span className='icon icon-arrow-next' />
										</a>
									</Link>
								</div>
							</>
						)}
					</div>
				)}

				{/* --- */}
				<div className='selector-bottom'>
					<Link href={paths.profile.root} passHref>
						<a>
							<span className='icon icon-profile' />
							{t('Label_General_Profile')}
						</a>
					</Link>
					{includes(ALLOWED_CURRENCIES['BANK_INFO'], currencyId) && (
						<Link href={paths.bankInfo.root} passHref>
							<a>
								<span className='icon icon-bankinfo' />
								{t('Label_General_BankInfo')}
							</a>
						</Link>
					)}

					<Link href={paths.cryptoWallet.root} passHref>
						<a>
							<span className='icon icon-cryptowallet' />
							{t('Label_General_CryptoWallet')}
						</a>
					</Link>

					<Link href={paths.referral.root} passHref>
						<a>
							<span className='icon icon-referral' />
							{t('Label_General_ReferFriends')}
						</a>
					</Link>

					<Link href={paths.changePassword.root} passHref>
						<a>
							<span className='icon icon-change-password' />
							{t('Label_General_ChangePassword')}
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
