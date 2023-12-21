import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { ISubMenu } from '@nx-next-app/types'
import { head } from 'lodash-es'

const LoginModal = dynamic(
	() => import('@nx-next-app/features/F0001/desktop/modal/LoginModal'),
	{
		ssr: false,
	}
)

const FishingList = () => {
	const { modal } = useGlobalModal()
	const { t } = useTranslation()
	const {
		menuData: {
			FourD: { subMenu },
		},
		onMenuOpen,
	} = useMenu()

	const onItemClick = (item: ISubMenu) => {
		onMenuOpen(item, {
			loginCallback: () => modal.open(<LoginModal />),
		})
	}

	return (
		<div className='lobby-content'>
			{subMenu?.map(item => {
				const { isTpMaintain, eventIcons, desktop, displayKey, displayText } =
					item
				return (
					<div
						className={classNames('lobby-content-item', {
							under: isTpMaintain,
						})}
					>
						<div className='img-wrapper'>
							{head(eventIcons) && head(eventIcons)?.icon && (
								<div className={head(eventIcons)?.icon}>
									{head(eventIcons)?.text}
								</div>
							)}
							<img
								src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/lobby-4d/${desktop?.lobbyPage?.npcImg}`}
								alt={desktop?.lobbyPage?.npcImg || 'four-img'}
							/>
							<div className='btn-container'>
								<button onClick={() => onItemClick(item)}>
									{t('Label_General_PlayNow')}
								</button>
							</div>
						</div>
						<div className='lobby-title'>
							{t(displayKey || '') || displayText}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default FishingList
