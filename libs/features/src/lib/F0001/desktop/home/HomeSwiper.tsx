import Link from 'next/link'
import { isNumber } from 'lodash'
import Image from 'next/future/image'
import { Carousel } from '@nx-next-app/components/D0001'
import { IBannerData } from '@nx-next-app/service'
import { multiEqual } from '@nx-next-app/utils'
import { BannerActionEnum } from '@nx-next-app/types'
import { paths } from '@nx-next-app/constants'

interface IHomeSwiperProps {
	bannerData: IBannerData[]
}
const HomeSwiper = ({ bannerData }: IHomeSwiperProps) => {
	const handleClick = (banner: IBannerData) => {
		if (window === undefined) return
		const { actionMode, bannerLink } = banner
		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		}
		if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		}
		// TODO
		// GOTOGAME
	}
	const bannerRenderer = (banner: IBannerData) => {
		const {
			bannerPCUrl,
			bannerName,
			actionMode,
			bonusCode,
			urlRouter,
			tpId,
			tpGameType,
			gameId,
		} = banner
		if (
			multiEqual(actionMode, [
				BannerActionEnum.GoToBonus,
				BannerActionEnum.RedirectPageOfThisSite,
			])
		) {
			const link = (() => {
				switch (actionMode) {
					// GoToBonus
					case BannerActionEnum.GoToBonus:
						return `${paths.promotion.root}?BonusCode=${bonusCode}`
					// RedirectPageOfThisSite
					case BannerActionEnum.RedirectPageOfThisSite: {
						const params = (() => {
							let result = ''
							if (urlRouter === paths.liveCasino.root) {
								result = `?tpId=${tpId}${
									isNumber(tpGameType)
										? `&tpGameType=${tpGameType}`
										: '&tpGameType=undefined'
								}`
							} else if (urlRouter === paths.sports.root) {
								result = `?tpId=${tpId}${gameId ? `&gameId=${gameId}` : ''}`
							}
							return result
						})()
						return `${urlRouter}${params}`
					}
					default:
						return ''
				}
			})()
			return (
				<div key={`banner-${bannerName}`}>
					<Link href={link} passHref>
						<a>
							<Image
								src={bannerPCUrl}
								alt={bannerName}
								width={1920}
								height={500}
							/>
						</a>
					</Link>
				</div>
			)
		}

		return (
			<button key={`banner-${bannerName}`} onClick={() => handleClick(banner)}>
				<Image src={bannerPCUrl} alt={bannerName} width={1920} height={500} />
			</button>
		)
	}

	return (
		<Carousel pagination={false} navigation={false}>
			{bannerData?.map(banner => bannerRenderer(banner))}
		</Carousel>
	)
}

export { HomeSwiper }
