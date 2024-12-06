import { paths } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import { MenuContainer } from "@nx-next-app/features/F0001/h5/home/menu/styles";
import { IMergedMenuData } from "@nx-next-app/features/F0001/hooks";
import { CurrenciesEnum, IDynamicSubMenuItem, LobbyCategoryEnum, MenuIconTypeEnum, MenuKeyEnum } from "@nx-next-app/types";
import { isEventPeriod } from "@nx-next-app/utils";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { startTransition, useEffect, useState } from "react";

interface IMenuProps {
	menuList: IMergedMenuData[]
	onMenuOpen: (
		item: IDynamicSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
			liveStreamingCallback,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
			liveStreamingCallback: () => void
		}
	) => void
	isLobbyHeaderError: boolean
}

const MainMenu = ({ menuList, onMenuOpen, isLobbyHeaderError }: IMenuProps) => {
	const { t } = useTranslation()
	const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 'auto' })
	const {
		query: { prevPageRecord },
		push,
	} = useRouter()

	const {
		userInfo: { currencyId },
	} = useAuth()

	// 7/16/24 因應 hotfix遮蔽saba sport,根據語系設定初始 menuKey
	const defaultMenuKey =
		currencyId === CurrenciesEnum.USD || currencyId === CurrenciesEnum.CNY
			? 'Casino'
			: 'Sports'

	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | undefined>(
		defaultMenuKey
	)

	// * 若是之前進入過 slot 頁面 ，點左上角返回後 main Menu 須在 Slot
	useEffect(() => {
		if (prevPageRecord === MenuKeyEnum.Slot) {
			startTransition(() => {
				setMenuKey(prevPageRecord)
			})
		}
	}, [])

  const menus = menuList.map(mainMenuItem => {
    const {
      display,
      category,
      h5,
      displayKey,
      subMenu,
      pathname,
      lobbyCategoryId,
    } = mainMenuItem || {}
    if (display === 'desktop') return null
    const { icon } = h5 || {}

    // * 查看 subMenu 是否有在顯示範圍的 New Icon( 手機貌似只有 New Tag )
    const hasNewIcon = subMenu.some(subMenuItem => {
      const { iconType, iconStartTime, iconEndTime } =
        subMenuItem || {}

      return (
        isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
        iconType === MenuIconTypeEnum.New
      )
    })

    const menuText = (displayKey && t(displayKey)) || ''

    return (
      <button
        className={classNames('embla__slide menu-item', {
          active: menuKey === category,
        })}
        key={lobbyCategoryId}
        onClick={() => {
          startTransition(() => {
            setMenuKey(category)
            push(`${pathname}`)
      })
        }}
      >
        {hasNewIcon && <div className='new-icon'>New</div>}

        <div>{menuText}</div>
      </button>
    )
  })

	return (
		<MenuContainer>
			<div className='embla'>
				<div className='embla__viewport' ref={emblaRef}>
					<div className='embla__container'>
            <button key = 'home' onClick={() => { push('/') }}>
                Home
            </button>
            {menus.find(x => x?.key === '3')}
            {menus.find(x => x?.key === '4')}
            {menus.find(x => x?.key === '1')}
            {menus.find(x => x?.key === '2')}
            {menus.find(x => x?.key === '6')}
            {menus.find(x => x?.key === '7')}
            {menus.find(x => x?.key === '8')}
						{isLobbyHeaderError && (
							<button
								className='embla__slide menu-item active'
								key='Slot'
								onClick={() => {
									push(paths.slots.root)
								}}
							>
								<div>{t('Label_General_Slots')}</div>
							</button>
						)}
					</div>
				</div>
			</div>
		</MenuContainer>
	)
}

export default MainMenu
