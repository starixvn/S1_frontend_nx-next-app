import dynamic from 'next/dynamic'
import Image from 'next/future/image'
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

	const cryptoSport = find(
		sportMenu,
		menu => menu.productKey === 'SPORTS_CRYPTO_SPORTS'
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
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-soccer.png`}
							alt='sports-soccer'
							width={900}
							height={600}
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
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-crypto.png`}
							alt='sports-crypto'
							width={900}
							height={600}
						/>
						<button
							className='all-btn'
							onClick={() => {
								if (!isUndefined(cryptoSport)) {
									onMenuOpen(cryptoSport, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
							}}
						>
							{t('Label_General_BetNow')}
						</button>
					</div>
					<div className='hotsports-item'>
						<Image
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-sports-basketball.png`}
							alt='sports-basketball'
							width={900}
							height={600}
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

export { Index as HotMatch }
