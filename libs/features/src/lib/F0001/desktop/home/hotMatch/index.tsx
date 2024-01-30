import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { MenuActionTypeEnum } from '@nx-next-app/types'
import { PRODUCTS, paths } from '@nx-next-app/constants'
import { HotEventSwiper } from './HotEventSwiper'

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const LiveStreamingModalDesktop = dynamic(
	() => import('../../modal/LiveStreamingModal'),
	{ ssr: false }
)

const UnderMaintenanceModal = dynamic(
	() => import('../../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)

const Index = () => {
	const { t } = useTranslation()
	const { onStaticMenuOpen } = useMenu()
	const { modal } = useGlobalModal()

	// * 靜態遊戲
	const soccerItem = {
		...PRODUCTS.Soccer,
		desktop: { menuActionType: MenuActionTypeEnum.Link },
		pathname: paths.sports.root,
		query: { provider: 'Soccer' },
	}

	const basketballItem = {
		...PRODUCTS.Basketball,
		desktop: { menuActionType: MenuActionTypeEnum.Link },
		pathname: paths.sports.root,
		query: { provider: 'Basketball' },
	}

	const badmintonSportItem = {
		...PRODUCTS.Badminton,
		pathname: paths.sports.root,
		query: { provider: 'Badminton' },
		desktop: { menuActionType: MenuActionTypeEnum.Link },
	}

	return (
		<div className='hotmatch'>
			<div className='hotmatch-wrapper'>
				<div className='hotmatch-top'>
					<img
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/hotmatch-logo.png`}
						alt='logo'
					/>
					<div>{t('Label_General_Sports').toUpperCase()}</div>
				</div>
				<HotEventSwiper />
				<div className='hotsports'>
					<div className='hotsports-item'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-soccer.png`}
							alt='sports-soccer'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(soccerItem, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_BetNow')}
						</button>
					</div>
					<div className='hotsports-item'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-badminton.png`}
							alt='sports-badminton'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(badmintonSportItem, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_BetNow')}
						</button>
					</div>
					<div className='hotsports-item'>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-basketball.png`}
							alt='sports-basketball'
						/>
						<button
							className='all-btn'
							onClick={() => {
								onStaticMenuOpen(basketballItem, {
									loginCallback: () => modal.open(<LoginModal />),
									underMaintenanceCallback: () =>
										modal.open(<UnderMaintenanceModal />),
									messageCallBack: message => modal.error(message),
									liveStreamingCallback: () =>
										modal.open(<LiveStreamingModalDesktop />),
								})
							}}
						>
							{t('Label_General_BetNow')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Index as HotMatch }
