import { uniqueId } from 'lodash-es'
import dynamic from 'next/dynamic'
import ReactMarquee from 'react-fast-marquee'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import { isUrl } from '@nx-next-app/utils'
import { useHome } from '@nx-next-app/features/F0001/providers'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

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
	const { hotGameData, handleHotGameClick } = useHome()

	const { modal } = useGlobalModal()

	const children = hotGameData.map(game => {
		const { gameLogo, gameName, tpName, tpLogo } = game

		return (
			<div
				key={uniqueId()}
				style={{
					width: '300px',
					margin: '0 15px',
				}}
				onClick={() =>
					handleHotGameClick(
						{
							game,
						},
						{
							underMaintenanceCallback: () =>
								modal.open(<UnderMaintenanceModal />),
							loginCallback: () => modal.open(<LoginModal />),
						}
					)
				}
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
