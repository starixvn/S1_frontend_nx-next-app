import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useGetRetentionPromotionQuery } from '@nx-next-app/service'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const EventTabs = () => {
	const { t } = useTranslation()
	const { pathname, push } = useRouter()

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	const hasRetentionBonus = useGetRetentionPromotionQuery(
		{ langId },
		{ skip: !isLogin }
	)?.data?.data?.bonusCode

	const { ALLOWED_CURRENCIES } = useStaticData()

	const tabs = [
		{
			name: t('Label_LuckyWheel_Title'),
			path: paths.luckyWheel.root,
			access: includes(ALLOWED_CURRENCIES['LUCKY_WHEEL'], currencyId),
		},
		{
			name: t('Label_General_Lottery'),
			path: paths.event.lottery.root,
			access: isLogin,
		},
		{
			name: t('Label_Retention_SurpriseReward'),
			path: paths.retention.root,
			access: hasRetentionBonus,
		},
	].filter(({ access }) => access)

	return tabs.length > 1 ? (
		<div className='eventpage-tap' style={{ zIndex: 1 }}>
			{tabs.map(({ name, path }) => (
				<button
					key={path}
					onClick={() => push(path)}
					className={path === pathname ? 'active' : undefined}
				>
					{name}
				</button>
			))}
		</div>
	) : null
}
