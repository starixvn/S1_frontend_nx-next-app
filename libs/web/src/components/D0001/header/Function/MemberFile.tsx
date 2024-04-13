import { useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { numberFormat } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { includes, head, find } from 'lodash'
import { useLanguageGroup } from '@nx-next-app/hooks'
import { useGetCustVIPProgressQuery } from '@nx-next-app/service'
import { useAuth, useStaticData } from '../../../../data-access'
import { paths } from '../../../../app/constants'
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

	return <>
        <Link href={paths.profile.root} className='memberinfo'>

            <Img src={headerUrl} alt='img-vip' />

        </Link>

        <div
            ref={ref}
            className={classNames('grade', levelTabsName || '', {
                active: isActive,
            })}
            onClick={toggle}
        >
            <a className='grade-text'>
                {/* Hello 不用做多語系 */}
                Hello, {userName}
            </a>
            <div className='grade-color'>
                <div className='dots' />
                <div className='gradecolor-text'>{levelText}</div>
            </div>
            <div
                className={classNames('home-profile', {
                    highest: isVipLevelHighest,
                })}
            >
                {isShowVip && (
                    <div className='home-profile-top'>
                        <div className='vip-img'>
                            <Img
                                src={currentVipLevelInfo?.headerUrl}
                                alt='img-current-vip'
                            />
                            {!isVipLevelHighest && (
                                <img
                                    src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/dot-2.png`}
                                    alt='img-dot'
                                />
                            )}

                            <Img src={nextVipLevelInfo?.headerUrl} alt='img-next-vip' />
                        </div>

                        {/* // * vip 等級最高時顯示 ReachedTheHighestLevel */}
                        {isVipLevelHighest ? (
                            <Link href={paths.vip.root} className='highest-text'>
                                {t('Label_Vip_ReachedTheHighestLevel')}
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
                                        {t('Label_Vip_NextMilestone')}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className='home-profile-bottom'>
                    <Link href={paths.profile.root} passHref>

                        <img
                            src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/profile.png`}
                            alt='img-profile'
                        />
                        {t('Label_General_Profile')}

                    </Link>

                    {includes(ALLOWED_CURRENCIES['BANK_INFO'], currencyId) && (
                        (<Link href={paths.bankInfo.root} passHref>

                            <img
                                src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/bankinfo.png`}
                                alt='img-bank-info'
                            />
                            {t('Label_General_BankInfo')}

                        </Link>)
                    )}

                    <Link href={paths.cryptoWallet.root} passHref>

                        <img
                            src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/cryptowallet.png`}
                            alt='img-bank-info'
                        />
                        {t('Label_General_CryptoWallet')}

                    </Link>

                    <Link href={paths.referral.root} passHref>

                        <img
                            src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/referfriends.png`}
                            alt='img-refer-friends'
                        />
                        {t('Label_General_ReferFriends')}

                    </Link>

                    <Link href={paths.changePassword.root} passHref>

                        <img
                            src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/changepassword.png`}
                            alt='img-change-password'
                        />
                        {t('Label_General_ChangePassword')}

                    </Link>

                    <div
                        className='home-profile-country'
                        onClick={e => {
                            // * 停止 toggle
                            if (!includes(pathname, paths.profile.root)) {
                                e.stopPropagation()
                            }
                        }}
                    >
                        <Country
                            icon={icon}
                            isActive={isLangActive}
                            langGroup={languageGroup}
                            selectedText={`${selectedLangText} (${currencyName})`}
                            toggle={toggleIsLangActive}
                            onSetLanguage={onSetLanguage}
                        />
                    </div>
                    <button className='logout-btn' onClick={onSignOut}>
                        <img
                            src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logout.png`}
                            alt='img-logout'
                        />
                        {t('Label_General_LogOut')}
                    </button>
                </div>
            </div>
        </div>

        {/* <Country /> */}
    </>;
}

export default MemberFile
