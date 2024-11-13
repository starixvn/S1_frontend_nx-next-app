import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ReactMarquee from 'react-fast-marquee'

const HotGameMarquee = () => {
	const { push } = useRouter()
	const { hotGameData, handleHotGameClick } = useHome()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const children = hotGameData.map(game => {
		const { gameLogo, gameName, tpName, tpLogo, tpCategory } = game

		return (
			<div key={uniqueId()} className='hotGamModule'>
				<img src={gameLogo} alt={gameName} />
				<div className='hotgametitle'>
					<img src={tpLogo} alt={tpName} />
					<div>
						<div className='hotgame-name'>{gameName}</div>
						<div>
							{`${t(`Label_General_TpCategory${tpCategory}`)} ${tpName}`}
						</div>
					</div>
				</div>
				<div className='btn-group'>
					<button
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
						{t('Label_PlayNow')}
					</button>
				</div>
			</div>
		)
	})
	return children?.length > 0 ? (
		<>
			<div className='moduleTitle'>{t('Label_General_HotGames')}</div>
			<ReactMarquee speed={60} className='hotGame' gradient={false}>
				{children}
			</ReactMarquee>
		</>
	) : null
}

export { HotGameMarquee }
