import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import {
	IAnnouncementData,
	IBannerData,
	IPromotionData,
	IAxiosResponse,
	useLazyGetPromotionDetailQuery,
	IHighlightData,
	IHotEventData,
} from '@nx-next-app/service'
import { Marquee } from '@nx-next-app/components/D0001'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { paths } from '@nx-next-app/constants'
import { CurrenciesEnum, DeviceTypeEnum } from '@nx-next-app/types'
import { HomeSwiper } from './HomeSwiper'
import { PromotionMarquee } from './PromotionMarquee'
import { LatestVideAndEvent } from './latestVideoAndEvent'
import { HomeContext } from './HomeContext'

const LoginModal = dynamic(() => import('../modal/LoginModal'), {
	ssr: false,
})

const PromotionDetailModal = dynamic(
	() => import('../modal/promotionDetailModal/PromotionDetailModal'),
	{
		ssr: false,
	}
)

export interface IHomeProps {
	announcementData: IAnnouncementData[]
	promotionData: IPromotionData[]
	bannerData: IBannerData[]
	hotEventData: IHotEventData[]
	latestHighlightVideo: IHighlightData
	jackPotCurrencies: CurrenciesEnum[]
}
// * wip feat
const Home = ({
	announcementData,
	promotionData,
	bannerData,
	hotEventData,
	latestHighlightVideo,
	jackPotCurrencies,
}: IHomeProps) => {
	const { push } = useRouter()
	const { auth, userInfo } = useAuth()
	const { modal } = useGlobalModal()

	const [getPromotionDetail] = useLazyGetPromotionDetailQuery()

	// 跑馬燈資訊 click 事件
	const handleMarqueeClick = () => {
		if (auth.isLogin) {
			push(paths.announcement.root)
		} else {
			modal.open(<LoginModal />)
		}
	}

	// promotion click 事件
	const handlePromotionClick = async (bonusCode: string) => {
		const { currencyId, langId } = userInfo
		try {
			// 桌機模組固定傳桌機
			const {
				data: { data: promotionDetail } = {} as IAxiosResponse<IPromotionData>,
			} = await getPromotionDetail({
				currencyId,
				langId,
				bonusCode,
				deviceType: DeviceTypeEnum.Desktop,
			})
			modal.open(<PromotionDetailModal promotionDetail={promotionDetail} />)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	return (
		<main>
			<HomeContext.Provider
				value={{
					announcementData,
					promotionData,
					bannerData,
					hotEventData,
					latestHighlightVideo,
					jackPotCurrencies,
				}}
			>
				{/* 首頁輪播 */}
				<HomeSwiper />
				{/* 跑馬燈 */}
				<Marquee data={announcementData} onMarqueeClick={handleMarqueeClick} />
				{/* Promotion跑馬燈 */}
				<PromotionMarquee onPromotionClick={handlePromotionClick} />
				{/* 最新影片 與 event 區塊 */}
				<LatestVideAndEvent />
			</HomeContext.Provider>
		</main>
	)
}

export default Home
