import { useTranslation } from 'next-i18next'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { filter, find, isUndefined } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const ProvidersBlock = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { menuData, onMenuOpen } = useMenu()
	const liveCasinoMenu = menuData.Casino.subMenu
	const slotMenu = menuData.Slot.subMenu
	const lotteryMenu = menuData.Lottery.subMenu
	const fourDMenu = menuData.FourD?.subMenu

	const providerKeys = [
		{ item: menuData.Sports, imgName: 'saba' },
		{
			item: find(
				liveCasinoMenu,
				obj => obj.productKey === 'LIVE_CASINO_ALL_BET'
			),
			imgName: 'all',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_DG'),
			imgName: 'dg',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_AG'),
			imgName: 'ag',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_AE'),
			imgName: 'sexy',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_SA'),
			imgName: 'sa',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_PP'),
			imgName: 'pp',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_BG'),
			imgName: 'bg',
		},
		{
			item: find(
				liveCasinoMenu,
				obj => obj.productKey === 'LIVE_CASINO_YEE_BET'
			),
			imgName: 'yb',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_MGPSW'),
			imgName: 'mic',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_PT'),
			imgName: 'pt',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_YGG'),
			imgName: 'ygg',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_JOKER'),
			imgName: 'joker',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SG'),
			imgName: 'spad',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_JILI'),
			imgName: 'jili',
		},
		{
			item: find(lotteryMenu, obj => obj.productKey === 'LOTTERY_TCG'),
			imgName: 'tc',
		},
		{
			item: find(
				menuData.Game.subMenu,
				obj => obj.productKey === 'GAMES_POKER_M_POKER'
			),
			imgName: 'mp',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_RED_TIGER'),
			imgName: 'red',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_NET_ENT'),
			imgName: 'net',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_ADVANT_PLAY'),
			imgName: 'ap',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_EVO'),
			imgName: 'evo',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_HABANERO'),
			imgName: 'ha',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SIMPLE_PLAY'),
			imgName: 'simple',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SKY_WIND'),
			imgName: 'sky',
		},
		// TODO
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SKY_WIND'),
			imgName: 'next',
		},
		{
			item: find(
				menuData.ESports.subMenu,
				obj => obj.productKey === 'SPORTS_E_IMESPORTS'
			),
			imgName: 'im-esports',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SPRIBE'),
			imgName: 'spribe',
		},
		// TODO
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_SPRIBE'),
			imgName: 'png',
		},
		// TODO
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_ENDORPHINA'),
			imgName: 'es',
		},
		{
			item: find(liveCasinoMenu, obj => obj.productKey === 'LIVE_CASINO_WE'),
			imgName: 'we',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_AMB'),
			imgName: 'askme',
		},
		// TODO
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_AMB'),
			imgName: 'fachai',
		},
		// TODO
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_AMB'),
			imgName: 'pegasus',
		},
		{
			item: find(slotMenu, obj => obj.productKey === 'SLOTS_AMIGO'),
			imgName: 'amigo',
		},
		{
			item: find(fourDMenu, obj => obj.productKey === 'FOUR_D_GRAND_DRAGON'),
			imgName: 'haolong',
		},
	]

	const filteredProviders = filter(
		providerKeys,
		provider => !isUndefined(provider.item)
	)

	return (
		<>
			<div className='partner-title'>{t('Label_Home_HonorablePartner')}</div>
			<div className='partner-logo'>
				{filteredProviders.map(provider => {
					const { imgName, item } = provider
					return (
						<a
							onClick={() => {
								if (item) {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									onMenuOpen(item, {
										loginCallback: () => modal.open(<LoginModal />),
									})
								}
							}}
							key={imgName}
						>
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/providers-logo/${imgName}.png`}
								alt={`img-${imgName}`}
							/>
						</a>
					)
				})}
			</div>
		</>
	)
}

export { ProvidersBlock }
