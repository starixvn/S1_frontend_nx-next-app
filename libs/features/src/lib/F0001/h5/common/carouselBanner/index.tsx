import React from 'react'
import { useRouter } from 'next/router'
import { isNumber } from 'lodash'
import { paths } from '@nx-next-app/constants'
import { IBannerData } from '@nx-next-app/service'
import { BannerActionEnum } from '@nx-next-app/types'
import { PRODUCTS } from '@nx-next-app/site/nova88'
import { useMenu } from '@nx-next-app/features/F0001/hooks'
import { useAuth } from '@nx-next-app/data-access'
import Carousel from '@nx-next-app/components/D0001/carousel'
import BannerItem from '@nx-next-app/features/F0001/h5/common/carouselBanner/BannerItem'

interface ICarouselBannerProps {
	bannerList: IBannerData[]
}

const CarouselBanner = ({ bannerList, ...rest }: ICarouselBannerProps) => {
	const {
		userInfo: { langId },
	} = useAuth()
	const { push } = useRouter()
	const { onEnterPage, onGoToGame } = useMenu({ langId })

	const resultList = bannerList.map(
		(
			{ actionMode, bonusCode, urlRouter, tpId, tpGameType, gameId, ...rest },
			index
		) => {
			let redirectLink = null
			if (actionMode === BannerActionEnum.GoToBonus) {
				redirectLink = `/${paths.promotion.root}?BonusCode=${bonusCode}`
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
				redirectLink = `${
					process.env.NODE_ENV === 'production'
						? window.location.origin
						: process.env['NEXT_PUBLIC_OPEN_URL']
				}${redirectLink}`
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
	}: IBannerData) => {
		if (Number(tpId) === PRODUCTS.SLOTS_PT.TP_ID) {
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
			window.location.href = `${window.location.origin}/${langId}/sports?provider=saba&type=soccer`
			return false
		}

		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		} else if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
			push(paths.login.root)
		} else if (actionMode === BannerActionEnum.GoToGame) {
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
		return false
	}

	return (
		<Carousel {...rest}>
			{resultList.map(item => (
				<BannerItem
					itemKey={item.itemKey}
					src={item.bannerPCUrl}
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
