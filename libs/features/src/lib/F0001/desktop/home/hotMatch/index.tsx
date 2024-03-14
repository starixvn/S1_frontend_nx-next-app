import dynamic from 'next/dynamic'
import { find, isUndefined } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

import { HotEventSwiper } from './HotEventSwiper'

const LoginModal = dynamic(() => import('../../modal/LoginModal'), {
	ssr: false,
})

const Index = () => {
	const { t } = useTranslation()
	const { menuData, onMenuOpen } = useMenu()
	const { modal } = useGlobalModal()

	const sportMenu = menuData.Sports?.subMenu

	const soccerGame = find(
		sportMenu,
		menu => menu.productKey === 'SPORTS_SOCCER'
	)

	const badmintonSport = find(
		sportMenu,
		menu => menu.productKey === 'SPORTS_BADMINTON'
	)

	const basketBallGame = find(
		sportMenu,
		menu => menu.productKey === 'SPORTS_BASKETBALL'
	)

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
								if (!isUndefined(soccerGame)) {
									onMenuOpen(soccerGame, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
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
								if (!isUndefined(badmintonSport)) {
									onMenuOpen(badmintonSport, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
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
								if (!isUndefined(basketBallGame)) {
									onMenuOpen(basketBallGame, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
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

export default Index
