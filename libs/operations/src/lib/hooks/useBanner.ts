import { PRODUCTS, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useMenu } from '@nx-next-app/operations'
import { IBannerData } from '@nx-next-app/service'
import { BannerActionEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { isNumber } from 'lodash-es'

export const useBanner = (bannerList: IBannerData[]) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { onEnterPage, onGoToGame } = useMenu()
	const deviceType = Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])

	// BannerAction GoToBonus & RedirectPageOfThisSite 處理 redirectLink
	const bannerDataList = bannerList.map(
		(
			{ actionMode, bonusCode, urlRouter, tpId, tpGameType, gameId, ...rest },
			index
		) => {
			let redirectLink = null
			if (actionMode === BannerActionEnum.GoToBonus) {
				redirectLink = `${paths.promotion.root}?BonusCode=${bonusCode}`
			} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
				let params = `?tpId=${tpId}`
				if (urlRouter === paths.slots.root) {
					params += isNumber(tpGameType)
						? `&tpGameType=${tpGameType}`
						: '&tpGameType=undefined'
				} else if (urlRouter === paths.sports.root) {
					params += gameId ? `&gameId=${gameId}` : ''
				}
				redirectLink = `${urlRouter}${params}`
			}
			if (redirectLink && redirectLink === paths.rewards.root) {
				redirectLink = `${window.location.origin}${redirectLink}`
			}

			return {
				actionMode,
				bonusCode,
				urlRouter,
				tpId,
				tpGameType,
				gameId,
				...rest,
				redirectLink,
				itemKey: `${index}-${tpGameType}-${tpId}`,
			}
		}
	)

	// 處理 banner 點擊事件
	const handleBannerClick = (
		{ tpId, gameId, actionMode, bannerLink, tpGameType }: IBannerData,
		{ loginCallback }: { loginCallback: () => void }
	) => {
		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		} else if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
			loginCallback()
		} else if (actionMode === BannerActionEnum.GoToGame) {
			if (Number(tpId) === PRODUCTS.NewPlayTechSlot.tpId) {
				onGoToGame(
					{
						tpId: Number(tpId),
						langId,
						inputs: { gameId, tpGameType, fun: '0', gameType: '' },
					},
					{ loginCallback }
				)
			} else if (
				Number(tpId) === PRODUCTS.Soccer.tpId &&
				deviceType === DeviceTypeEnum.Desktop
			) {
				window.location.href = `${window.location.origin}/${langId}/sports?provider=Soccer`
			} else {
				onEnterPage(
					{
						langId,
						tpId: Number(tpId),
						gameId: gameId as string,
						tpGameType,
					},
					{ loginCallback }
				)
			}
		}
	}

	return { bannerDataList, handleBannerClick }
}
