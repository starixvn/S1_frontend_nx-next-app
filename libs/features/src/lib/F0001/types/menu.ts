import { ISubMenuData } from '@nx-next-app/service'
import type { IProduct, IRootpath } from '@nx-next-app/constants'
import { MenuActionTypeEnum } from '@nx-next-app/types'
import type { IAddLiveStreamingProps } from '@nx-next-app/hooks'

export type IMenuActionLinkType = Extract<
	keyof typeof MenuActionTypeEnum,
	'Link' | 'WindowOpen'
>

export type IMenuActionOtherType = Exclude<
	keyof typeof MenuActionTypeEnum,
	'Link' | 'WindowOpen'
>

export interface IStaticSubMenuItemLinkType extends IProduct {
	desktop?: {
		menuActionType: IMenuActionLinkType
	}
	h5?: {
		menuActionType: IMenuActionLinkType
	}
	pathname: IRootpath
	query?: { provider: string } | { tpId: number }
	needLogin?: boolean
}

export interface IStaticSubMenuItemOtherType extends IProduct {
	desktop?: {
		menuActionType: IMenuActionOtherType
	}
	h5?: {
		menuActionType: IMenuActionOtherType
	}
	needLogin?: boolean
}

interface IDynamicSubMenuLinkType
	extends IStaticSubMenuItemLinkType,
		ISubMenuData,
		IProduct,
		IAddLiveStreamingProps {}

interface IDynamicSubMenuOtherType
	extends IStaticSubMenuItemOtherType,
		ISubMenuData,
		IProduct,
		IAddLiveStreamingProps {}

// * 點擊 menu 遊戲產品的參數(Lobby Header Api)
export type IDynamicSubMenuItem =
	| IDynamicSubMenuLinkType
	| IDynamicSubMenuOtherType
export type IStaticSubMenuItem =
	| IStaticSubMenuItemLinkType
	| IStaticSubMenuItemOtherType
