import React, { useState } from 'react'
import CarouselBanner from '@nx-next-app/features/F0001/h5/common/carouselBanner'
import { useGetBannerV3Query } from '@nx-next-app/service'
import { includes } from 'lodash-es'
import { DEVICE_TYPE, paths } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import classNames from 'classnames'
import {
	IDisplayGameData,
	ISlotsGameData,
} from 'libs/web/src/service/gameApi/type'
import { useRouter } from 'next/router'
import VendorFilter from '@nx-next-app/features/F0001/h5/slots/vendorFilter'
import CategoryFilter from '@nx-next-app/features/F0001/h5/slots/CategoryFilter'
import GameList from '@nx-next-app/features/F0001/h5/slots/GameList'
import GameInfo from '@nx-next-app/features/F0001/h5/slots/GameInfo'
import { useTranslation } from 'next-i18next'
import { useSlotsVendorData } from '@nx-next-app/features/F0001/hooks/useSlotsVendorData'
import { useCategoryData } from '@nx-next-app/features/F0001/hooks/useSlotsCategoryData'
import { useSlotsGameData } from '@nx-next-app/features/F0001/hooks/useSlotsGameData'
import { useInView } from '@nx-next-app/hooks'

const Slots = ({
	persistSlotsGameData,
	persistSlotsCategoryData,
}: {
	persistSlotsGameData: ISlotsGameData
	persistSlotsCategoryData: ISlotsGameData
}) => {
	const { ref, isInView } = useInView({ rootMargin: '-160px 0px 0px 0px' })
	const [isShowSearchInput, setIsShowSearchInput] = useState<boolean>(false)
	const [activeGame, setActiveGame] = useState<
		| (IDisplayGameData & {
				resultTpName?: string
				resultGameImgDisplayText?: string
				resultGameName?: string
		  })
		| null
	>(null)
	const {
		userInfo: { currencyId, langId },
	} = useAuth()
	const { push } = useRouter()
	const { t } = useTranslation()

	const {
		data: { data: bannerList = [] } = {},
		isFetching: isGetBannerV3Fetching,
	} = useGetBannerV3Query({
		// 這邊拿nannerType拿2取不到值,故依照線上版本
		bannerType: DEVICE_TYPE.NativeAPP,
		currencyId,
		langId,
	})

	const handleInputClose = () => {
		setIsShowSearchInput(false)
		if (searchCategoryText !== '') {
			onSearchCategoryTextChange('')
		} else {
			setIsShowSearchInput(false)
		}
	}

	const handleGameActive = (targetData: IDisplayGameData) => {
		setActiveGame(targetData)
	}

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
		loginCallback: () => push(paths.login.root),
	})

	const {
		slotsGameList,
		ref: gameListRef,
		myFavorites,
		onFavoritesToggle,
		onGamePlay,
	} = useSlotsGameData({
		categoryKey: activeCategoryKey,
		searchCategoryText,
		persistSlotsCategoryData,
		loginCallback: () => push(paths.login.root),
	})

	return (
		<>
			<header className='header' id='header'>
				<div className='title searchBar'>
					<a href={paths.home.root}>
						<i className='icon icon-keyboard_arrow_left' />
					</a>
					{t('Label_General_Slots')}
					<i
						className='icon icon-search'
						onClick={() => setIsShowSearchInput(true)}
					/>
					<div
						className={classNames('infoModule', { active: isShowSearchInput })}
					>
						<div className='inputBox'>
							<input
								placeholder={t('Label_SearchGames') as string}
								value={searchCategoryText}
								onChange={e => onSearchCategoryTextChange(e.target.value)}
							/>
							<i className='icon icon-close' onClick={handleInputClose} />
						</div>
					</div>
				</div>
			</header>

			<main className='main casino'>
				{!isGetBannerV3Fetching && <CarouselBanner bannerList={bannerList} />}

				<div className={classNames('functionList', { active: !isInView })}>
					<VendorFilter
						vendorList={vendorList}
						activeVendorTpId={activeVendorTpId}
						onClick={onVendorChange}
					/>
					<CategoryFilter
						categoryList={categoryKeys}
						activeCategory={activeCategoryKey}
						onChange={onCategoryChange}
					/>
				</div>
				<div ref={ref} />
				<GameList
					vendorList={vendorList}
					activeCategory={activeCategoryKey}
					slotsGameList={slotsGameList}
					gameListRef={gameListRef}
					imgUrl={persistSlotsGameData.imgUrl ?? ''}
					onActive={handleGameActive}
					onSetFavorites={onFavoritesToggle}
				/>

				{activeGame && (
					<GameInfo
						isFavorite={includes(myFavorites, activeGame.gameId)}
						imgUrl={persistSlotsGameData.imgUrl ?? ''}
						activeGame={activeGame}
						setActiveGame={setActiveGame}
						onSetFavorites={onFavoritesToggle}
						onPlay={onGamePlay}
					/>
				)}
			</main>
		</>
	)
}

export default Slots
