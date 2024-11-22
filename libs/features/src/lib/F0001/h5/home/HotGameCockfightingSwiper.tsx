import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { isUrl } from '@nx-next-app/utils'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {  TpCategory } from '@nx-next-app/service'

export const DynamicSwiper = dynamic(() => import('react-id-swiper'), {
	ssr: false,
})

const config = {
	shouldSwiperUpdate: true,
	containerClass: 'hotgame-container',
	slidesPerView: 3.2,
	spaceBetween: 10,
}

const HotGameCockfightingSwiper = () => {
	const { push } = useRouter()
	const { hotGameData, handleHotGameClick } = useHome()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const { ALLOWED_CURRENCIES } = useStaticData()
	const {
		userInfo: { currencyId },
	} = useAuth()

  const hotGameCockfighting = hotGameData.filter((element) => {
    return element.tpCategory === TpCategory.Cockfighting;
  })

	const children = hotGameCockfighting?.map(game => {
		const { gameLogo, gameName } = game

		return (
			<div
				key={gameName}
				onClick={() =>
					handleHotGameClick(
						{ game },
						{
							underMaintenanceCallback: () => {
								modal.info(t('Label_underMaintenance'), {
									title: t('Label_General_ImportantNote'),
								})
							},
							loginCallback: () => push(paths.login.root),
						}
					)
				}
			>
				<a>
					<div className='hotgame-item'>
						{isUrl(gameLogo) ? (
							<img src={gameLogo} alt={gameName} />
						) : (
							<img src={gameLogo} alt={gameName} />
						)}
						<span>{gameName}</span>
					</div>
				</a>
			</div>
		)
	})

	return children?.length > 0 ? (
		<>
			<div className='home-title'>Slots</div>
			<div className='home-hotgame'>
				<div className='hotgame-bn'>
					<img
						src={`${
							process.env['NEXT_PUBLIC_BANNER_HOST']
						}/h5/img/4.0/hotgame-bn${
							ALLOWED_CURRENCIES['SLOTS_PP']?.includes(currencyId)
								? ''
								: '-spad'
						}.png`}
						alt='Hot Game'
					/>
				</div>
				<div className='home-hotgame-swiper'>
					<DynamicSwiper {...config}>{children}</DynamicSwiper>
				</div>
			</div>
		</>
	) : null
}

export default HotGameCockfightingSwiper
