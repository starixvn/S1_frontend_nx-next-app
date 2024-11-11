import Carousel from '@12b-indo-desktop/components/common/carousel'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { useBanner, useSlots } from '@nx-next-app/operations'
import { BannerActionEnum } from '@nx-next-app/types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const LoginModal = dynamic(
	() => import('@12b-indo-desktop/components/modal/LoginModal'),
	{ ssr: false }
)

const Banner = () => {
	const { bannerList } = useSlots()
	const { push } = useRouter()
	const { modal } = useGlobalModal()
	const { bannerDataList, handleBannerClick } = useBanner(bannerList)

	return (
		<div className='lobby-banner'>
			<Carousel pagination={false} navigation={false}>
				{bannerDataList.map(item =>
					item.actionMode === BannerActionEnum.NoAction ? (
						<div key={item.itemKey}>
							<img src={item.bannerPCUrl} alt={item.bannerName} />
						</div>
					) : (
						<button
							key={item.itemKey}
							onClick={
								item.redirectLink
									? () => push(item.redirectLink)
									: () =>
											handleBannerClick(item, {
												loginCallback: () => modal.open(<LoginModal />),
											})
							}
						>
							<img src={item.bannerPCUrl} alt={item.bannerName} />
						</button>
					)
				)}
			</Carousel>
		</div>
	)
}

export default Banner
