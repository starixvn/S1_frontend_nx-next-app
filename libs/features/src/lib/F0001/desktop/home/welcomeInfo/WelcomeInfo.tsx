import { useGlobalModal } from "@nx-next-app/components/config-provider";
import { paths } from "@nx-next-app/constants";
import { useAuth, useStaticData } from "@nx-next-app/data-access";
import { WelcomeInfoContainer } from "@nx-next-app/features/F0001/desktop/home/welcomeInfo/styles";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { useHome } from "@nx-next-app/features/F0001/providers";
import { MenuActionTypeEnum } from "@nx-next-app/types";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../../modal/LiveStreamingModal'),
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
		<WelcomeInfoContainer className='content-container'>
			<div className='welcomeinfo-content join'>
				{isLogin ? (
					<>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/welcome-affiliate.webp`}
							alt='welcome-affilate'
						/>
						<div className='welcomeinfo-content-text'>
							<div className='title'>{t('Label_General_Affiliate')}</div>
							<div className='desc'>{t('Label_Affiliate_Program_desc')}</div>
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
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/welcome-join.webp`}
							alt='welcome-join'
						/>
						<div className='welcomeinfo-content-text'>
							<div className='title'>{t('Label_General_Join')}</div>
							<div className='desc'>{t('Label_Home_JoinDescription')}</div>
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
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/welcome-winning.webp`}
					alt='welcome-winning'
				/>
				<div className='welcomeinfo-content-text'>
					<div className='title'>{t('Label_Home_StartWinning')}</div>
					<div className='desc'>{t('Label_Home_StartWinningDescription')}</div>
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
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/welcome-vip.webp`}
					alt='welcome-vip'
				/>
				<div className='welcomeinfo-content-text'>
					<div className='title'>{t('Label_Home_GetReward')}</div>
					<div className='desc'>{t('Label_Home_GetRewardDescription')}</div>
				</div>
				<Link href={`${paths.promotion.root}`}>
					<button className='welcome-btn'>{t('Label_General_MoreInfo')}</button>
				</Link>
			</div>
			<div className='welcomeinfo-content referral'>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/new-ui/welcome-referral.webp`}
					alt='welcome-referral'
				/>
				<div className='welcomeinfo-content-text'>
					<div className='title'>{t('Label_Home_SimpleReferral')}</div>
					<div className='desc'>
						{t('Label_Home_SimpleReferralDescription')}
					</div>
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
		</WelcomeInfoContainer>
	)
}

export default WelcomeInfo
