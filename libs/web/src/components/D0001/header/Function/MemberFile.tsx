import React, { useRef } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Image from 'next/image'
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
			{userLevelImageInfo?.url && (
				<>
					<div className='vipAnimation'>
						<div />
					</div>

					<Link href={paths.profile.root}>
						<a
							onClick={e => {
								// * 停止 toggle
								if (!includes(pathname, paths.profile.root)) {
									e.stopPropagation()
								}
							}}
						>
							<Image
								src={userLevelImageInfo.url}
								alt={userLevelImageInfo.alt}
								width={30}
								height={25}
							/>
						</a>
					</Link>
				</>
			)}

			<button type='button'>{userInfo?.userName}</button>

			<div className='submenu'>
				<Link href={paths.profile.root}>
					<a className=''>{t('Label_Profile')}</a>
				</Link>
				<Link href={paths.cryptoWallet.root}>
					<a className=''>{t('Label_CryptoWallet')}</a>
				</Link>
				<Link href={paths.referral.root}>
					<a className='icon '>{t('Label_ReferFriends')}</a>
				</Link>
				<Link href={paths.changePassword.root}>
					<a className=''>{t('Label_ChangePassword')}</a>
				</Link>
			</div>
		</div>
	)
}

export default MemberFile
