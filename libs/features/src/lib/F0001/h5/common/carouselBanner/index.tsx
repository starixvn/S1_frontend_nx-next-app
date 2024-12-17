import Carousel, { ICarouselProps } from "@nx-next-app/components/H0001/carousel";
import { paths, PRODUCTS } from "@nx-next-app/constants";
import { useAuth } from "@nx-next-app/data-access";
import { useMenu } from "@nx-next-app/features/F0001/hooks";
import { IBannerData } from "@nx-next-app/service";
import { BannerActionEnum } from "@nx-next-app/types";
import { isNumber } from "lodash";
import { useRouter } from "next/router";

import BannerItem from "./BannerItem";

interface ICarouselBannerProps extends ICarouselProps {
	bannerList: IBannerData[]
}

const CarouselBanner = ({ bannerList, ...rest }: ICarouselBannerProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { onEnterPage, onGoToGame } = useMenu()

	const resultList = bannerList?.map(
		(
			{ actionMode, bonusCode, urlRouter, tpId, tpGameType, gameId, ...rest },
			index
		) => {
			let redirectLink = null
			if (actionMode === BannerActionEnum.GoToBonus) {
				redirectLink = `${paths.promotion.root}?BonusCode=${bonusCode}`
			} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
				let params = (tpId && tpId !== '0') ? `?tpId=${tpId}` : ''
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

	const handleBannerClick = ({
		tpId,
		gameId,
		actionMode,
		bannerLink,
		tpGameType,
		isExclusionGame
	}: IBannerData) => {
		if (Number(tpId) === PRODUCTS.NewPlayTechSlot.tpId) {
			onGoToGame(
				{
					tpId: Number(tpId),
					langId,
					inputs: { gameId, tpGameType, fun: '0', gameType: '' },
				},
				{ loginCallback: () => push(paths.login.root) }
			)
		}

		// tpId 1 等於saba
		if (actionMode === BannerActionEnum.GoToGame && Number(tpId) === 1) {
			if (!isExclusionGame) {
				window.location.href = `${window.location.origin}/${langId}/sports?provider=saba&type=soccer`
			}
			return false
		}

		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		} else if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
			push(paths.login.root)
		} else if (actionMode === BannerActionEnum.GoToGame) {
			if (!isExclusionGame) {
				onEnterPage(
					{
						langId,
						tpId: Number(tpId),
						gameId: gameId as string,
						tpGameType,
					},
					{ loginCallback: () => push(paths.login.root) }
				)
			}
		}
		return false
	}

	return (
		<Carousel {...rest}>
			{resultList?.map(item => (
				<BannerItem
					key={item.itemKey}
					src={item.bannerMobileUrl}
					alt={item.bannerName}
					onClick={
						item.redirectLink
							? () => push(item.redirectLink ?? '/')
							: () => handleBannerClick(item)
					}
					isRedirect={Boolean(item.redirectLink)}
				/>
			))}
		</Carousel>
	)
}

export default CarouselBanner
