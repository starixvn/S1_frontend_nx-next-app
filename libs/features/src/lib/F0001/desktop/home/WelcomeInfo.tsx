import Link from 'next/link'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { paths } from '@nx-next-app/constants'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { MenuActionTypeEnum } from '@nx-next-app/types'
import { useHome } from '@nx-next-app/features/F0001/providers'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../modal/LiveStreamingModal'),
	{ ssr: false }
)

const WelcomeInfo = () => {
	const { t } = useTranslation()
	const { PRODUCTS } = useStaticData()
	const { onMenuOpen } = useMenu()
	const { modal } = useGlobalModal()
	const {
		auth: { isLogin },
	} = useAuth()
	const {
		affiliateData: { link },
	} = useHome()
	// 開法跟 menuData 內定義的不同，故另外寫物件餵給 onMenuOpen
	const sportSoccerItem = {
		...PRODUCTS.Soccer,
		desktop: {
			menuActionType: MenuActionTypeEnum.EnterPage,
		},
	}

	return (
		<div className='welcomeinfo'>
			<div className='welcomeinfo-content join'>
				{isLogin ? (
					<>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/welcome-affiliate.png`}
							alt='welcome-affilate'
							width={400}
							height={450}
						/>
						<div className='welcomeinfo-content-text'>
							<div>{t('Label_General_Affiliate')}</div>
							<span>{t('Label_Affiliate_Program_desc')}</span>
						</div>
						<a
							href={link}
							className='welcome-btn'
							target='_blank'
							rel='noreferrer'
						>
							{t('Label_General_MoreInfo')}
						</a>
					</>
				) : (
					<>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/welcome-join.png`}
							alt='welcome-join'
							width={400}
							height={450}
						/>
						<div className='welcomeinfo-content-text'>
							<div>{t('Label_General_Join')}</div>
							<span>{t('Label_Home_JoinDescription')}</span>
						</div>
						<Link href={`${paths.join.root}`}>
							<button className='welcome-btn'>
								{t('Label_General_MoreInfo')}
							</button>
						</Link>
					</>
				)}
			</div>
			<div className='welcomeinfo-content winning'>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/welcome-winning.png`}
					alt='welcome-winning'
					width={400}
					height={450}
				/>
				<div className='welcomeinfo-content-text'>
					<div>{t('Label_Home_StartWinning')}</div>
					<span>{t('Label_Home_StartWinningDescription')}</span>
				</div>
				<button
					className='welcome-btn'
					onClick={() => {
						onMenuOpen(sportSoccerItem, {
							loginCallback: () => modal.open(<LoginModal />),
							messageCallBack: message => modal.error(message),
							liveStreamingCallback: () =>
								modal.open(<LiveStreamingModalDesktop />),
						})
					}}
				>
					{t('Label_General_MoreInfo')}
				</button>
			</div>
			<div className='welcomeinfo-content reward'>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/welcome-vip.png`}
					alt='welcome-vip'
					width={400}
					height={450}
				/>
				<div className='welcomeinfo-content-text'>
					<div>{t('Label_Home_GetReward')}</div>
					<span>{t('Label_Home_GetRewardDescription')}</span>
				</div>
				<Link href={`${paths.promotion.root}`}>
					<button className='welcome-btn'>{t('Label_General_MoreInfo')}</button>
				</Link>
			</div>
			<div className='welcomeinfo-content referral'>
				<Image
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/welcome-referral.png`}
					alt='welcome-referral'
					width={400}
					height={450}
				/>
				<div className='welcomeinfo-content-text'>
					<div>{t('Label_Home_SimpleReferral')}</div>
					<span>{t('Label_Home_SimpleReferralDescription')}</span>
				</div>
				{isLogin ? (
					<Link href={`${paths.referral.root}`}>
						<button className='welcome-btn'>
							{t('Label_General_MoreInfo')}
						</button>
					</Link>
				) : (
					<button
						className='welcome-btn'
						onClick={() => modal.open(<LoginModal />)}
					>
						{t('Label_General_MoreInfo')}
					</button>
				)}
			</div>
		</div>
	)
}

export { WelcomeInfo }
