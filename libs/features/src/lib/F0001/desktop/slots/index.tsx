import React from 'react'
import { DEVICE_TYPE } from '@nx-next-app/constants'
import LoginModal from '@nx-next-app/features/F0001/desktop/modal/LoginModal'
import VendorFilter from '@nx-next-app/features/F0001/desktop/slots/vendorFilter'
import CategoryFilter from '@nx-next-app/features/F0001/desktop/slots/CategoryFilter'
import SearchBox from '@nx-next-app/features/F0001/desktop/slots/SearchBox'
import GameList from '@nx-next-app/features/F0001/desktop/slots/GameList'
import Jackpot from '@nx-next-app/components/D0001/jackpot'
import { useGetBannerV3Query } from '@nx-next-app/service'
import { ISlotsGameData } from 'libs/web/src/service/gameApi/type'
import { useAuth } from '@nx-next-app/data-access'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { CarouselBanner } from '@nx-next-app/features/F0001/desktop/common'
import { useCategoryData } from '@nx-next-app/features/F0001/hooks/useSlotsCategoryData'
import { useSlotsVendorData } from '@nx-next-app/features/F0001/hooks/useSlotsVendorData'
import { useSlotsGameData } from '@nx-next-app/features/F0001/hooks/useSlotsGameData'

const Slots = ({
	persistSlotsGameData,
	persistSlotsCategoryData,
}: {
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}) => {
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { modal } = useGlobalModal()
	const {
		data: { data: bannerList = [] } = {},
		isFetching: isGetBannerV3Fetching,
	} = useGetBannerV3Query({
		bannerType: DEVICE_TYPE.Desktop,
		currencyId,
		langId,
	})

	const { vendorList, activeVendorTpId, onVendorChange } = useSlotsVendorData({
		persistProviderList: persistSlotsGameData.providerList || [],
	})

	const {
		categoryKeys,
		activeCategoryKey,
		searchCategoryText,
		onSearchCategoryTextChange,
		onCategoryChange,
	} = useCategoryData({
		persistSlotsCategoryData,
		loginCallback: () => modal.open(<LoginModal />),
	})
	const {
		slotsGameList,
		ref: gameListRef,
		onFavoritesToggle,
		onGamePlay,
	} = useSlotsGameData({
		categoryKey: activeCategoryKey,
		searchCategoryText,
		persistSlotsCategoryData,
		loginCallback: () => modal.open(<LoginModal />),
	})

	return (
		<main>
			{!isGetBannerV3Fetching && <CarouselBanner bannerList={bannerList} />}
			<section className='inside'>
				<div className='rightModule'>
					<div className='slotJpot'>
						<Jackpot onClick={() => null} />
					</div>
					<div className='infoModule'>
						<VendorFilter
							vendorList={vendorList}
							activeVendorTpId={activeVendorTpId}
							onVendorChange={onVendorChange}
						/>
						<div className='casinoSelect'>
							<CategoryFilter
								categoryList={categoryKeys}
								activeCategory={activeCategoryKey}
								onChange={onCategoryChange}
							/>
							<SearchBox
								searchText={searchCategoryText}
								onChange={onSearchCategoryTextChange}
							/>
						</div>
						<GameList
							vendorList={vendorList}
							activeCategory={activeCategoryKey}
							slotsGameList={slotsGameList}
							gameListRef={gameListRef}
							imgUrl={persistSlotsGameData.imgUrl ?? ''}
							onPlay={onGamePlay}
							onSetFavorites={onFavoritesToggle}
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Slots
