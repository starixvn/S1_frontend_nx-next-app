import { useHome } from '@nx-next-app/features/F0001/providers'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@nx-next-app/data-access'
import Link from 'next/link'
import { paths } from '@nx-next-app/constants'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const ReferralModal = dynamic(() => import('../modal/ReferralModal'), {
	ssr: false,
})

const FriendReferral = () => {
	const { t } = useTranslation()
	const {
		referralData: { referralCode, referralBonus },
	} = useHome()
	const {
		userInfo: { currencyId },
		auth: { isLogin },
	} = useAuth()
	const { modal } = useGlobalModal()

	if (!isLogin) return null

	return (
		<>
			<div className='moduleTitle icon icon-friend'>
				{t('Label_General_FriendReferral').toUpperCase()}
			</div>
			<div className='friendReferral'>
				<div>
					<div className='title'>
						{`${t('Label_General_Free')} ${t(`Label_Currency_${currencyId}`)} `}
						{referralBonus}
					</div>
					<div>{t('Label_Referral_ReferralIntro')}</div>
					<br />
					<Link href={paths.referral.root}>
						{t('Label_Referral_ToReferral')}
					</Link>
				</div>
				<div>
					<div>{referralCode}</div>
					<div
						className='btn-group'
						onClick={() =>
							modal.open(<ReferralModal referralCode={referralCode} />, {
								className: 'referralShare',
							})
						}
					>
						<button className='title'>{t('Label_General_Share')}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export { FriendReferral }
