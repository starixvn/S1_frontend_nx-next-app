import { uniqueId } from 'lodash-es'
import dynamic from 'next/dynamic'
import ReactMarquee from 'react-fast-marquee'
import Image from 'next/future/image'
import { IHotGame } from '@nx-next-app/service'
import { useAuth, useGlobalData } from '@nx-next-app/data-access'
import { CategoryEnum, GameTypeEnum } from '@nx-next-app/features/F0001/types'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useTranslation } from 'next-i18next'
import { isUrl } from '@nx-next-app/utils'

import { useHome } from './HomeContext'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const UnderMaintenanceModal = dynamic(
	() => import('../modal/UnderMaintainModal'),
	{
		ssr: false,
	}
)
const HotGameMarquee = () => {
	const { t } = useTranslation()
	const {
		userInfo: { langId },
	} = useAuth()
	const { hotGameData } = useHome()

	const { tpMaintainList } = useGlobalData()
	const { modal } = useGlobalModal()
	const { onEnterSlotsPage, onEnterPage } = useMenu()

	const handleLoginModal = () => modal.open(<LoginModal />)
	const handleClick = ({
		game,
		isInMaintain,
	}: {
		game: IHotGame
		isInMaintain: boolean
	}) => {
		const { tpId, gameId, tpCategory, tpGameType } = game ?? {}
		if (isInMaintain) {
			modal.open(<UnderMaintenanceModal />)
		} else if (tpCategory === CategoryEnum.SLOTS) {
			onEnterSlotsPage(
				{ tpId: String(tpId), gameId, tpGameType: String(tpGameType) },
				{ loginCallback: handleLoginModal }
			)
		} else {
			onEnterPage(
				{ tpId, gameId, tpGameType, langId },
				{ loginCallback: handleLoginModal }
			)
		}
	}

	const children = hotGameData.map(game => {
		const { gameLogo, gameName, tpName, tpLogo } = game
		const isInMaintain = tpMaintainList?.some(
			maintain =>
				maintain.tpId === game.tpId &&
				(maintain.tpGameType === game.tpGameType ||
					maintain.tpGameType === GameTypeEnum.All)
		)

		return (
			<div
				key={uniqueId()}
				style={{
					width: '300px',
					margin: '0 15px',
				}}
				onClick={() => handleClick({ game, isInMaintain })}
			>
				{isUrl(gameLogo) ? (
					<Image src={gameLogo} width={260} height={151} alt={gameName} />
				) : (
					<img src={gameLogo} alt={gameName} />
				)}
				<div>
					<div className='title'>{gameName}</div>
					<div>{tpName}</div>
				</div>
				{isUrl(tpLogo) ? (
					<Image src={tpLogo} alt={tpName} width={120} height={55} />
				) : (
					<img alt={tpName} src={tpLogo} />
				)}
			</div>
		)
	})

	return children.length > 0 ? (
		<>
			<div className='moduleTitle'>{t('Label_General_HotGames')}</div>
			<div className='hotGame'>
				<ReactMarquee speed={145} pauseOnHover>
					<div className='swiper-container'>
						<div className='swiper-wrapper' style={{ display: 'flex' }}>
							{children}
						</div>
					</div>
				</ReactMarquee>
			</div>
		</>
	) : null
}

export { HotGameMarquee }
