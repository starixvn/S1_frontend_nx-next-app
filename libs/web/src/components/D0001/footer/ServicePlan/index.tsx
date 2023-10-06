import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { IServicePlanData } from 'libs/web/src/app/types/footer'
import { openLiveChat } from '@nx-next-app/utils'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const ServicePlan = ({
	servicePlanData: { servicePlanList, allowedCurrencies },
}: {
	servicePlanData: IServicePlanData
}) => {
	const { t } = useTranslation()
	const {
		auth,
		userInfo: { langId, currencyId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const router = useRouter()
	const hotKeyHandler = (hotKeyName: string, applyNowLink: string) => {
		const linkToReferral = () => {
			// todo:呼叫登錄彈窗
			auth.isLogin
				? router.push(`/${langId}/${paths.referral.root}`)
				: modal.open(<LoginModal />)
		}

		switch (hotKeyName) {
			case 'Label_JoinNow':
				return <a onClick={linkToReferral}>{`${t(hotKeyName)} >`}</a>
			case 'Label_Apply_Now':
				return (
					<a
						href={applyNowLink}
						style={
							allowedCurrencies?.AFFILIATE?.includes(currencyId as number)
								? {}
								: { pointerEvents: 'none' }
						}
						target='_blank'
						rel='noreferrer'
					>
						{`${t(hotKeyName)} >`}
					</a>
				)
			case 'Label_More_Info':
				return (
					<a
						href={`/${langId}/${paths.vip.root}`}
						style={
							allowedCurrencies?.VIP?.includes(currencyId as number)
								? {}
								: { pointerEvents: 'none' }
						}
					>
						{`${t('Label_More_Info')} >`}
					</a>
				)
			case 'Label_Chat_Now':
				return <a onClick={openLiveChat}>{`${t('Label_Chat_Now')} >`}</a>
			default:
				return null
		}
	}
	return (
		<div className='item-wrapper'>
			{servicePlanList.map(
				({ icon, displayName, description, hotKeyName, applyNowLink }) => (
					<div key={displayName}>
						<div className={`title icon ${icon}`}>{t(displayName)}</div>
						<div>{t(description)}</div>
						{hotKeyHandler(hotKeyName, applyNowLink)}
					</div>
				)
			)}
		</div>
	)
}

export default ServicePlan
