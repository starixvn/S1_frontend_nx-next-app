import { paths } from '@nx-next-app/constants'
import { useGlobalData } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { MenuIconTypeEnum, MenuKeyEnum } from '@nx-next-app/types'
import { isEventPeriod } from '@nx-next-app/utils'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, startTransition, useEffect } from 'react'

interface IMenuProps {
	menuKey: keyof typeof MenuKeyEnum | undefined
	setMenuKey: Dispatch<SetStateAction<keyof typeof MenuKeyEnum>>
}

const MainMenu = ({ menuKey, setMenuKey }: IMenuProps) => {
	const { t } = useTranslation()
	const { getBannerUrl } = useGlobalData()
	const { menuList = [], isLobbyHeaderError } = useMenu()
	const {
		query: { prevPageRecord },
		push,
	} = useRouter()

	// * 若是之前進入過 slot 頁面 ，點左上角返回後 main Menu 須在 Slot
	useEffect(() => {
		if (prevPageRecord === MenuKeyEnum.Slot) {
			startTransition(() => {
				setMenuKey(prevPageRecord)
			})
		}
	}, [])

	return (
		<div className='home-sidebar'>
			{menuList.map(mainMenuItem => {
				const { display, category, h5, displayKey, subMenu } =
					mainMenuItem || {}
				if (display === 'desktop') return null
				const { icon } = h5 || {}

				// * 查看 subMenu 是否有在顯示範圍的 New Icon( 手機貌似只有 New Tag )
				const hasNewIcon = subMenu.some(subMenuItem => {
					const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

					return (
						isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
						iconType === MenuIconTypeEnum.New
					)
				})

				const menuText = (displayKey && t(displayKey)) || ''

				return (
					<button
						className={classNames(`btn-${icon}`, {
							active: menuKey === category,
						})}
						key={category}
						onClick={() => {
							startTransition(() => {
								setMenuKey(category)
							})
						}}
					>
						{hasNewIcon && <div className='new-icon'>New</div>}
						<div className='btn-circle'>
							<img
								src={getBannerUrl(`/h5/img/4.0/${icon}-icon.png`)}
								alt={icon}
							/>
						</div>
						<div className='text'>{menuText}</div>
					</button>
				)
			})}

			{isLobbyHeaderError && (
				<button
					className='btn-slots active'
					onClick={() => {
						push(paths.slots.root)
					}}
				>
					<div className='btn-circle'>
						<img src={getBannerUrl('/h5/img/4.0/slots-icon.png')} alt='slots' />
					</div>
					<div className='text'>{t('Label_General_Slots')}</div>
				</button>
			)}
		</div>
	)
}

export default MainMenu
