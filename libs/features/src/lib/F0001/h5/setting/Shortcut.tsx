import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { includes } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Shortcut = () => {
	const { t } = useTranslation()

	const { push } = useRouter()

	const { ALLOWED_CURRENCIES, LIVE_CHAT_ID_BY_LANG_ID, GET_AFFILIATE_LINK } =
		useStaticData()

	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()

	const navigatePath = (page: string) =>
		isLogin ? push(page) : push(paths.login.root)

	return (
		<div className='menu-center'>
			<a onClick={() => navigatePath(paths.profile.root)}>
				<i className='icon icon-user-2-fill' />
				<span>{t('Label_General_Profile')}</span>
			</a>
			<Link href={paths.promotion.root}>
				<a>
					<i className='icon icon-gift-fill' />
					<span>{t('Label_General_Promotion')}</span>
				</a>
			</Link>
			{includes(ALLOWED_CURRENCIES['VIP'], currencyId) && (
				<Link href={paths.vip.root}>
					<a>
						<i className='icon icon-vip-fill' />
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
						<i className='icon icon-ranking' />
						<span>{t('Label_General_LeaderBoard')}</span>
					</a>
				</Link>
			)}
			<a onClick={() => navigatePath(paths.referral.root)}>
				<i className='icon icon-team-fill' />
				<span>{t('Label_General_Referral')}</span>
			</a>
			{/* TODO: Hide in phase 1 */}
			{/* {includes(ALLOWED_CURRENCIES['AFFILIATE'], currencyId) && (
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
			)} */}
			{/* <Link href={paths.milestones.root}>
				<a>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/milestone.png`}
						alt='milestone'
					/>
					<span>{t('Label_General_Milestone')}</span>
				</a>
			</Link> */}
			{/* <a onClick={() => navigatePath(paths.selfExclusion.root)}>
				<img
					className='exclusion-icon'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/exclusion.png`}
					alt='exclusion'
				/>
				<span>{t('Label_General_SelfExclusion')}</span>
			</a> */}
			{isLogin && (
				<Link href={paths.survey.root}>
					<a>
						<i className='icon icon-chat-poll-line' />
						<span>{t('Label_General_Survey')}</span>
					</a>
				</Link>
			)}
		</div>
	)
}

export default Shortcut
