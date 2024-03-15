import React, { useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { includes } from 'lodash'
import { useAuth } from '../../../../data-access'
import { paths } from '../../../../app/constants'

interface IMemberFileProps {
	userLevelImageInfo:
		| {
				url: string
				alt: string
		  }
		| undefined
}

const MemberFile = ({ userLevelImageInfo }: IMemberFileProps) => {
	const ref = useRef(null)
	const { t } = useTranslation()
	const { pathname } = useRouter()
	const { userInfo } = useAuth()
	const { value: isActive, toggle, setFalse } = useBoolean(false)

	useOnClickOutside(ref, setFalse)

	return (
		<div
			ref={ref}
			className={classNames('memberfile', {
				active: isActive,
			})}
			onClick={toggle}
		>
			{/* 如果沒有 vipLevelImage 則顯示 simple icon */}
			{userLevelImageInfo?.url ? (
				<Link href={paths.profile.root}>
					<a
						onClick={e => {
							// * 停止 toggle
							if (!includes(pathname, paths.profile.root)) {
								e.stopPropagation()
							}
						}}
					>
						<img src={userLevelImageInfo.url} alt={userLevelImageInfo.alt} />
					</a>
				</Link>
			) : (
				<Link href={paths.profile.root}>
					<i className='icon icon-member' onClick={e => e.stopPropagation()} />
				</Link>
			)}

			<button type='button'>{userInfo?.userName}</button>

			<div className='submenu'>
				<Link href={paths.profile.root} passHref>
					<a className=''>{t('Label_General_Profile')}</a>
				</Link>
				<Link href={paths.cryptoWallet.root} passHref>
					<a className=''>{t('Label_General_CryptoWallet')}</a>
				</Link>
				<Link href={paths.referral.root} passHref>
					<a className='icon '>{t('Label_General_ReferFriends')}</a>
				</Link>
				<Link href={paths.changePassword.root} passHref>
					<a className=''>{t('Label_General_ChangePassword')}</a>
				</Link>
			</div>
		</div>
	)
}

export default MemberFile
