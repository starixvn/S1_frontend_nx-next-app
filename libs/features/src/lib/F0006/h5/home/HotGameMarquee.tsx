import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import ReactMarquee from 'react-fast-marquee'
import { useHome } from '@nx-next-app/features/F0006/providers'
import { uniqueId } from 'lodash-es'
import { isUrl } from '@nx-next-app/utils'
import { useRouter } from 'next/router'
import { paths } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'

const HotGameMarquee = () => {
	const { push } = useRouter()
	const { hotGameData, handleHotGameClick } = useHome()
	const { t } = useTranslation()
	const { modal } = useGlobalModal()

	const children = hotGameData.map(game => {
		const { gameLogo, gameName, tpName, tpLogo, tpCategory } = game

		return (
			<div key={uniqueId()} className='hotGamModule'>
				{isUrl(gameLogo) ? (
					<Image src={gameLogo} width={260} height={151} alt={gameName} />
				) : (
					<img src={gameLogo} alt={gameName} />
				)}
				<div className='hotgametitle'>
					{isUrl(tpLogo) ? (
						<Image src={tpLogo} alt={tpName} width={120} height={55} />
					) : (
						<img alt={tpName} src={tpLogo} />
					)}
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
	return children.length > 0 ? (
		<>
			<div className='moduleTitle'>{t('Label_General_HotGames')}</div>
			<ReactMarquee speed={60} className='hotGame' gradient={false}>
				{children}
			</ReactMarquee>
		</>
	) : null
}

export { HotGameMarquee }
