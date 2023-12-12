import React from 'react'
import Link from 'next/link'
import { Header } from '@nx-next-app/components/H0001'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useGetMsgCountQuery } from '@nx-next-app/service'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import Image from 'next/future/image'
import { CurrenciesEnum } from '@nx-next-app/types'

const MyAccount = () => {
	const { t } = useTranslation()
	const { VIP_CLUB_IMAGES, ALLOWED_CURRENCIES } = useStaticData()
	const {
		auth: { isLogin },
		userInfo: { currencyId, userName, userLevel },
	} = useAuth()

	const { data: { data: msgCount = 0 } = {} } = useGetMsgCountQuery(null, {
		skip: !isLogin,
	})

	const userLevelImageInfo = VIP_CLUB_IMAGES[(userLevel as number) - 1]

	return (
		<>
			<Header className='header'>
				<Header.Tag title={t('Label_General_MyAccount') as string} />
			</Header>
			<main className='main'>
				{userLevelImageInfo?.url ? (
					<div className='vip_mark'>
						<Image
							src={userLevelImageInfo?.url}
							alt={userLevelImageInfo?.alt}
							width={126}
							height={106}
						/>
						{includes(
							ALLOWED_CURRENCIES['VIP'] as CurrenciesEnum[],
							currencyId
						) && <div>{t(userLevelImageInfo?.displayKey as string)}</div>}
					</div>
				) : (
					<div className='icon icon-member' />
				)}
				<div className='name'>{userName}</div>
				<div className='myAccount'>
					<Link href={paths.profile.root}>
						<a>
							<div className='icon icon-member' />
							<div>{t('Label_General_Profile')}</div>
						</a>
					</Link>
					{includes(ALLOWED_CURRENCIES['REFER_FRIENDS'], currencyId) && (
						<Link href={paths.referral.root}>
							<a>
								<div className='icon icon-friendreferral' />
								<div>{t('Label_General_ReferFriends')}</div>
							</a>
						</Link>
					)}

					<Link href={paths.changePassword.root}>
						<a>
							<div className='icon icon-icon32px_password' />
							<div>{t('Label_General_ChangePassword')}</div>
						</a>
					</Link>
					<Link href={paths.message.root}>
						<a>
							<div className='icon icon-envelope'>
								{msgCount > 0 && <i className='quantity'>{msgCount}</i>}
							</div>
							<div>{t('Label_General_Message')}</div>
						</a>
					</Link>
					<Link href={paths.wallet.root}>
						<a>
							<div className='icon icon-icon32px_wallet' />
							<div>{t('Label_General_MyWallet')}</div>
						</a>
					</Link>
					<Link href={paths.bankInfo.root}>
						<a>
							<div className='icon icon-icon32px_bank-account' />
							<div>{t('Label_General_BankInfo')}</div>
						</a>
					</Link>
				</div>
			</main>
		</>
	)
}

export default MyAccount
