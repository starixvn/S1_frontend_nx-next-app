import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useRouter } from 'next/router'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { IFooterData } from 'libs/web/src/app/types/footer'
import { openLiveChat } from '@nx-next-app/utils'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const ProgramList = ({
	programList = [],
}: {
	programList: IFooterData['programList']
}) => {
	const { t } = useTranslation()
	const { ALLOWED_CURRENCIES } = useStaticData()
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
			case 'Label_General_JoinNow':
				return (
					// * role 設為 link，讓爬蟲略過此標籤
					<a role='link' aria-hidden onClick={linkToReferral}>{`${t(
						hotKeyName
					)} >`}</a>
				)
			case 'Label_General_ApplyNow':
				return (
					<a
						href={applyNowLink}
						style={
							ALLOWED_CURRENCIES?.AFFILIATE?.includes(currencyId as number)
								? {}
								: { pointerEvents: 'none' }
						}
						target='_blank'
						rel='noreferrer'
					>
						{`${t(hotKeyName)} >`}
					</a>
				)
			case 'Label_General_MoreInfo':
				return (
					<a
						href={`/${langId}/${paths.vip.root}`}
						style={
							ALLOWED_CURRENCIES?.VIP?.includes(currencyId as number)
								? {}
								: { pointerEvents: 'none' }
						}
					>
						{`${t('Label_General_MoreInfo')} >`}
					</a>
				)
			case 'Label_Chat_Now':
				return (
					// * role 設為 link，讓爬蟲略過此標籤
					<a role='link' aria-hidden onClick={openLiveChat}>{`${t(
						'Label_Chat_Now'
					)} >`}</a>
				)
			default:
				return null
		}
	}

	if (programList.length === 0) return null

	return (
		<div className='item-wrapper'>
			{programList.map(
				({ icon, displayKey, description, hotKeyName, applyNowLink }) => (
					<div key={displayKey}>
						<div className={`title icon ${icon}`}>{t(displayKey)}</div>
						<div>{t(description)}</div>
						{hotKeyHandler(hotKeyName, applyNowLink)}
					</div>
				)
			)}
		</div>
	)
}

export default ProgramList
