import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Shortcut = () => {
	const { t } = useTranslation()

	const { push } = useRouter()

	const { ALLOWED_CURRENCIES, GET_AFFILIATE_LINK } = useStaticData()

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	const navigatePath = (page: string) =>
		isLogin ? push(page) : push(paths.login.root)

	return (
		<div className='menu-center'>
			<a onClick={() => navigatePath(paths.profile.root)}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/profile.png`}
					alt='profile'
				/>
				<span>{t('Label_General_Profile')}</span>
			</a>
			<Link href={paths.promotion.root}>
				<a>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/promos.png`}
						alt='promos'
					/>
					<span>{t('Label_General_Promotion')}</span>
				</a>
			</Link>
			{includes(ALLOWED_CURRENCIES['VIP'], currencyId) && (
				<Link href={paths.vip.root}>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/vip.png`}
							alt='vip'
						/>
						<span>VIP</span>
					</a>
				</Link>
			)}
			{/* TODO: 應映需求先將能通往Rewards的入口拿掉 */}
			{/* {includes(ALLOWED_CURRENCIES['REWARDS'], currencyId) && (
				<a href='/rewards' target='_blank' rel='noreferrer'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/88reward.png`}
						alt='88reward'
					/>
					<span>{t('Label_General_88Reward')}</span>
				</a>
			)} */}
			{includes(ALLOWED_CURRENCIES['LEADER_BOARD'], currencyId) && (
				<Link href={paths.leaderBoard.root}>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/ranking.png`}
							alt='ranking'
						/>
						<span>{t('Label_General_LeaderBoard')}</span>
					</a>
				</Link>
			)}
			<a onClick={() => navigatePath(paths.referral.root)}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/referral.png`}
					alt='referral'
				/>
				<span>{t('Label_General_Referral')}</span>
			</a>
			{isLogin && (
				<Link href={paths.setting.root}>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/setting.png`}
							alt='setting'
						/>
						<span>{t('Label_General_Setting')}</span>
					</a>
				</Link>
			)}
			{includes(ALLOWED_CURRENCIES['AFFILIATE'], currencyId) && (
				<a
					href={
						GET_AFFILIATE_LINK ? GET_AFFILIATE_LINK({ currencyId, langId }) : ''
					}
					target='_blank'
					rel='noreferrer noopener'
				>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/aff.png`}
						alt='aff'
					/>
					<span>{t('Label_Affiliate_Program')}</span>
				</a>
			)}
			{/* TODO 先 hardcode 寫死，之後改回來  */}
			{process.env['NEXT_PUBLIC_SITE_NAME'] !== 'noble888' && (
				<Link href={paths.milestones.root}>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/milestone.png`}
							alt='milestone'
						/>
						<span>{t('Label_General_Milestone')}</span>
					</a>
				</Link>
			)}
			<a onClick={() => navigatePath(paths.selfExclusion.root)}>
				<img
					className='exclusion-icon'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/exclusion.png`}
					alt='exclusion'
				/>
				<span>{t('Label_General_SelfExclusion')}</span>
			</a>
			{isLogin && (
				<Link href={paths.survey.root}>
					<a>
						<img
							className='exclusion-icon'
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/survey.png`}
							alt='survey'
						/>
						<span>{t('Label_General_Survey')}</span>
					</a>
				</Link>
			)}
			{includes(ALLOWED_CURRENCIES['PREDICTION_CHALLENGE'], currencyId) && (
				<Link href={paths.predictionChallenge.root}>
					<a>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/prediction.png`}
							alt='prediction'
						/>
						<span>{t('Label_Event_Prediction_Challenge')}</span>
					</a>
				</Link>
			)}
		</div>
	)
}

export default Shortcut
